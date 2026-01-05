import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useListMembers,
  useBlockMember,
  useUnBlockMember,
  useFindMember,
} from "@/hook/gymAdmin/memberHooks";
import { Edit, Eye, Ban, CheckCircle } from "lucide-react";
import { useDebounce } from "@/hook/useDebounce";
import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { MembersSearch } from "./memberSearch";
import { MemberTableSkeleton } from "./memberTableSkeleton";
import { NoMembersFound } from "./noMembersFound";
import { UpdateMemberModal } from "./updateMemberFormModal";

export function MemberList() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isPending, refetch } = useListMembers(page, debouncedSearch);
  const { mutate: blockMember, isPending: isBlocking } = useBlockMember();
  const { mutate: unblockMember, isPending: isUnblocking } = useUnBlockMember();
  
  useFindMember(selectedMemberId);

  if (isPending) return <MemberTableSkeleton />;
  const members = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleView = (memberId: string) => {
    navigate(
      `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DETAIL_MEMBER}/${memberId}`
    );
  };

  const handleEdit = (member) => {
    setSelectedMemberId(member.id);
    setUpdateModalOpen(true); 
  };

  const handleBlock = (memberId: string) => {
    blockMember(memberId, { onSuccess: () => refetch() });
  };

  const handleUnblock = (memberId: string) => {
    unblockMember(memberId, { onSuccess: () => refetch() });
  };

  return (
    <div>
      <MembersSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-zinc-400">
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email</th>
              <th className="py-3 px-2">Phone</th>
              <th className="py-3 px-2">Branch</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Joined</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-zinc-400">
                  <NoMembersFound />
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-zinc-900 hover:bg-zinc-900/40 transition"
                >
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">
                      {member.name}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-zinc-300">{member.email}</td>
                  <td className="py-3 px-2 text-zinc-300">{member.phone}</td>
                  <td className="py-3 px-2 text-orange-500">
                    {member.branchName ?? "-"}
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`rounded px-3 py-1 text-xs font-medium ${
                        member.status === "ACTIVE"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-zinc-400">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleView(member.id)}
                        className="text-blue-400 hover:bg-blue-500/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(member)}
                        className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {member.status === "ACTIVE" ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={isBlocking}
                          onClick={() => handleBlock(member.id)}
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={isUnblocking}
                          onClick={() => handleUnblock(member.id)}
                          className="text-green-500 hover:bg-green-500/10"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            return (
              <Button
                key={pageNumber}
                size="sm"
                onClick={() => setPage(pageNumber)}
                className={
                  page === pageNumber
                    ? "bg-orange-500 text-white"
                    : "bg-[#1a1a1a] text-white"
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
          >
            Next
          </Button>

          <UpdateMemberModal
            open={updateModalOpen}
            onOpenChange={setUpdateModalOpen}
            memberId={selectedMemberId}
          />
        </div>
      </div>
    </div>
  );
}
