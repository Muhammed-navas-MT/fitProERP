import { Sidebar } from "@/components/gymAdmin/sidebar";
import { Bell } from "lucide-react";
import { TableSkeleton } from "../gymAdmin/memberManagement/TableSkeleton";

export default function GymAdminTableSkeleton() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 lg:ml-52">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4 lg:p-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-500 lg:text-3xl">Members</h1>
            <p className="text-sm text-zinc-400">Manage your gym Members</p>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-orange-500" />
          </div>
        </div>

        <div className="p-4 lg:p-8">
          <TableSkeleton />
        </div>
      </div>
    </div>
  );
}
