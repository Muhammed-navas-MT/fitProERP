import { Clock } from "lucide-react";

interface TrainerSlotCardProps {
  slot: {
    startTime: string;
    endTime: string;
    isBooked: boolean;
  };
}

export function TrainerSlotCard({ slot }: TrainerSlotCardProps) {
  return (
    <div className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-purple-500/40 transition-all w-[160px]">
      
      {/* Time */}
      <div className="flex items-center gap-2 text-white">
        <Clock className="w-3 h-3 text-purple-400" />
        <span className="text-xs font-medium">
          {slot.startTime} - {slot.endTime}
        </span>
      </div>

      {/* Status */}
      <div className="mt-2">
        <span
          className={`text-[10px] px-2 py-[2px] rounded-full border ${
            slot.isBooked
              ? "text-red-400 border-red-500/30 bg-red-500/10"
              : "text-green-400 border-green-500/30 bg-green-500/10"
          }`}
        >
          {slot.isBooked ? "Booked" : "Available"}
        </span>
      </div>
    </div>
  );
}