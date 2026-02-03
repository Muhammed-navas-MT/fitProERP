export function MemberStatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 text-center">
      <p className="text-2xl font-bold text-purple-400">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}