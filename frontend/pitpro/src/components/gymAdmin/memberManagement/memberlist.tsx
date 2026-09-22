import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { AdminTable, type AdminTableColumn } from "@/components/gymAdmin/ui/AdminTable";
import { Pagination } from "@/components/gymAdmin/ui/Pagination";
import { StatusBadge } from "@/components/gymAdmin/ui/StatusBadge";
import { adminIconBtn } from "@/components/gymAdmin/ui/adminUi";
import { MembersSearch } from "./memberSearch";
import { TableSkeleton } from "./TableSkeleton";
import { NoMembersFound } from "./noMembersFound";
import { UpdateMemberModal } from "./updateMemberFormModal";
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchId: string;
  branchName: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  avatar: string;
}

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

  if (isPending) return <TableSkeleton />;
  const members = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleView = (memberId: string) => {
    navigate(
      `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DETAIL_MEMBER}/${memberId}`
    );
  };

  const handleEdit = (memberId:string) => {
    setSelectedMemberId(memberId);
    setUpdateModalOpen(true);
  };

  const handleBlock = (memberId: string) => {
    blockMember(memberId, { onSuccess: () => refetch() });
  };

  const handleUnblock = (memberId: string) => {
    unblockMember(memberId, { onSuccess: () => refetch() });
  };

  const columns: AdminTableColumn<Member>[] = [
    {
      header: "Name",
      render: (member) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-500 text-xs font-bold text-white">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              member.name.charAt(0).toUpperCase()
            )}
          </div>
          <span className="font-medium text-white">{member.name}</span>
        </div>
      ),
    },
    { header: "Email", render: (member) => member.email },
    { header: "Phone", render: (member) => member.phone },
    {
      header: "Branch",
      render: (member) => (
        <span className="text-orange-500">{member.branchName ?? "-"}</span>
      ),
    },
    {
      header: "Status",
      render: (member) => <StatusBadge status={member.status} />,
    },
    {
      header: "Joined",
      render: (member) => (
        <span className="text-zinc-400">
          {new Date(member.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-center",
      render: (member) => (
        <div className="flex justify-center gap-1">
          <button
            type="button"
            onClick={() => handleView(member.id)}
            className={cn(adminIconBtn, "hover:text-blue-400")}
            aria-label="View member"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleEdit(member.id)}
            className={adminIconBtn}
            aria-label="Edit member"
          >
            <Edit className="h-4 w-4" />
          </button>

          {member.status === "ACTIVE" ? (
            <button
              type="button"
              disabled={isBlocking}
              onClick={() => handleBlock(member.id)}
              className={cn(adminIconBtn, "hover:bg-red-500/10 hover:text-red-400")}
              aria-label="Block member"
            >
              <Ban className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isUnblocking}
              onClick={() => handleUnblock(member.id)}
              className={cn(adminIconBtn, "hover:bg-green-500/10 hover:text-green-400")}
              aria-label="Unblock member"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <MembersSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <AdminTable
        data={members}
        columns={columns}
        rowKey={(member) => member.id}
        emptyState={<NoMembersFound />}
        footer={
          totalPages > 1 ? (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          ) : undefined
        }
      />

      <UpdateMemberModal
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        memberId={selectedMemberId}
      />
    </div>
  );
}
