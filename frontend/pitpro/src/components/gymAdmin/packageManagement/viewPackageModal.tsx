import { BaseModal } from "@/components/shared/baseModal";
import { IListPackageItemType } from "@/types/gymAdmin/packageTypes";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  pkg: IListPackageItemType | null;
}

export function ViewPackageModal({ open, onClose, pkg }: Props) {
  if (!pkg) return null;

  return (
    <BaseModal
      isOpen={open}
      title="Package Details"
      onClose={() => {}}
      closeOnBackdrop={false}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
      >
        <X size={20} />
      </button>

      <div className="space-y-6 mt-2">
        <div className="grid grid-cols-2 gap-5 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
          <Info label="Package Name" value={pkg.name} />
          <Info label="Branch" value={pkg.branchName} />
          <Info label="Price" value={`₹ ${pkg.price}`} />
          <Info label="Duration" value={`${pkg.durationInDays} days`} />
          <Info
            label="Type"
            value={pkg.isDailySession ? "Daily Session" : "Monthly"}
          />

          <div>
            <p className="text-sm text-zinc-400">Status</p>
            <span
              className={cn(
                "mt-1 inline-block rounded-full px-4 py-1.5 text-sm font-medium",
                pkg.isActive
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {pkg.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-300">
            Included Features
          </p>

          {pkg.features.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {pkg.features.map((feature, i) => (
                <span
                  key={i}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-sm text-zinc-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">No features added</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-1 text-base font-medium text-white">{value}</p>
    </div>
  );
}
