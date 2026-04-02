import { formatDateLabel, formatTime, MessageItem } from "@/types/member/chatType";
import { useEffect, useMemo, useRef } from "react";

interface ChatMessageAreaProps {
  messages: MessageItem[];
  isLoading: boolean;
  currentUserId: string;
  isOtherUserTyping: boolean;
}

export default function ChatMessageArea({
  messages,
  isLoading,
  currentUserId,
  isOtherUserTyping,
}: ChatMessageAreaProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isOtherUserTyping]);

  const groupedMessages = useMemo(() => {
    const sortedMessages = [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const groups: Record<string, MessageItem[]> = {};

    for (const message of sortedMessages) {
      const label = formatDateLabel(message.createdAt);

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(message);
    }

    return groups;
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto bg-[#0f0f0f] px-5 py-4">
      {isLoading ? (
        <div className="mt-10 text-center text-sm text-gray-400">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="mt-10 text-center text-sm text-gray-400">
          No messages yet. Say hello! 👋
        </div>
      ) : (
        Object.entries(groupedMessages).map(([dateLabel, dayMessages]) => (
          <div key={dateLabel}>
            <div className="my-3 flex justify-center">
              <span className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-[11px] text-gray-400">
                {dateLabel}
              </span>
            </div>

            <div className="space-y-1">
              {dayMessages.map((message) => {
                const isOwn = message.senderId === currentUserId;

                return (
                  <div
                    key={message._id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[65%] px-3.5 py-2 text-white shadow-sm ${
                        isOwn
                          ? "rounded-[16px_16px_4px_16px] bg-purple-500"
                          : "rounded-[16px_16px_16px_4px] border border-[#2a2a2a] bg-[#1a1a1a]"
                      }`}
                    >
                      {message.type === "IMAGE" && message.imageUrl && (
                        <img
                          src={message.imageUrl}
                          alt="shared"
                          className={`max-w-[220px] rounded-lg ${
                            message.text ? "mb-2" : ""
                          }`}
                        />
                      )}

                      {message.text && (
                        <p className="break-words text-sm leading-6">
                          {message.text}
                        </p>
                      )}

                      <div className="mt-1 flex items-center justify-end gap-2">
                        <span
                          className={`text-[10px] ${
                            isOwn ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.createdAt)}
                        </span>

                        {isOwn && (
                          <span className="text-[10px] text-white/70">
                            {message.status.toLowerCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {isOtherUserTyping && (
        <div className="mt-2 flex justify-start">
          <div className="rounded-[16px_16px_16px_4px] border border-purple-500/20 bg-[#1a1a1a] px-3.5 py-2.5 text-sm italic text-purple-400">
            typing...
          </div>
        </div>
      )}

      <div ref={messageEndRef} />
    </div>
  );
}