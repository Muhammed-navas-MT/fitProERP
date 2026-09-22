import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { TableSkeleton } from "./memberManagement/TableSkeleton";

interface SkeltonProp {
  title: string;
  description: string;
}

export default function GymAdminTablePageSkeleton({
  title,
  description,
}: SkeltonProp) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar title={title} subtitle={description}>
        <div className="mb-6 h-[52px] animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/40" />
        <TableSkeleton />
      </TopBar>
    </div>
  );
}
