import { useEffect, useState } from "react";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { SearchFilter } from "@/components/gymAdmin/searchFilterBar";
import { ViewExpenseModal } from "@/components/gymAdmin/expenseComponents/viewExpenseModal";
import { AddExpenseModal } from "@/components/gymAdmin/expenseComponents/addExpenseModal";
import { ExpenseStackedBarChart } from "@/components/gymAdmin/expenseComponents/expenseStackedBarChart";
import { ReusableTable } from "@/components/shared/reusableTable";
import UpdateExpenseModal from "@/components/gymAdmin/expenseComponents/updateExpenseModal";

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

  const { data } = useListExpenses(page, debouncedSearch);

  const expenseData = data?.data?.expense ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const expenseSummary = data?.data?.expenseSummary ?? [];
  const thisMonthTotalExpense = data?.data?.thisMonthTotalExpense ?? 0;
  const grandTotal = data?.data?.grandTotal ?? 0;

  const handleEdit = (id: string) => {
    setSelectedExpenseId(id);
    setUpdateOpen(true);
  };

  const handleView = (id: string) => {
    setSelectedExpenseId(id);
    setViewOpen(true);
  };

  const columns = [
    {
      header: "Branch",
      render: (row: IExpenseItem) => (
        <div>
          <p className="font-medium">{row.branch.branchName}</p>
          <p className="text-xs text-zinc-400">
            {row.branch.city} • {row.branch.pincode}
          </p>
        </div>
      ),
    },
    {
      header: "Type",
      render: (row: IExpenseItem) => row.expenseType,
    },
    {
      header: "Amount",
      render: (row: IExpenseItem) => (
        <span className="text-red-400 font-semibold">
          ₹{row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Payment",
      render: (row: IExpenseItem) => row.paymentMethod,
    },
    {
      header: "Status",
      render: (row: IExpenseItem) => (
        <span className="text-sm">{row.status}</span>
      ),
    },
    {
      header: "Date",
      render: (row: IExpenseItem) =>
        new Date(row.paymentDate).toLocaleDateString(),
    },
    {
      header: "Action",
      render: (row: IExpenseItem) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleView(row.id)}
            className="text-blue-400 hover:underline"
          >
            View
          </button>

          <button
            onClick={() => handleEdit(row.id)}
            className="text-orange-400 hover:underline"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar title="Expenses" subtitle="Track gym expenses">
        <SearchFilter
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          actionLabel="Add Expense"
          onActionClick={() => setAddOpen(true)}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
            <p className="text-sm text-zinc-400">Total Expenses</p>
            <h2 className="text-2xl font-bold mt-2 text-red-400">
              ₹{grandTotal.toLocaleString()}
            </h2>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
            <p className="text-sm text-zinc-400">This Month</p>
            <h2 className="text-2xl font-bold mt-2 text-orange-400">
              ₹{thisMonthTotalExpense.toLocaleString()}
            </h2>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
            <p className="text-sm text-zinc-400">Categories</p>
            <h2 className="text-2xl font-bold mt-2 text-blue-400">7</h2>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <ReusableTable
            title="Expense List"
            columns={columns}
            data={expenseData}
          />

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-zinc-400">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 bg-zinc-800 rounded disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 bg-zinc-800 rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="grid gap-6 mt-8">
          <ExpenseStackedBarChart data={expenseSummary} />
        </div>
      </TopBar>

      {/* Modals */}

      <ViewExpenseModal
        open={viewOpen}
        onOpenChange={() => setViewOpen(false)}
        expenseId={selectedExpenseId}
      />

      <AddExpenseModal open={addOpen} onClose={() => setAddOpen(false)} />

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