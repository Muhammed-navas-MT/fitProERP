import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MembersSearch() {
  return (
    <div className="mb-6 rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6">
      {/* Search Input */}
      <div className="mb-4 flex items-center gap-2 rounded-md border border-orange-500/20 bg-black px-4 py-2.5">
        <Search className="h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search members by name or email...."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
        />
      </div>

      {/* Date Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm text-white">Starting date</label>
          <input
            type="date"
            className="w-full rounded-md border border-orange-500/20 bg-black px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm text-white">Ending date</label>
          <input
            type="date"
            className="w-full rounded-md border border-orange-500/20 bg-black px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <Button className="w-full bg-orange-500 px-8 py-2.5 text-sm font-medium text-black hover:bg-orange-600 lg:w-auto">
          Filter
        </Button>
      </div>
    </div>
  )
}
