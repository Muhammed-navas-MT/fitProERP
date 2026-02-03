import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "@/components/trainer/trainerHeader";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";
import  MembersList from "@/components/trainer/memberManagement/memberList";

export function MembersPage() {
  const name = useSelector((state: rootstate) => state.authData.name);
  const avatarText =
    name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "";

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <div className="flex-1 lg:ml-[220px]">
        <Header
          title="Member Management"
          subtitle="Manage and track your assigned members"
          avatar={avatarText}
        />

        <main className="p-4 md:p-8">
          <MembersList />
        </main>
      </div>
    </div>
  );
}
