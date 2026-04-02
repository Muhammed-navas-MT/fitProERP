import { useMemo, useState } from "react";
import { Search, User } from "lucide-react";
import { ConversationItem, formatTime } from "@/types/member/chatType";

interface ChatConversationListProps {
  conversations: ConversationItem[];
  isLoading: boolean;
  selectedConversationId: string;
  currentUserId: string;
  onSelectConversation: (id: string) => void;
}

export default function ChatConversationList({
  conversations,
  isLoading,
  selectedConversationId,
  currentUserId,
  onSelectConversation,
}: ChatConversationListProps) {
  const [search, setSearch] = useState("");

  const getOtherMember = (conversation: ConversationItem) => {
    return conversation.members.find((member) => member.userId !== currentUserId);
  };

  const getOtherParticipant = (conversation: ConversationItem) => {
    return conversation.participants.find(
      (participant) => participant.userId !== currentUserId,
    );
  };

  const getParticipantName = (conversation: ConversationItem) => {
    const member = getOtherMember(conversation);

    return member?.name || `Member ${member?.userId?.slice(-5) || ""}`;
  };

  const filteredConversations = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return conversations;

    return conversations.filter((conversation) => {
      const participantName = getParticipantName(conversation).toLowerCase();
      const lastMessage = (conversation.lastMessage || "").toLowerCase();

      return (
        participantName.includes(value) || lastMessage.includes(value)
      );
    });
  }, [conversations, search]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#1a1a1a]">
      <div className="shrink-0 border-b border-[#2a2a2a] p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#2a2a2a] bg-[#121212] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-6 text-center text-sm text-gray-400">
            Loading conversations...
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">
            No conversations yet
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const participant = getOtherParticipant(conversation);
            const participantName = getParticipantName(conversation);
            const isSelected = selectedConversationId === conversation._id;

            return (
              <button
                key={conversation._id}
                type="button"
                onClick={() => onSelectConversation(conversation._id)}
                className={`flex w-full items-center gap-3 border-b border-[#2a2a2a] px-4 py-3 text-left transition-all ${
                  isSelected
                    ? "bg-purple-500/10"
                    : "bg-transparent hover:bg-[#202020]"
                }`}
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-purple-500/20 bg-purple-500/10 text-sm font-bold text-purple-300">
                  {participantName ? (
                    (participantName.toUpperCase() || "U")[0]
                  ) : (
                    <User className="h-4 w-4" />
                  )}

                  {participant?.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1a1a1a] bg-emerald-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-white">
                      {participantName}
                    </span>

                    <span className="shrink-0 text-[11px] text-gray-500">
                      {conversation.lastMessageAt
                        ? formatTime(conversation.lastMessageAt)
                        : ""}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-gray-400">
                      {conversation.lastMessage || "No messages yet"}
                    </span>

                    {!!conversation.unreadCount &&
                      conversation.unreadCount > 0 && (
                        <span className="min-w-5 rounded-full bg-purple-500 px-2 py-0.5 text-center text-[11px] font-bold text-white">
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