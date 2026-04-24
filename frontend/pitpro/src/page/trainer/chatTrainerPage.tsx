import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { MessageCircle, X } from "lucide-react";
import { toast } from "sonner";

import {
  useListConversations,
  useListMessages,
  useMarkConversationSeen,
  useSendMessage,
  useUploadChatImage,
} from "@/hook/trainer/chatTrainerHook";
import { getSocket } from "@/lib/socket";
import { useChatSocket } from "@/hook/socketHooks";
import { rootstate } from "@/store/store";

import {
  ConversationItem,
  ConversationSeenEvent,
  MessageItem,
  TypingEvent,
} from "@/types/member/chatType";

import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "@/components/trainer/trainerHeader";
import ChatConversationList from "@/components/trainer/trainerChatManagement/chatConversationList";
import ChatHeader from "@/components/trainer/trainerChatManagement/chatHeader";
import ChatInput from "@/components/trainer/trainerChatManagement/chatInput";
import ChatMessageArea from "@/components/trainer/trainerChatManagement/chatMessageArea";

export default function TrainerChatPage() {
  const queryClient = useQueryClient();
  const typingTimeoutRef = useRef<number | null>(null);

  const currentUserId = useSelector(
    (state: rootstate) => state.authData?._id,
  ) as string;

  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [liveMessages, setLiveMessages] = useState<MessageItem[]>([]);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const { data: conversationsResponse, isLoading: isConversationsLoading } =
    useListConversations();

  const conversations: ConversationItem[] =
    conversationsResponse?.conversations || conversationsResponse || [];

  const { mutate: sendMessage, isPending: isSendingMessage } =
    useSendMessage(selectedConversationId);

  const { mutateAsync: uploadChatImage, isPending: isUploadingImage } =
    useUploadChatImage(selectedConversationId);

  const { mutate: markConversationSeen } = useMarkConversationSeen();

  const { data: messagesResponse, isLoading: isMessagesLoading } =
    useListMessages(selectedConversationId, 1, 50);

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

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setLiveMessages([]);
    setIsOtherUserTyping(false);
  };

  const handleCloseChat = () => {
    setSelectedConversationId("");
    setMessageText("");
    setLiveMessages([]);
    setIsOtherUserTyping(false);
    handleRemoveImage();
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
    () => {
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

  const handleImageSelect = (file: File | null) => {
    if (!file) return;

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedImageFile(file);
    setImagePreviewUrl(previewUrl);
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setSelectedImageFile(null);
    setImagePreviewUrl("");
  };

  const handleSendMessage = async () => {
    if (!selectedConversationId || !otherParticipant?.userId) return;

    const trimmedMessage = messageText.trim();

    if (!trimmedMessage && !selectedImageFile) return;

    try {
      if (selectedImageFile) {
        await uploadChatImage({
          file: selectedImageFile,
          conversationId: selectedConversationId,
          receiverId: otherParticipant.userId,
          text: trimmedMessage || undefined,
        });

        setMessageText("");
        handleRemoveImage();
        setLiveMessages([]);
        queryClient.invalidateQueries({
          queryKey: ["messages", selectedConversationId, 1, 50],
        });
        queryClient.invalidateQueries({
          queryKey: ["conversations"],
        });

        return;
      }

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
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send image";
      toast.error(message);
    }
  };

  const selectedConversationName = useMemo(() => {
    if (!selectedConversation) return "";

    const member = selectedConversation.members.find(
      (m) => m.userId !== currentUserId,
    );

    return member?.name || `Member ${member?.userId?.slice(-5) || ""}`;
  }, [selectedConversation, currentUserId]);

  const isSending = isSendingMessage || isUploadingImage;

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar />

      <div className="w-full lg:pl-[220px]">
        <Header
          title="Chat"
          subtitle="Connect with your members in real time"
          avatar="TR"
        />

        <main className="h-[calc(100vh-80px)] overflow-hidden">
          <div className="flex h-full overflow-hidden bg-[#0f0f0f] text-white">
            <aside className="flex h-full w-[340px] min-w-[280px] flex-col overflow-hidden border-r border-[#2a2a2a] bg-[#1a1a1a]">
              <div className="shrink-0 border-b border-[#2a2a2a] px-4 py-4">
                <h2 className="text-xl font-bold text-purple-400">Chats</h2>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <ChatConversationList
                  conversations={conversations}
                  isLoading={isConversationsLoading}
                  selectedConversationId={selectedConversationId}
                  currentUserId={currentUserId}
                  onSelectConversation={handleSelectConversation}
                />
              </div>
            </aside>

            <section className="flex min-w-0 flex-1 flex-col bg-[#0f0f0f]">
              {!selectedConversationId ? (
                <div className="flex flex-1 items-center justify-center bg-[#0f0f0f]">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full border border-purple-500/20 bg-purple-500/10 p-5">
                      <MessageCircle size={40} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        No chat selected
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a conversation from the left side
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-[#2a2a2a] bg-[#1a1a1a] pr-4">
                    <div className="min-w-0 flex-1">
                      <ChatHeader
                        otherParticipant={otherParticipant}
                        isTyping={isOtherUserTyping}
                        name={selectedConversationName}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleCloseChat}
                      className="ml-3 flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#121212] px-3 py-2 text-sm text-gray-300 transition-colors hover:border-purple-500/40 hover:text-white"
                    >
                      <X size={16} />
                      Close Chat
                    </button>
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
                      isSending={isSending}
                      disabled={!selectedConversationId}
                      selectedImageFile={selectedImageFile}
                      imagePreviewUrl={imagePreviewUrl}
                      onImageSelect={handleImageSelect}
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                </>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
