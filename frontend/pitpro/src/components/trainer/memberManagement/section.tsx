export function MemberSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#141414] p-4">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-purple-400">
        {icon}
        {title}
      </h3>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );
}