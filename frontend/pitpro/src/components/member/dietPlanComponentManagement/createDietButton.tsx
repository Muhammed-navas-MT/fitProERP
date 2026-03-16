import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export function CreateDietButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 transition text-sm font-medium"
    >
      <Plus className="w-4 h-4" />
      Generate Diet Plan
    </button>
  );
}