import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { TableSkeleton } from "../gymAdmin/memberManagement/TableSkeleton";

export default function GymAdminTableSkeleton() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar title="Packages" subtitle="Manage your gym packages">
        <div className="mb-5 h-[52px] animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/40" />
        <TableSkeleton />
      </TopBar>
    </div>
  );
}
