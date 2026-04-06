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
    <div className="flex items-center justify-between bg-black border border-[#2a2a2a] rounded-lg p-4 hover:border-purple-500/30 transition-colors">
      
      <div className="flex items-center gap-3">
        
        {/* Profile Image or Fallback */}
        {profileImg ? (
          <img
            src={profileImg}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border border-[#2a2a2a]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            {firstLetter}
          </div>
        )}

        {/* Name + Type */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-1">{name}</h4>
          <p className="text-gray-400 text-xs">{type}</p>
        </div>
      </div>

      {/* Time */}
      <p className="text-purple-400 text-sm font-semibold">{time}</p>
    </div>
  );
}