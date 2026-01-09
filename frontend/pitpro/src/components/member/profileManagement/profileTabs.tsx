import { useState } from "react"
import { HealthDetailsTab, MemberDTO } from "./healthDetailsTab"
import { PersonalInfoTab } from "./personalInfoTab"
import { MembershipTab } from "./memberShipTab"

type TabType = "personal" | "health" | "membership"

interface ProfileTabsProps {
  member: MemberDTO
}

export function ProfileTabs({ member }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("personal")

  const tabs = [
    { id: "personal" as const, label: "Personal Info" },
    { id: "health" as const, label: "Health Details" },
    { id: "membership" as const, label: "Membership" },
  ]

  return (
    <div className="space-y-6 bg-[#000000] border border-gray-800 rounded-2xl p-6 shadow-2xl">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-800 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-5 py-3 text-sm md:text-base font-semibold whitespace-nowrap
                transition-all duration-200
                border-b-2
                ${
                  isActive
                    ? "border-orange-600 text-orange-500"
                    : "border-transparent text-gray-400 hover:text-white"
                }
              `}
            >
              {tab.label}

              {/* Active underline glow */}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 text-white transition-all duration-300">
        {activeTab === "personal" && <PersonalInfoTab member={member} />}
        {activeTab === "health" && <HealthDetailsTab member={member} />}
        {activeTab === "membership" && <MembershipTab member={member} />}
      </div>
    </div>
  )
}
