import { ReusableTable, TableColumn } from "@/components/shared/reusableTable"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Ban, CheckCircle } from "lucide-react"
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
  const columns: TableColumn<IListPackageItemType>[] = [
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
        <span
          className={`rounded px-3 py-1 text-xs font-medium ${
            pkg.isActive
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {pkg.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-center",
      render: (pkg) => (
        <div className="flex justify-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onView(pkg.id)}
            className="text-blue-400 hover:bg-blue-500/10"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(pkg)}
            className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </Button>

          {pkg.isActive ? (
            <Button
              size="icon"
              variant="ghost"
              disabled={isBlocking}
              onClick={() => onBlock(pkg.id)}
              className="text-red-500 hover:bg-red-500/10"
            >
              <Ban className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              disabled={isUnblocking}
              onClick={() => onUnblock(pkg.id)}
              className="text-green-500 hover:bg-green-500/10"
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <ReusableTable
      title="Packages"
      data={packages}
      columns={columns}
      emptyText="No packages found"
    />
  )
}
