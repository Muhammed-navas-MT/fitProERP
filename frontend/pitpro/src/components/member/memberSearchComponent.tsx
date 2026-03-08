import { Search } from "lucide-react";

interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TableSearch({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: TableSearchProps) {
  return (
    <div
      className={`flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 w-full focus-within:border-zinc-600 transition-colors ${className}`}
    >
      <Search className="w-4 h-4 text-zinc-400 shrink-0" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm w-full text-white placeholder:text-zinc-500"
      />
    </div>
  );
}