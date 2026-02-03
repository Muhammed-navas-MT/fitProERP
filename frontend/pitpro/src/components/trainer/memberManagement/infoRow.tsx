export function MemberInfoRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon && <div className="text-gray-500">{icon}</div>}
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className={highlight ? "text-purple-400 font-semibold" : ""}>
          {value}
        </p>
      </div>
    </div>
  );
}