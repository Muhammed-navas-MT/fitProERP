import React from "react"

export type TableColumn<T> = {
  header: string
  render: (row: T, index: number) => React.ReactNode
  className?: string
}

interface ReusableTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  emptyText?: string
}

export function TrainerReusableTable<T>({
  data,
  columns,
  emptyText = "No data found",
}: ReusableTableProps<T>) {
  return (
    <div className="rounded-lg border border-purple-500/20 bg-black/40 p-4 lg:p-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-left text-zinc-400">
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-2">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-zinc-400"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-zinc-900 hover:bg-zinc-900/40 transition"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-3 px-2 ${col.className ?? ""}`}
                  >
                    {col.render(row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}