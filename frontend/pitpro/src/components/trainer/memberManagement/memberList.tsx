import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/trainer/memberManagement/memberCard";
import { useBlockMember, useGetAllMembers, useUnblockMember } from "@/hook/trainer/memberManagementHook";
import { toast } from "sonner";
import { MembersListSkeleton } from "./memberListSkeleton";
import { AddMemberModal } from "./addMemberModal";
import { useDebounce } from "@/hook/useDebounce";

export interface IMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  profileImg: string;
  status: string;
  avatar: string;
  createdAt: Date;
}

export function MembersList() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 500);

  const { mutate: blockMember, isPending: isBlocking } = useBlockMember(page,debouncedSearch);
  const { mutate: unblockMember, isPending: isUnblocking } = useUnblockMember(page,debouncedSearch);

  const { data, isPending, error } = useGetAllMembers(page, debouncedSearch);

  const handleBlock = (memberId: string) => {
    blockMember(memberId, { 
      onSuccess:()=>{
        toast.success("Blocked successfully")
    },
    onError:()=>{
      toast.error("Error while blocking member. Please try again")
    }
  });
  };

  const handleUnblock = (memberId: string) => {
    unblockMember(memberId, { 
      onSuccess: () =>{
        toast.success("Unblocked successfully")
      },
      onError:()=>{
      toast.error("Error while unblocking member. Please try again")
    }
    });
  };

  // const handleEdit = (member) => {
  //   setSelectedMemberId(member.id);
  //   setUpdateModalOpen(true); 
  // };

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }, [error]);

  if (isPending) return <MembersListSkeleton />;

  const members: IMember[] = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <>
      <Card className="bg-[#0f0f0f] border-[#2a2a2a] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-white">Members</h2>

          <Button
            onClick={() => setIsAddMemberOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600
                       hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Add Member
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search members by name or email..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            className="pl-10 bg-[#1a1a1a] border-[#2a2a2a]
                       text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-3">
          {members.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#2a2a2a] bg-[#141414] py-14 text-center">
              <Users className="mb-4 h-10 w-10 text-gray-500" />
              <h3 className="mb-1 text-lg font-semibold text-white">
                No members found
              </h3>
              <p className="max-w-sm text-sm text-gray-400">
                No members match your search.
              </p>
            </div>
          ) : (
            members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onView={(id) => console.log("View", id)}
                onEdit={(id) => console.log("Edit", id)}
                onBlock={handleBlock}
                onUnBlock={handleUnblock}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={pageNumber}
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(pageNumber)}
                  className={
                    page === pageNumber
                      ? "border-purple-500 bg-purple-500/20 text-white"
                      : "bg-transparent border-[#2a2a2a] text-gray-400 hover:text-white"
                  }
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
            >
              Next
            </Button>
          </div>
        )}``
      </Card>

      <AddMemberModal
        open={isAddMemberOpen}
        onOpenChange={setIsAddMemberOpen}
        search={debouncedSearch}
        page={page}
      />
    </>
  );
}
