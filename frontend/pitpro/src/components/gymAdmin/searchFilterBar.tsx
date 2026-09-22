import { Search } from "lucide-react"
import { adminInput, adminPrimaryBtn } from "@/components/gymAdmin/ui/adminUi"

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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`${adminInput} pl-9`}
          />
        </div>

        {/* Filter */}
        {filterOptions.length > 0 && onFilterChange && (
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className={`${adminInput} sm:w-44`}
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
          <button
            type="button"
            onClick={onActionClick}
            className={`${adminPrimaryBtn} w-full sm:w-auto`}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
