import { Sidebar } from "@/components/gymAdmin/sidebar";
import { Bell } from "lucide-react";
import { TableSkeleton } from "./memberManagement/TableSkeleton";

interface SkeltonProp {
    title:string,
    description:string
}

export default function GymAdminTablePageSkeleton({title,description}:SkeltonProp) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 lg:ml-52">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4 lg:p-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-500 lg:text-3xl">{title}</h1>
            <p className="text-sm text-zinc-400">{description} </p>
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
