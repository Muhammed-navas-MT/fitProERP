import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ConversationItem, formatTime } from "@/types/member/chatType";

interface ChatConversationListProps {
  conversations: ConversationItem[];
  isLoading: boolean;
  selectedConversationId: string;
  currentUserId: string;
  onSelectConversation: (id: string) => void;
  trainerName:string;
}

export default function ChatConversationList({
  conversations,
  isLoading,
  selectedConversationId,
  currentUserId,
  onSelectConversation,
  trainerName
}: ChatConversationListProps) {
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return conversations;

    return conversations.filter((conversation) => {
      const participant = conversation.participants.find(
        (p) => p.userId !== currentUserId
      );

      const participantName = `${participant?.userModel || "user"} ${
        participant?.userId?.slice(-5) || ""
      }`.toLowerCase();

      const lastMessage = (conversation.lastMessage || "").toLowerCase();

      return (
        participantName.includes(value) || lastMessage.includes(value)
      );
    });
  }, [conversations, currentUserId, search]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-zinc-950">
      <div className="shrink-0 border-b border-zinc-900 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-6 text-center text-sm text-zinc-500">
            Loading conversations...
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-sm text-zinc-500">
            No conversations yet
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const participant = conversation.participants.find(
              (p) => p.userId !== currentUserId
            );

            const isSelected = selectedConversationId === conversation._id;

            return (
              <button
                key={conversation._id}
                type="button"
                onClick={() => onSelectConversation(conversation._id)}
                className={`flex w-full items-center gap-3 border-b border-zinc-900 px-4 py-3 text-left transition-colors ${
                  isSelected
                    ? "bg-zinc-900"
                    : "bg-transparent hover:bg-zinc-950"
                }`}
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-orange-500 text-sm font-bold text-white">
                  {(trainerName.toUpperCase() || "U")[0]}
                  {participant?.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-950 bg-green-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-white">
                      {trainerName}
                    </span>

                    <span className="shrink-0 text-[11px] text-zinc-500">
                      {conversation.lastMessageAt
                        ? formatTime(conversation.lastMessageAt)
                        : ""}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-zinc-400">
                      {conversation.lastMessage || "No messages yet"}
                    </span>

                    {!!conversation.unreadCount &&
                      conversation.unreadCount > 0 && (
                        <span className="min-w-5 rounded-full bg-orange-600 px-2 py-0.5 text-center text-[11px] font-bold text-white">
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
    </div>
  );
}