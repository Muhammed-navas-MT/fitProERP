import { formatDateLabel, formatTime, MessageItem } from "@/types/member/chatType";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isOtherUserTyping]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const groupedMessages = useMemo(() => {
    const sortedMessages = [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
    <>
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
                            onClick={() => setPreviewImage(message.imageUrl!)}
                            className={`max-w-[220px] cursor-pointer rounded-lg transition hover:opacity-90 ${
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

      {previewImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition hover:bg-[#222]"
          >
            <X size={18} />
          </button>

          <img
            src={previewImage}
            alt="preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
