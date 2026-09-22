interface ScheduleItemProps {
  name: string;
  type: string;
  time: string;
  profileImg?: string;
}

export function ScheduleItem({
  name,
  type,
  time,
  profileImg,
}: ScheduleItemProps) {
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="flex items-center justify-between gap-2 bg-black border border-[#2a2a2a] rounded-lg p-3 sm:p-4 hover:border-purple-500/30 transition-colors">

      <div className="flex items-center gap-3 min-w-0">

        {/* Profile Image or Fallback */}
        {profileImg ? (
          <img
            src={profileImg}
            alt={name}
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full object-cover border border-[#2a2a2a]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            {firstLetter}
          </div>
        )}

        {/* Name + Type */}
        <div className="min-w-0">
          <h4 className="text-white font-semibold text-sm mb-1 truncate">{name}</h4>
          <p className="text-gray-400 text-xs truncate">{type}</p>
        </div>
      </div>

      {/* Time */}
      <p className="text-purple-400 text-xs sm:text-sm font-semibold shrink-0 text-right">{time}</p>
    </div>
  );
}