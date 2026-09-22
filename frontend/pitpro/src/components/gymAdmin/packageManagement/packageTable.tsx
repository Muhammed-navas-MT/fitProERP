import { Edit, Eye, Ban, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminTable, type AdminTableColumn } from "@/components/gymAdmin/ui/AdminTable"
import { StatusBadge } from "@/components/gymAdmin/ui/StatusBadge"
import { adminIconBtn } from "@/components/gymAdmin/ui/adminUi"
import { IListPackageItemType } from "@/types/gymAdmin/packageTypes"

interface Props {
  packages: IListPackageItemType[]
  onView: (id: string) => void
  onEdit: (pkg: IListPackageItemType) => void
  onBlock: (id: string) => void
  onUnblock: (id: string) => void
  isBlocking?: boolean
  isUnblocking?: boolean
}

export function PackageTable({
  packages,
  onView,
  onEdit,
  onBlock,
  onUnblock,
  isBlocking = false,
  isUnblocking = false,
}: Props) {
  const columns: AdminTableColumn<IListPackageItemType>[] = [
    {
      header: "Package",
      render: (pkg) => (
        <div>
          <p className="font-medium text-white">{pkg.name}</p>
          <p className="text-xs text-zinc-400">{pkg.branchName}</p>
        </div>
      ),
    },
    {
      header: "Price",
      render: (pkg) => (
        <span className="text-orange-400 font-semibold">
          ₹{pkg.price}
        </span>
      ),
    },
    {
      header: "Duration",
      render: (pkg) => (
        <span className="text-zinc-300">
          {pkg.durationInDays} days
        </span>
      ),
    },
    {
      header: "Type",
      render: (pkg) => (
        <span className="text-zinc-300">
          {pkg.isDailySession ? "Daily Session" : "Monthly"}
        </span>
      ),
    },
    {
      header: "Features",
      render: (pkg) => (
        <div className="flex flex-wrap gap-1">
          {pkg.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
            >
              {feature}
            </span>
          ))}
          {pkg.features.length > 2 && (
            <span className="text-xs text-zinc-500">
              +{pkg.features.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      render: (pkg) => (
        <StatusBadge status={pkg.isActive ? "Active" : "Inactive"} />
      ),
    },
    {
      header: "Actions",
      className: "text-center",
      render: (pkg) => (
        <div className="flex justify-center gap-1">
          <button
            type="button"
            onClick={() => onView(pkg.id)}
            className={cn(adminIconBtn, "hover:text-blue-400")}
            aria-label="View package"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onEdit(pkg)}
            className={adminIconBtn}
            aria-label="Edit package"
          >
            <Edit className="h-4 w-4" />
          </button>

          {pkg.isActive ? (
            <button
              type="button"
              disabled={isBlocking}
              onClick={() => onBlock(pkg.id)}
              className={cn(adminIconBtn, "hover:bg-red-500/10 hover:text-red-400")}
              aria-label="Deactivate package"
            >
              <Ban className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isUnblocking}
              onClick={() => onUnblock(pkg.id)}
              className={cn(adminIconBtn, "hover:bg-green-500/10 hover:text-green-400")}
              aria-label="Activate package"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <AdminTable
      title="Packages"
      data={packages}
      columns={columns}
      rowKey={(pkg) => pkg.id}
      emptyText="No packages found"
    />
  )
}
