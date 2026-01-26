import MembershipCard, {
  type IListActivePackagesDTO,
} from "@/components/member/membershipManagement/memberShipCard";
import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import { useListActivepackage } from "@/hook/member/packageHook";
import { rootstate } from "@/store/store";
import { useSelector } from "react-redux";

export default function MemberShipPage() {

    const name = useSelector((state:rootstate)=>state.authData.name);
    const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

    const { data, isLoading, isError } = useListActivepackage();
      const plans: IListActivePackagesDTO[] = data?.data || [];

      if (isLoading) {
        return (
          <main className="min-h-screen bg-neutral-950 px-4 py-10">
            <h1>loading......</h1>
          </main>
        );
      }
      
        if (isError) {
          return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
              Failed to load packages
            </div>
          );
        }
  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          title="Membership Management"
          subtitle="Manage your Membership package"
          avatar={avatarText}
        />
        <MembershipCard packages={plans}/>
      </div>
    </div>
  );
}
