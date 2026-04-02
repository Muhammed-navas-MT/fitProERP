import { ConversationParticipant } from "@/types/member/chatType";
import { User } from "lucide-react";

interface ChatHeaderProps {
  otherParticipant?: ConversationParticipant;
  isTyping: boolean;
  name: string;
}

export default function ChatHeader({
  otherParticipant,
//   isTyping,
  name
}: ChatHeaderProps) {

  return (
    <div className="flex items-center gap-3 border-b border-[#2a2a2a] bg-[#1a1a1a] px-5 py-4">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10 text-sm font-bold text-purple-300 overflow-hidden">
        {name ? (
          (name.toUpperCase() || "U")[0]
        ) : (
          <User className="h-4 w-4" />
        )}

        {otherParticipant?.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1a1a1a] bg-emerald-500" />
        )}
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-white">
          {name}
        </div>

        {/* <div
          className={`text-xs ${
            isTyping
              ? "text-purple-400"
              : otherParticipant?.isOnline
                ? "text-emerald-400"
                : "text-gray-500"
          }`}
        >
          {isTyping
            ? "typing..."
            : otherParticipant?.isOnline
              ? "Online"
              : "Offline"}
        </div> */}
      </div>
    </div>
  );
}