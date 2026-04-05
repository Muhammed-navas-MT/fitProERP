import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { MessageCircle, X } from "lucide-react";

import {
  useCreateConversation,
  useListConversations,
  useListMessages,
  useMarkConversationSeen,
  useSendMessage,
} from "@/hook/member/chatHook";
import { getSocket } from "@/lib/socket";
import { useChatSocket } from "@/hook/socketHooks";
import { rootstate } from "@/store/store";

import ChatConversationList from "@/components/member/chatComponent/chatConversationList";
import ChatHeader from "@/components/member/chatComponent/chatHeader";
import ChatInput from "@/components/member/chatComponent/chatInput";

import {
  ConversationItem,
  ConversationSeenEvent,
  ConversationUpdatedEvent,
  MessageItem,
  SECOND_USER_MODEL,
  TypingEvent,
} from "@/types/member/chatType";
import { Topbar } from "@/components/member/topbar";
import { Sidebar } from "@/components/member/memberSidebar";
import { useFindAssignedTrainers } from "@/hook/member/trainerHooks";
import ChatMessageArea from "@/components/member/chatComponent/chatMessageArea";

export default function ChatPage() {
  const queryClient = useQueryClient();
  const typingTimeoutRef = useRef<number | null>(null);

  const currentUserId = useSelector(
    (state: rootstate) => state.authData?._id,
  ) as string;

  const name = useSelector((state: rootstate) => state.authData.name);

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [liveMessages, setLiveMessages] = useState<MessageItem[]>([]);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  const { data: assignedTrainerResponse, isLoading: isTrainerLoading } =
    useFindAssignedTrainers();

  const assignedTrainer = useMemo(() => {
    if (!assignedTrainerResponse) return null;

    return assignedTrainerResponse?.data;
  }, [assignedTrainerResponse]);

  const assignedTrainerId = assignedTrainer?.id || "";
  const assignedTrainerName = assignedTrainer?.name || "Trainer";

  const { data: conversationsResponse, isLoading: isConversationsLoading } =
    useListConversations();

  const conversations: ConversationItem[] =
    conversationsResponse?.conversations || conversationsResponse || [];

  const { mutateAsync: createConversation, isPending: isCreatingConversation } =
    useCreateConversation();

  const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessage(
    selectedConversationId,
  );

  const { mutate: markConversationSeen } = useMarkConversationSeen();

  const { data: messagesResponse, isLoading: isMessagesLoading } =
    useListMessages(selectedConversationId, 1, 50);

  const existingConversation = useMemo(() => {
    if (!assignedTrainerId) return undefined;

    return conversations.find((conversation) =>
      conversation.participants.some(
        (participant) =>
          participant.userId === assignedTrainerId &&
          participant.userModel === SECOND_USER_MODEL,
      ),
    );
  }, [conversations, assignedTrainerId]);

  const selectedConversation = useMemo(() => {
    return conversations.find(
      (conversation) => conversation._id === selectedConversationId,
    );
  }, [conversations, selectedConversationId]);

  const otherParticipant = selectedConversation?.participants?.find(
    (participant) => participant.userId !== currentUserId,
  );

  const messages: MessageItem[] = useMemo(() => {
    const serverMessages: MessageItem[] =
      messagesResponse?.messages || messagesResponse || [];

    const existingIds = new Set(serverMessages.map((message) => message._id));
    const filteredLiveMessages = liveMessages.filter(
      (message) => !existingIds.has(message._id),
    );

    return [...serverMessages, ...filteredLiveMessages];
  }, [messagesResponse, liveMessages]);

  useEffect(() => {
    if (!selectedConversationId) return;
    markConversationSeen(selectedConversationId);
  }, [selectedConversationId, markConversationSeen]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setLiveMessages([]);
    setIsOtherUserTyping(false);
  };

  const handleCreateConversation = async () => {
    try {
      if (!assignedTrainerId) return;

      if (existingConversation?._id) {
        setSelectedConversationId(existingConversation._id);
        setLiveMessages([]);
        return;
      }

      const response = await createConversation({
        secondUserId: assignedTrainerId,
        secondUserModel: SECOND_USER_MODEL,
      });

      const conversationId = response?._id || response?.data?._id;

      if (conversationId) {
        setSelectedConversationId(conversationId);
        setLiveMessages([]);
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  const handleReceiveMessage = useCallback(
    (message: MessageItem) => {
      if (message.conversationId !== selectedConversationId) return;

      setLiveMessages((prev) => {
        const exists = prev.some((item) => item._id === message._id);
        if (exists) return prev;
        return [...prev, message];
      });

      markConversationSeen(message.conversationId);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    [selectedConversationId, markConversationSeen, queryClient],
  );

  const handleConversationUpdated = useCallback(
    (_data: ConversationUpdatedEvent) => {
      console.log(_data);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    [queryClient],
  );

  const handleConversationSeen = useCallback(
    (data: ConversationSeenEvent) => {
      if (data.conversationId !== selectedConversationId) return;

      queryClient.invalidateQueries({
        queryKey: ["messages", selectedConversationId, 1, 50],
      });
    },
    [queryClient, selectedConversationId],
  );

  const handleUserTyping = useCallback(
    (data: TypingEvent) => {
      if (data.conversationId !== selectedConversationId) return;
      if (data.userId === currentUserId) return;

      setIsOtherUserTyping(true);
    },
    [selectedConversationId, currentUserId],
  );

  const handleUserStopTyping = useCallback(
    (data: TypingEvent) => {
      if (data.conversationId !== selectedConversationId) return;
      if (data.userId === currentUserId) return;

      setIsOtherUserTyping(false);
    },
    [selectedConversationId, currentUserId],
  );

  useChatSocket({
    conversationId: selectedConversationId,
    onReceiveMessage: handleReceiveMessage,
    onConversationUpdated: handleConversationUpdated,
    onConversationSeen: handleConversationSeen,
    onUserTyping: handleUserTyping,
    onUserStopTyping: handleUserStopTyping,
  });

  const handleTyping = () => {
    const socket = getSocket();
    if (!socket || !selectedConversationId) return;

    socket.emit("chat:typing", { conversationId: selectedConversationId });

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      socket.emit("chat:stop-typing", {
        conversationId: selectedConversationId,
      });
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!selectedConversationId || !otherParticipant?.userId) return;

    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;

    sendMessage(
      {
        conversationId: selectedConversationId,
        receiverId: otherParticipant.userId,
        text: trimmedMessage,
        type: "TEXT",
      },
      {
        onSuccess: () => {
          setMessageText("");
          setLiveMessages([]);
          queryClient.invalidateQueries({
            queryKey: ["messages", selectedConversationId, 1, 50],
          });
          queryClient.invalidateQueries({
            queryKey: ["conversations"],
          });
        },
      },
    );
  };

  const handleCloseChat = () => {
    setSelectedConversationId("");
    setLiveMessages([]);
    setIsOtherUserTyping(false);
  };

  const isCreateButtonDisabled =
    isCreatingConversation || isTrainerLoading || !assignedTrainerId;

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          avatar={avatarText}
          title={`Welcome Back, ${name || "Member"}!`}
          subtitle="Ready to crush your fitness goals today."
        />

        <div className="h-[calc(100vh-80px)] overflow-hidden bg-black">
          <div className="flex h-full overflow-hidden bg-black text-white">
            <aside className="flex h-full w-[340px] min-w-[280px] flex-col overflow-hidden border-r border-zinc-900 bg-zinc-950">
              <div className="shrink-0 border-b border-zinc-900 px-4 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Chats</h2>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <ChatConversationList
                  conversations={conversations}
                  isLoading={isConversationsLoading}
                  selectedConversationId={selectedConversationId}
                  currentUserId={currentUserId}
                  onSelectConversation={handleSelectConversation}
                  trainerName={assignedTrainerName}
                />
              </div>
            </aside>

            <section className="flex min-w-0 flex-1 flex-col bg-black">
              {!selectedConversationId ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                  <MessageCircle size={56} className="text-zinc-800" />

                  <p className="text-lg font-semibold text-zinc-400">
                    Select a conversation
                  </p>

                  <button
                    type="button"
                    onClick={handleCreateConversation}
                    disabled={isCreateButtonDisabled}
                    className={`rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors ${
                      isCreateButtonDisabled
                        ? "cursor-not-allowed bg-orange-700/70"
                        : "bg-orange-600 hover:bg-orange-500"
                    }`}
                  >
                    {isTrainerLoading
                      ? "Loading trainer..."
                      : isCreatingConversation
                        ? "Creating..."
                        : existingConversation
                          ? `Open ${assignedTrainerName} Chat`
                          : `Start Chat with ${assignedTrainerName}`}
                  </button>
                </div>
              ) : (
                <>
                  <div className="shrink-0 border-b border-zinc-900">
                    <div className="flex items-center justify-between px-4 py-3">
                      <ChatHeader
                        otherParticipant={otherParticipant}
                        isTyping={isOtherUserTyping}
                        trainerName={assignedTrainer.name}
                      />

                      <button
                        type="button"
                        onClick={handleCloseChat}
                        className="ml-3 flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#121212] px-3 py-2 text-sm text-gray-300 transition-colors hover:border-orange-500/40 hover:text-white"
                      >
                        <X size={16} />
                        Close Chat
                      </button>
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 overflow-hidden">
                    <ChatMessageArea
                      messages={messages}
                      isLoading={isMessagesLoading}
                      currentUserId={currentUserId}
                      isOtherUserTyping={isOtherUserTyping}
                    />
                  </div>

                  <div className="shrink-0">
                    <ChatInput
                      messageText={messageText}
                      setMessageText={setMessageText}
                      onSend={handleSendMessage}
                      onTyping={handleTyping}
                      isSending={isSendingMessage}
                      disabled={!selectedConversationId}
                    />
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
