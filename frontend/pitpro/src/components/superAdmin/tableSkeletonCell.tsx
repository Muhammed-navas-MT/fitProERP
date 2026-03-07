export const TableSkeletonCell = ({
  align = "left",
}: {
  align?: "left" | "center";
}) => (
  <td
    className={`px-6 py-4 ${align === "center" ? "text-center" : "text-left"}`}
  >
    <div className="h-4 bg-gray-800/60 rounded animate-pulse w-3/4 mx-auto" />
  </td>
);
