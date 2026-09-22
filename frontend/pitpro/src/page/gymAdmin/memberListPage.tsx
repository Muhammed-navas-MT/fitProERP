import { MemberList } from "@/components/gymAdmin/memberManagement/memberlist";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";

export default function EmployeesPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar title="Members" subtitle="Manage your gym members">
        <MemberList />
      </TopBar>
    </div>
  );
}
