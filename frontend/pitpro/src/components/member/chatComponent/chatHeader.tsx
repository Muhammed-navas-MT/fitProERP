import { ConversationParticipant } from "@/types/member/chatType";

interface ChatHeaderProps {
  otherParticipant?: ConversationParticipant;
  isTyping: boolean;
  trainerName:string
}

export default function ChatHeader({
  otherParticipant,
  isTyping,
  trainerName
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-900 bg-zinc-950 px-5 py-4">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-orange-500 text-sm font-bold text-white">
        {(trainerName.toUpperCase() || "U")[0]}
        {otherParticipant?.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-950 bg-green-500" />
        )}
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-white">
          {trainerName}
        </div>

        {/* <div
          className={`text-xs ${
            isTyping
              ? "text-orange-400"
              : otherParticipant?.isOnline
              ? "text-green-400"
              : "text-zinc-500"
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