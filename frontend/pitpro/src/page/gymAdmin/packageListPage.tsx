import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TopBar } from "@/components/gymAdmin/topbar";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { PackageTable } from "@/components/gymAdmin/packageManagement/packageTable";
import { AddPackageModal } from "@/components/gymAdmin/packageManagement/addPackageModal";
import { UpdatePackageModal } from "@/components/gymAdmin/packageManagement/updatePackageModal";
import { ViewPackageModal } from "@/components/gymAdmin/packageManagement/viewPackageModal";
import { SearchFilter } from "@/components/gymAdmin/searchFilterBar";
import {
  IListPackageItemType,
  ICreatePackageType,
} from "@/types/gymAdmin/packageTypes";
import {
  useListPackages,
  useCreatePackage,
  useUpdatePackage,
  useBlockPackage,
  useUnBlockPackage,
  useViewPackage,
  PAKCAGE_QUERY_KEYS,
} from "@/hook/gymAdmin/packageHooks";
import { useListActiveBranch } from "@/hook/gymAdmin/branchHooks";
import { toast } from "sonner";
import { useDebounce } from "@/hook/useDebounce";
import GymAdminTableSkeleton from "@/components/shared/gymAdminTableSkeleton";

export default function PackagePage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] =
    useState<IListPackageItemType | null>(null);

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, branchFilter]);

  const { data, isLoading } = useListPackages(
    page,
    debouncedSearchQuery,
    branchFilter || ""
  );
  const { data: viewPackage } = useViewPackage(
    selectedPackageId || "",
    viewOpen
  );
  const { data: branchResponse, isLoading: isBranchLoading } =
    useListActiveBranch();
  const updatePackage = useUpdatePackage(page, searchQuery, branchFilter);
  const blockPackage = useBlockPackage(page, searchQuery, branchFilter);
  const unblockPackage = useUnBlockPackage(page, searchQuery, branchFilter);
  const { mutate: create, isPending } = useCreatePackage();

  const packagesData = data;
  const viewPackageData = viewPackage?.data ?? null;
  const activeBranches = branchResponse?.data?.branches ?? [];

  const handleView = (id: string) => {
    setSelectedPackageId(id);
    setViewOpen(true);
  };

  const handleEdit = (pkg: IListPackageItemType) => {
    setSelectedPackage(pkg);
    setEditOpen(true);
  };

  const handleCreate = (payload: ICreatePackageType) => {
    create(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message || "Package created successfully");
        queryClient.invalidateQueries({
          queryKey: [
            PAKCAGE_QUERY_KEYS.PACKAGES,
            page,
            searchQuery,
            branchFilter,
          ],
        });
        setAddOpen(false);
      },
      onError: (err) => {
        toast.error(
          err?.message || "Error while adding new Package. Please try again."
        );
      },
    });
  };
  const handleUpdate = async (payload: IListPackageItemType) => {
    await updatePackage.mutateAsync({
      id: payload.id,
      data: payload,
    });
    setEditOpen(false);
  };

  const handleBlock = (id: string) => {
    blockPackage.mutate(id);
  };

  const handleUnblock = async (id: string) => {
    await unblockPackage.mutate(id);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const filteredPackages = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);

  if (isLoading) return <GymAdminTableSkeleton/>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />

      <TopBar title="Packages" subtitle="Manage your gym packages">
        <SearchFilter
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filterValue={branchFilter}
          onFilterChange={setBranchFilter}
          filterOptions={activeBranches.map(
            (branch: { id: string; branchName: string; address: string }) => ({
              label: `${branch.branchName} - ${branch.address}`,
              value: branch.id,
            })
          )}
          actionLabel="+ Add Package"
          onActionClick={() => setAddOpen(true)}
        />

        <PackageTable
          packages={filteredPackages}
          onView={handleView}
          onEdit={handleEdit}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
          isBlocking={blockPackage.isPending}
          isUnblocking={unblockPackage.isPending}
        />

        {!isLoading && packagesData && (
          <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
            <span>
              Page {packagesData.data.page} of {packagesData.data.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={packagesData.data.page === 1}
                onClick={() => handlePageChange(packagesData.data.page - 1)}
                className="rounded px-3 py-1 hover:bg-zinc-800 disabled:text-zinc-600"
              >
                Previous
              </button>

              <button
                disabled={
                  packagesData.data.page === packagesData.data.totalPages
                }
                onClick={() => handlePageChange(packagesData.data.page + 1)}
                className="rounded px-3 py-1 hover:bg-zinc-800 disabled:text-zinc-600"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </TopBar>

      <AddPackageModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleCreate}
        branches={activeBranches}
        isBranchLoading={isBranchLoading}
        isPending={isPending}
      />

      <UpdatePackageModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        packageData={selectedPackage}
        onSubmit={handleUpdate}
        branches={activeBranches}
        isBranchLoading={isBranchLoading}
      />

      <ViewPackageModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        pkg={viewPackageData}
      />
    </div>
  );
}
