import {
  Calendar,
  Briefcase,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { useParams } from "react-router-dom"

import { Sidebar } from "@/components/gymAdmin/sidebar"
import { TopBar } from "@/components/gymAdmin/topbar"

import { SpecializationCard } from "@/components/gymAdmin/employeeManagement/empolyeeSpecializationCard"
import StatCard from "@/components/gymAdmin/employeeManagement/employeeStateCard"
import InfoField from "@/components/gymAdmin/employeeManagement/trainerInfoField"
import { DutyCard } from "@/components/gymAdmin/employeeManagement/employeeDutyCard"

import { useFindTrainer } from "@/hook/gymAdmin/trainerManagementHook"


function TrainerDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-zinc-800/60"
          />
        ))}
      </div>

      <div className="rounded-xl border border-zinc-800 bg-black p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-zinc-800 rounded" />
          <div className="h-3 w-32 bg-zinc-800 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 rounded-lg bg-zinc-800/60"
            />
          ))}
        </div>

        <div className="h-20 rounded-lg bg-zinc-800/60" />
      </div>
    </div>
  )
}


export default function TrainerDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const { data, isPending } = useFindTrainer(id!)

  if (isPending) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Sidebar />
        <TopBar title="Trainer Details" subtitle="Loading..." />

        <div className="ml-64 flex min-h-screen flex-col">
          <main className="flex-1 p-6">
            <div className="mx-auto w-full max-w-7xl">
              <TrainerDetailsSkeleton />
            </div>
          </main>
        </div>
      </div>
    )
  }

  const trainer = data?.data ?? {}
  if (!trainer) return null


  const joinedDate = new Date(trainer.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })

  const dutyTime = `${trainer.dutyTime.startTime} - ${trainer.dutyTime.endTime}`

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <TopBar title={trainer.name} subtitle="Employee Details" />

      <div className="ml-64 flex min-h-screen flex-col">
        <main className="flex-1 p-6">
          <div className="mx-auto w-full max-w-7xl space-y-6">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={Calendar}
                label="Joined"
                value={joinedDate}
              />

              <StatCard
                icon={Briefcase}
                label="Experience"
                value={`${trainer.experience} Years`}
              />

              <SpecializationCard
                specializations={trainer.specialization}
              />

              <DutyCard duty={dutyTime} />
            </div>


            <div className="rounded-xl border border-orange-500/20 bg-black p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>
                <p className="text-sm text-zinc-400">
                  Trainer details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label="Full Name"
                  value={trainer.name}
                  icon={Mail}
                />
                <InfoField
                  label="Email"
                  value={trainer.email}
                  icon={Mail}
                />
                <InfoField
                  label="Phone"
                  value={trainer.phone}
                  icon={Phone}
                />
                <InfoField
                  label="Role"
                  value={trainer.role}
                />
              </div>

              <InfoField
                label="Address"
                value={trainer.address}
                icon={MapPin}
                full
              />
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
