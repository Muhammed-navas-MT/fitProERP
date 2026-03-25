import { useEffect, useMemo, useState } from "react";
import { TopBar } from "@/components/gymAdmin/topbar";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { SearchFilter } from "@/components/gymAdmin/searchFilterBar";
import { useGetAllRevenues } from "@/hook/gymAdmin/revenueHooks";
import { useDebounce } from "@/hook/useDebounce";
import RevenueTableSkeleton from "@/components/gymAdmin/revenueComponents/revenueTableSkeleton";
import RevenueErrorState from "@/components/gymAdmin/revenueComponents/revenueErrorState";
import { RevenueTable } from "@/components/gymAdmin/revenueComponents/revenueTable";
import { ViewRevenueModal } from "@/components/gymAdmin/revenueComponents/viewRevenueModal";

export interface IListRevenueItemType {
  id: string;
  branchName: string;
  branchAddress: {
    city: string;
    pincode: string;
  };
  memberName: string;
  email: string;
  source: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}

export default function RevenuePage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedRevenue, setSelectedRevenue] =
    useState<IListRevenueItemType | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery]);

  const { data, isLoading, isError, refetch } = useGetAllRevenues(
    page,
    debouncedSearchQuery,
  );

  const revenueData = data?.data?.revenues ?? [];
  const summary = data?.data?.summary ?? [];
  const grandTotalAmount = data?.data?.grandTotalAmount ?? 0;
  const totalCount = data?.data?.total ?? 0;

  const { planRevenue, sessionRevenue, planCount, sessionCount } = useMemo(() => {
    let planAmount = 0;
    let sessionAmount = 0;
    let planCount = 0;
    let sessionCount = 0;

    summary.forEach(
      (item: { count: number; sourceType: string; totalAmount: number }) => {
        if (item.sourceType === "Plan") {
          planAmount = item.totalAmount;
          planCount = item.count;
        }

        if (item.sourceType === "Booking") {
          sessionAmount = item.totalAmount;
          sessionCount = item.count;
        }
      },
    );

    return {
      planRevenue: planAmount,
      sessionRevenue: sessionAmount,
      planCount,
      sessionCount,
    };
  }, [summary]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleView = (id: string) => {
    const found = revenueData.find(
      (rev: IListRevenueItemType) => rev.id === id,
    );
    if (found) {
      setSelectedRevenue(found);
      setViewOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />

      <TopBar title="Revenue" subtitle="Track all gym income">
        {isLoading ? (
          <RevenueTableSkeleton />
        ) : isError ? (
          <RevenueErrorState onRetry={refetch} />
        ) : (
          <>
            <SearchFilter
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              actionLabel=""
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/* Total */}
              <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
                <p className="text-sm text-zinc-400">Total Revenue</p>
                <h2 className="text-2xl font-bold mt-2">
                  ₹{grandTotalAmount.toLocaleString()}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {totalCount} Transactions
                </p>
              </div>

              {/* Plan */}
              <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
                <p className="text-sm text-zinc-400">Plan Revenue</p>
                <h2 className="text-2xl font-bold mt-2 text-green-400">
                  ₹{planRevenue.toLocaleString()}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {planCount} Plans Sold
                </p>
              </div>

              {/* Session */}
              <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
                <p className="text-sm text-zinc-400">Session Revenue</p>
                <h2 className="text-2xl font-bold mt-2 text-blue-400">
                  ₹{sessionRevenue.toLocaleString()}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {sessionCount} Sessions Sold
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="mt-8">
              <RevenueTable revenues={revenueData} onView={handleView} />
            </div>

            {/* Pagination */}
            {data && (
              <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
                <span>
                  Page {data.data.page} of {data.data.totalPages}
                </span>

                <div className="flex gap-2">
                  <button
                    disabled={data.data.page === 1}
                    onClick={() => handlePageChange(data.data.page - 1)}
                    className="rounded px-3 py-1 hover:bg-zinc-800 disabled:text-zinc-600"
                  >
                    Previous
                  </button>

                  <button
                    disabled={data.data.page === data.data.totalPages}
                    onClick={() => handlePageChange(data.data.page + 1)}
                    className="rounded px-3 py-1 hover:bg-zinc-800 disabled:text-zinc-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </TopBar>

      <ViewRevenueModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        revenue={selectedRevenue}
      />
    </div>
  );
}