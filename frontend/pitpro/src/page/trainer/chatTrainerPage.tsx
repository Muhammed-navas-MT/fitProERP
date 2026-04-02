import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateConversation,
  useListConversations,
  useListMessages,
  useMarkConversationSeen,
  useSendMessage,
} from "@/hook/trainer/chatTrainerHook";
import { getSocket } from "@/lib/socket";
import { useChatSocket } from "@/hook/socketHooks";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";

type ChatUserModel = "Member" | "Trainer";
type MessageType = "TEXT" | "IMAGE" | "FILE";
type MessageStatus = "SENT" | "DELIVERED" | "SEEN";

interface ConversationParticipant {
  userId: string;
  userModel: ChatUserModel;
}

interface ConversationItem {
  _id: string;
  conversationKey?: string;
  participants: ConversationParticipant[];
  lastMessage?: string;
  lastMessageType?: MessageType;
  lastMessageAt?: string;
  unreadCount?: number;
}

export interface MessageItem {
  _id: string;
  conversationId: string;
  senderId: string;
  senderModel: ChatUserModel;
  receiverId: string;
  receiverModel: ChatUserModel;
  text?: string;
  imageUrl?: string;
  type: MessageType;
  status: MessageStatus;
  seenAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationSeenEvent {
  conversationId: string;
  seenBy: string;
}

interface TypingEvent {
  conversationId: string;
  userId: string;
}

interface ConversationUpdatedEvent {
  conversationId: string;
  lastMessage?: string;
  lastMessageType: string;
  lastMessageAt: string;
  senderId: string;
}

// trainer page target user
const secondUserId = "69c604044b040639865321a7";
const secondUserModel: ChatUserModel = "Member";

const formatTime = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateLabel = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

export default function TrainerChatPage() {
  const queryClient = useQueryClient();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const currentUserId = useSelector((state: rootstate) => state.authData._id);

  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [liveMessages, setLiveMessages] = useState<MessageItem[]>([]);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

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
    return conversations.find((conversation) =>
      conversation.participants.some(
        (participant) =>
          participant.userId === secondUserId &&
          participant.userModel === secondUserModel,
      ),
    );
  }, [conversations]);

  const messages: MessageItem[] = useMemo(() => {
    const serverMessages: MessageItem[] =
      messagesResponse?.messages || messagesResponse || [];

    const existingIds = new Set(serverMessages.map((m) => m._id));
    const filteredLive = liveMessages.filter((m) => !existingIds.has(m._id));

    return [...serverMessages, ...filteredLive];
  }, [messagesResponse, liveMessages]);

  const selectedConversation = conversations.find(
    (conversation) => conversation._id === selectedConversationId,
  );

  const otherParticipant = selectedConversation?.participants?.find(
    (participant) => participant.userId !== currentUserId,
  );

  useEffect(() => {
    if (!selectedConversationId) return;
    markConversationSeen(selectedConversationId);
  }, [selectedConversationId, markConversationSeen]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isOtherUserTyping]);

  const handleCreateConversation = async () => {
    try {
      if (existingConversation?._id) {
        setSelectedConversationId(existingConversation._id);
        setLiveMessages([]);
        return;
      }

      const response = await createConversation({
        secondUserId,
        secondUserModel,
      });

      const conversationId = response?._id || response?.data?._id;

      if (conversationId) {
        setSelectedConversationId(conversationId);
        setLiveMessages([]);
        queryClient.invalidateQueries({
          queryKey: ["conversations"],
        });
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

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
    [selectedConversationId, markConversationSeen, queryClient],
  );

  const handleConversationUpdated = useCallback(
    (_data: ConversationUpdatedEvent) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
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

  const groupedMessages = useMemo(() => {
    const groups: Record<string, MessageItem[]> = {};

    for (const message of messages) {
      const label = formatDateLabel(message.createdAt);
      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(message);
    }

    return groups;
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-2xl border bg-white">
      <aside className="w-[320px] border-r bg-gray-50">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Chats</h2>
          <p className="mt-1 text-sm text-gray-500">Member ID: {secondUserId}</p>

          <button
            onClick={handleCreateConversation}
            disabled={isCreatingConversation}
            className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreatingConversation
              ? "Creating..."
              : existingConversation
                ? "Open Member Chat"
                : "Create Conversation"}
          </button>
        </div>

        <div className="h-full overflow-y-auto">
          {isConversationsLoading ? (
            <div className="p-4 text-sm text-gray-500">
              Loading conversations...
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No conversations found
            </div>
          ) : (
            conversations.map((conversation) => {
              const participant = conversation.participants.find(
                (item) => item.userId !== currentUserId,
              );

              return (
                <button
                  key={conversation._id}
                  onClick={() => {
                    setSelectedConversationId(conversation._id);
                    setLiveMessages([]);
                  }}
                  className={`w-full border-b px-4 py-3 text-left transition ${
                    selectedConversationId === conversation._id
                      ? "bg-blue-50"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">
                        {participant?.userModel || "User"} -{" "}
                        {participant?.userId?.slice(-5)}
                      </p>
                      <p className="mt-1 truncate text-sm text-gray-500">
                        {conversation.lastMessage || "No messages yet"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {formatTime(conversation.lastMessageAt)}
                      </p>

                      {!!conversation.unreadCount &&
                        conversation.unreadCount > 0 && (
                          <span className="mt-1 inline-flex min-w-[22px] items-center justify-center rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                            {conversation.unreadCount}
                          </span>
                        )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      <section className="flex flex-1 flex-col">
        {!selectedConversationId ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-gray-500">
            <p>Select a conversation</p>
            <button
              onClick={handleCreateConversation}
              disabled={isCreatingConversation}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreatingConversation
                ? "Creating..."
                : existingConversation
                  ? "Open Member Chat"
                  : "Create Conversation"}
            </button>
          </div>
        ) : (
          <>
            <div className="border-b px-5 py-4">
              <h3 className="font-semibold">
                {otherParticipant?.userModel || "Chat"} -{" "}
                {otherParticipant?.userId?.slice(-5)}
              </h3>
              <p className="text-sm text-gray-500">
                Conversation ID: {selectedConversationId}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
              {isMessagesLoading ? (
                <div className="text-sm text-gray-500">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="text-sm text-gray-500">No messages yet</div>
              ) : (
                Object.entries(groupedMessages).map(
                  ([dateLabel, dayMessages]) => (
                    <div key={dateLabel} className="mb-6">
                      <div className="mb-4 flex justify-center">
                        <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                          {dateLabel}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {dayMessages.map((message) => {
                          const isOwnMessage =
                            message.senderId === currentUserId;

                          return (
                            <div
                              key={message._id}
                              className={`flex ${
                                isOwnMessage ? "justify-end" : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                                  isOwnMessage
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-900"
                                }`}
                              >
                                {message.type === "IMAGE" &&
                                message.imageUrl ? (
                                  <img
                                    src={message.imageUrl}
                                    alt="chat"
                                    className="mb-2 max-h-60 rounded-lg object-cover"
                                  />
                                ) : null}

                                {message.type === "FILE" && message.imageUrl ? (
                                  <a
                                    href={message.imageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`mb-2 block text-sm underline ${
                                      isOwnMessage
                                        ? "text-blue-100"
                                        : "text-blue-600"
                                    }`}
                                  >
                                    Open file
                                  </a>
                                ) : null}

                                {message.text ? (
                                  <p className="whitespace-pre-wrap text-sm">
                                    {message.text}
                                  </p>
                                ) : null}

                                <div
                                  className={`mt-1 flex items-center justify-end gap-2 text-[11px] ${
                                    isOwnMessage
                                      ? "text-blue-100"
                                      : "text-gray-400"
                                  }`}
                                >
                                  <span>{formatTime(message.createdAt)}</span>
                                  {isOwnMessage && (
                                    <span>{message.status}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ),
                )
              )}

              {isOtherUserTyping && (
                <div className="mt-2 flex justify-start">
                  <div className="rounded-2xl bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
                    typing...
                  </div>
                </div>
              )}

              <div ref={messageEndRef} />
            </div>

            <div className="border-t bg-white p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => {
                    setMessageText(e.target.value);
                    handleTyping();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  disabled={!selectedConversationId}
                  className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={
                    !selectedConversationId ||
                    isSendingMessage ||
                    !messageText.trim()
                  }
                  className="rounded-xl bg-blue-600 px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSendingMessage ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}