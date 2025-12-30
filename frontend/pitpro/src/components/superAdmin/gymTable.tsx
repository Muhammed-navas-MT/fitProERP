import { Eye, Ban } from "lucide-react"

export interface Gym {
  id: string
  name: string
  owner: {
    name: string
    email: string
  }
  plan: "Basic" | "Professional"
  branches: number
  employees: number
  status: "active" | "inactive" | "blocked"
}

interface GymListProps {
  gyms: Gym[]
  onViewDetail: (gymId: string) => void
  onBlock: (gymId: string) => void
}

export default function GymList({ gyms, onViewDetail, onBlock }: GymListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Gym Name</th>
            <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Owner</th>
            <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Plan</th>
            <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Branches</th>
            <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Employees</th>
            <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Status</th>
            <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {gyms.map((gym) => (
            <tr key={gym.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition">
              <td className="py-4 px-4">
                <span className="text-white font-semibold">{gym.name}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-col">
                  <span className="text-white font-medium">{gym.owner.name}</span>
                  <span className="text-gray-500 text-sm">{gym.owner.email}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-white">{gym.plan}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-white">{gym.branches}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-white">{gym.employees}</span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                    ${gym.status === "active" ? "bg-blue-500 text-white" : ""}
                    ${gym.status === "inactive" ? "bg-gray-600 text-gray-300" : ""}
                    ${gym.status === "blocked" ? "bg-red-600 text-white" : ""}
                  `}
                >
                  {gym.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewDetail(gym.id)}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition"
                  >
                    <Eye size={16} />
                    View Detail
                  </button>
                  <button
                    onClick={() => onBlock(gym.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition"
                  >
                    <Ban size={16} />
                    Block
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {gyms.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No gyms found</p>
        </div>
      )}
    </div>
  )
}
