import { Sparkles } from "lucide-react";

interface CreateWorkoutButtonProps {
  onClick?: () => void;
}

export function CreateWorkoutButton({ onClick }: CreateWorkoutButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Sparkles className="w-4 h-4 text-orange-600" />
      <span className="text-sm font-medium text-zinc-200">Create with AI</span>
    </button>
  );
}
