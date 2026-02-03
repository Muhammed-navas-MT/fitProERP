import { MemberHealthCard } from "@/components/trainer/memberManagement/healthCard";
import { MemberInfoRow } from "@/components/trainer/memberManagement/infoRow";
import { MemberSection } from "@/components/trainer/memberManagement/section";
import { MemberStatCard } from "@/components/trainer/memberManagement/statCard";
import { Header } from "@/components/trainer/trainerHeader";
import { Sidebar } from "@/components/trainer/trainerSidebar";
import { useParams } from "react-router-dom";
import { useFindMember } from "@/hook/trainer/memberManagementHook";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Weight,
  Ruler,
  AlertCircle,
  Calendar,
  CreditCard,
  Target,
  TrendingUp,
} from "lucide-react";

export default function MemberDetailPage() {
  const { memberId } = useParams<{ memberId: string }>();
  const { data, isPending, error } = useFindMember(memberId!);


  if (isPending) {
    return (
      <div className="flex min-h-screen bg-[#0f0f0f] text-white">
        <Sidebar />
        <div className="flex-1 lg:pl-[220px] p-6">Loading...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="flex min-h-screen bg-[#0f0f0f] text-white">
        <Sidebar />
        <div className="flex-1 lg:pl-[220px] p-6 text-red-500">
          Failed to load member
        </div>
      </div>
    );
  }

  const member = data.data;
  const pkg = member.package;


  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const daysRemaining = pkg?.endDate
    ? Math.max(
        Math.ceil(
          (new Date(pkg.endDate).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        ),
        0
      )
    : null;

  const isActive = member.status === "ACTIVE";


  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar />

      <div className="flex w-full flex-col lg:pl-[220px]">
        <Header
          title={member.name}
          subtitle={`Member ID: ${member.id} • Status: ${member.status}`}
          avatar={member.name?.[0]?.toUpperCase()}
        />

        <div className="space-y-6 p-6">
          {/* Profile */}
          <div className="rounded-lg border border-[#2a2a2a] bg-[#141414] p-6">
            <div className="flex flex-col gap-6 md:flex-row md:justify-between">
              <div className="flex items-center gap-6">
                <div className="h-32 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                  <img
                    src={
                      member.profileImg ||
                      `https://ui-avatars.com/api/?name=${member.name}`
                    }
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">{member.name}</h2>
                  <p className="text-sm text-gray-400">{member.role}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={
                        isActive ? "text-green-400" : "text-red-400"
                      }
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MemberStatCard
                  value={calculateAge(member.healthDetails.dateOfBirth)}
                  label="Years Old"
                />
                <MemberStatCard
                  value={
                    daysRemaining !== null ? daysRemaining : "N/A"
                  }
                  label="Days Remaining"
                />
              </div>
            </div>
          </div>

          {/* Contact & Package */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Contact */}
            <MemberSection title="Contact Information" icon={<Mail />}>
              <MemberInfoRow icon={<Mail />} label="Email" value={member.email} />
              <MemberInfoRow icon={<Phone />} label="Phone" value={member.phone} />
              <MemberInfoRow
                icon={<AlertCircle />}
                label="Emergency"
                value={member.emergencyNumber}
              />
              <MemberInfoRow
                icon={<MapPin />}
                label="Address"
                value={member.address}
              />
            </MemberSection>

            {/* Package */}
            <MemberSection title="Package Information" icon={<CreditCard />}>
              <MemberInfoRow label="Plan ID" value={pkg?.planId || "N/A"} />
              <MemberInfoRow
                label="Price"
                value={pkg?.price ? `₹${pkg.price}` : "N/A"}
                highlight
              />
              <MemberInfoRow
                label="Status"
                value={pkg?.status || "N/A"}
              />
              <MemberInfoRow
                label="Start Date"
                value={formatDate(pkg?.startDate)}
              />
              <MemberInfoRow
                label="End Date"
                value={formatDate(pkg?.endDate)}
              />
            </MemberSection>
          </div>

          {/* Health */}
          <div className="rounded-lg border border-[#2a2a2a] bg-[#141414] p-6">
            <h3 className="mb-4 text-lg font-semibold text-purple-400">
              Health Information
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              <MemberHealthCard
                icon={<Heart />}
                label="Gender"
                value={member.healthDetails.gender}
              />
              <MemberHealthCard
                icon={<Calendar />}
                label="DOB"
                value={formatDate(member.healthDetails.dateOfBirth)}
              />
              <MemberHealthCard
                icon={<Weight />}
                label="Weight"
                value={`${member.healthDetails.weight.value} ${member.healthDetails.weight.unit}`}
              />
              <MemberHealthCard
                icon={<Ruler />}
                label="Height"
                value={`${member.healthDetails.height.value} ${member.healthDetails.height.unit}`}
              />
              <MemberHealthCard
                icon={<TrendingUp />}
                label="Fitness Goal"
                value={member.healthDetails.fitnessGoal}
              />
              <MemberHealthCard
                icon={<Target />}
                label="Target Weight"
                value={`${member.healthDetails.targetWeight.value} ${member.healthDetails.targetWeight.unit}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}