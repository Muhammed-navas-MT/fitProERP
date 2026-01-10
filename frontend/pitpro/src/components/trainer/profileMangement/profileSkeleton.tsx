export default function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse">

      {/* Header */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-gray-700 rounded" />
          <div className="h-3 w-28 bg-gray-700 rounded" />
          <div className="h-3 w-20 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
          >
            <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
            <div className="h-6 w-24 bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="h-3 w-24 bg-gray-700 rounded mb-2" />
              <div className="h-10 w-full bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
