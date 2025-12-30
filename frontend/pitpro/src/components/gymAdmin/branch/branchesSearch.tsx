import type React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface BranchesSearchProps {
  onSearch: (query: string) => void
}

export function BranchesSearch({ onSearch }: BranchesSearchProps) {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
        <Input
          type="text"
          placeholder="Search branches by name or location..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearch(e.target.value)
          }
          className="w-full border-zinc-800 bg-zinc-900 pl-10 text-white placeholder:text-zinc-600"
        />
      </div>
    </div>
  )
}
