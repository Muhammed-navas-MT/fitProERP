import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FilterOption {
  label: string
  value: string
}

interface SearchFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filterValue?: string
  onFilterChange?: (value: string) => void
  filterOptions?: FilterOption[]
  actionLabel?: string
  onActionClick?: () => void
}

export function SearchFilter({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  actionLabel,
  onActionClick,
}: SearchFilterProps) {
  return (
    <div className="mb-6 rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border-zinc-800 bg-black pl-10 text-white placeholder:text-zinc-500"
          />
        </div>

        {/* Filter */}
        {filterOptions.length > 0 && onFilterChange && (
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-10 rounded-md border border-zinc-800 bg-black px-3 text-sm text-white focus:border-orange-500 focus:outline-none"
          >
            <option value="">All</option>
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Action Button */}
        {actionLabel && onActionClick && (
          <div className="sm:w-1/6">
            <Button
              onClick={onActionClick}
              className="w-full bg-orange-500 text-white hover:bg-orange-600"
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
