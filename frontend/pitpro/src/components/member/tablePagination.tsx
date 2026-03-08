interface TablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      
      <p className="text-zinc-400">
        Page <span className="text-white">{page}</span> of{" "}
        <span className="text-white">{totalPages}</span>
      </p>

      <div className="flex gap-2">

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 disabled:opacity-40"
        >
          Next
        </button>

      </div>
    </div>
  );
}