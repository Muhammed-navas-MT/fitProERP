export function MemberHealthCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <div className="mb-2 flex items-center gap-2 text-purple-400">
        {icon}
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
