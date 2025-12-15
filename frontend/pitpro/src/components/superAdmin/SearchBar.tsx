import { Search, X } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  placeholder?: string
  onSearch: (value: string) => void
  showClearButton?: boolean
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  showClearButton = true,
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  const handleButton = () => {
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full">

      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full
          bg-[#1a1d23]
          border border-gray-700
          rounded-xl
          pl-9 sm:pl-10
          pr-28
          py-2 sm:py-2.5
          text-white
          placeholder-gray-500
          focus:outline-none
          focus:border-blue-600
          focus:ring-2
          focus:ring-blue-800
          transition
          text-sm sm:text-base
        "
      />
      <button
        onClick={handleButton}
        className="
          absolute right-10 top-1/2 -translate-y-1/2
          bg-blue-600 hover:bg-blue-700
          text-white
          text-xs sm:text-sm
          px-3 py-1.5
          rounded-lg
          transition
          whitespace-nowrap
        "
      >
        Search
      </button>

      {showClearButton && query && (
        <button
          onClick={handleClear}
          className="
            absolute right-3 top-1/2 -translate-y-1/2 
            text-gray-500 hover:text-white transition
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
