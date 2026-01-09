import { useEffect, useState } from "react";
import { Sidebar } from "@/components/member/memberSidebar";
import { MemberDTO } from "@/components/member/profileManagement/healthDetailsTab";
import { ProfileHeader } from "@/components/member/profileManagement/profileHeader";
import { MemberProfileSkeleton } from "@/components/member/profileManagement/profilepageSckeleton";
import { ProfileTabs } from "@/components/member/profileManagement/profileTabs";
import { Topbar } from "@/components/member/topbar";
import { useViewMemberProfile } from "@/hook/member/profileManagementHook";
import { toast } from "sonner";

import { UpdateProfileModal } from "@/components/member/profileManagement/updateProfileModal";
import { UpdatePasswordModal } from "@/components/member/profileManagement/updatePasswordModal";

export default function MemberProfilePage() {
  const { data, isLoading, isError, error } = useViewMemberProfile();
  const [open, setOpen] = useState(false);
   const [openPassword, setOpenPassword] = useState(false);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error ? error.message : "Failed to load profile";
      toast.error(message);
    }
  }, [isError, error]);

  const member: MemberDTO | undefined = data?.data;

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          title="Profile Settings"
          subtitle="Manage your personal information"
          avatar={member?.name ? member.name[0] : "M"}
        />

        <main className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Skeleton */}
            {isLoading && <MemberProfileSkeleton />}

            {/* Error */}
            {!isLoading && isError && (
              <div className="text-red-500 text-center">
                Failed to load profile. Please try again later.
              </div>
            )}

            {/* Profile */}
            {!isLoading && !isError && member && (
              <>
                <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-xl p-4">
                  {/* Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setOpen(true)}
                      className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition"
                    >
                      Update Profile
                    </button>

                    <button
                      onClick={() =>setOpenPassword(true)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      Update Password
                    </button>
                  </div>

                  {/* Profile Header */}
                  <ProfileHeader member={member} />
                </div>

                <ProfileTabs member={member} />
              </>
            )}

            {/* Modal */}
            {open && member && (
              <UpdateProfileModal
                member={member}
                isOpen={open}
                onClose={() => setOpen(false)}
              />
            )}
            {openPassword && (
              <UpdatePasswordModal
                isOpen={openPassword}
                onClose={() => setOpenPassword(false)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
