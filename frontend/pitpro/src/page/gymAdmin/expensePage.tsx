import { useEffect, useState } from "react";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { SearchFilter } from "@/components/gymAdmin/searchFilterBar";
import { ViewExpenseModal } from "@/components/gymAdmin/expenseComponents/viewExpenseModal";
import { AddExpenseModal } from "@/components/gymAdmin/expenseComponents/addExpenseModal";
import { ExpenseStackedBarChart } from "@/components/gymAdmin/expenseComponents/expenseStackedBarChart";
import {
  AdminTable,
  type AdminTableColumn,
} from "@/components/gymAdmin/ui/AdminTable";
import { Pagination } from "@/components/gymAdmin/ui/Pagination";
import { StatusBadge } from "@/components/gymAdmin/ui/StatusBadge";
import UpdateExpenseModal from "@/components/gymAdmin/expenseComponents/updateExpenseModal";
import ExpensePageSkeleton from "@/components/gymAdmin/expenseComponents/ExpensePageSkeleton";

import { useDebounce } from "@/hook/useDebounce";
import { useListExpenses } from "@/hook/gymAdmin/expenseHooks";

import { ExpenseType } from "@/constants/expenseTypes";
import { PaymentMethod } from "@/types/paymentMethod";

export interface IExpenseItem {
  id: string;
  branch: {
    branchName: string;
    city: string;
    pincode: string;
  };
  expenseType: ExpenseType;
  description?: string;
  createdBy: {
    name: string;
    email: string;
  };
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  status: string;
  createdAt: Date;
}

export default function ExpensePage() {

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [viewOpen, setViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } =
    useListExpenses(page, debouncedSearch);

  const expenseData = data?.data?.expense ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const expenseSummary = data?.data?.expenseSummary ?? [];
  const thisMonthTotalExpense = data?.data?.thisMonthTotalExpense ?? 0;
  const grandTotal = data?.data?.grandTotal ?? 0;

  console.log(expenseSummary);

  const handleEdit = (id: string) => {
    setSelectedExpenseId(id);
    setUpdateOpen(true);
  };

  const handleView = (id: string) => {
    setSelectedExpenseId(id);
    setViewOpen(true);
  };

  const columns: AdminTableColumn<IExpenseItem>[] = [
    {
      header: "Branch",
      render: (row) => (
        <div>
          <p className="font-medium text-white">{row.branch.branchName}</p>
          <p className="text-xs text-zinc-400">
            {row.branch.city} • {row.branch.pincode}
          </p>
        </div>
      ),
    },
    {
      header: "Type",
      render: (row) => row.expenseType,
    },
    {
      header: "Amount",
      render: (row) => (
        <span className="font-semibold text-red-400">
          ₹{row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Payment",
      render: (row) => row.paymentMethod,
    },
    {
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Date",
      render: (row) => (
        <span className="text-zinc-400">
          {new Date(row.paymentDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Action",
      className: "text-center",
      render: (row) => (
        <div className="flex justify-center gap-2 text-sm font-medium">
          <button
            onClick={() => handleView(row.id)}
            className="rounded-md px-2 py-1 text-blue-400 transition-colors hover:bg-blue-500/10"
          >
            View
          </button>

          <button
            onClick={() => handleEdit(row.id)}
            className="rounded-md px-2 py-1 text-orange-400 transition-colors hover:bg-orange-500/10"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <Sidebar />
        <TopBar title="Expenses" subtitle="Track gym expenses">
          <ExpensePageSkeleton />
        </TopBar>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <Sidebar />
        <TopBar title="Expenses" subtitle="Track gym expenses">
          <div className="p-10 text-red-400">
            Failed to load expenses. Please refresh the page.
          </div>
        </TopBar>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      <Sidebar />

      <TopBar title="Expenses" subtitle="Track gym expenses">

        <div className="space-y-5">
          <SearchFilter
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            actionLabel="Add Expense"
            onActionClick={() => setAddOpen(true)}
          />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <p className="text-sm text-zinc-400">Total Expenses</p>
              <h2 className="mt-2 text-2xl font-bold text-red-400">
                ₹{grandTotal.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <p className="text-sm text-zinc-400">This Month</p>
              <h2 className="mt-2 text-2xl font-bold text-orange-400">
                ₹{thisMonthTotalExpense.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <p className="text-sm text-zinc-400">Categories</p>
              <h2 className="mt-2 text-2xl font-bold text-blue-400">7</h2>
            </div>
          </div>

          {/* Table */}
          <AdminTable
            title="Expense List"
            columns={columns}
            data={expenseData}
            rowKey={(row: IExpenseItem) => row.id}
            emptyText="No expenses found"
            footer={
              totalPages > 1 ? (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  summary={`Page ${page} of ${totalPages}`}
                />
              ) : undefined
            }
          />

          {/* Chart */}
          <ExpenseStackedBarChart data={expenseSummary} />
        </div>

      </TopBar>

      <ViewExpenseModal
        open={viewOpen}
        onOpenChange={() => setViewOpen(false)}
        expenseId={selectedExpenseId}
      />

      <AddExpenseModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />

      <UpdateExpenseModal
        open={updateOpen}
        expenseId={selectedExpenseId}
        onClose={() => {
          setUpdateOpen(false);
          setSelectedExpenseId("");
        }}
      />

    </div>
  );
}