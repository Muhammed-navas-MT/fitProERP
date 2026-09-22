import { Edit2, Lock, Unlock, MoreVertical, Building2, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/gymAdmin/ui/StatusBadge";

interface BranchCardProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  members: number;
  staff: number;
  revenue: number;
  isActive: "ACTIVE" | "IN_ACTIVE";
  onEdit: (id: string) => void;
  onToggleBlock: (id: string) => void;
  onToggleUnBlock: (id: string) => void;
}

export function BranchCard({
  id,
  name,
  address,
  phone,
  members,
  staff,
  revenue,
  isActive,
  onEdit,
  onToggleBlock,
  onToggleUnBlock,
}: BranchCardProps) {
  const isBranchActive = isActive === "ACTIVE";

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-sm transition-colors hover:border-orange-500/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-semibold text-white">{name}</h3>
              <StatusBadge status={isBranchActive ? "Active" : "Inactive"} />
            </div>

            <p className="mt-1 flex items-start gap-1.5 text-xs text-zinc-400">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-2">{address}</span>
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {phone}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900">
            <DropdownMenuItem
              onClick={() => onEdit(id)}
              className="cursor-pointer text-white hover:bg-zinc-800"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                isBranchActive ? onToggleBlock(id) : onToggleUnBlock(id)
              }
              className="cursor-pointer text-white hover:bg-zinc-800"
            >
              {isBranchActive ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Block
                </>
              ) : (
                <>
                  <Unlock className="mr-2 h-4 w-4" />
                  Unblock
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-950/40 py-3 text-center">
        <div>
          <p className="text-lg font-bold text-white">{members}</p>
          <p className="text-xs text-zinc-400">Members</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">{staff}</p>
          <p className="text-xs text-zinc-400">Staff</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">{revenue.toLocaleString()}</p>
          <p className="text-xs text-zinc-400">Revenue</p>
        </div>
      </div>

      <Button
        onClick={() => onEdit(id)}
        variant="outline"
        className="mt-4 w-full border-orange-500/30 bg-transparent text-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
      >
        <Edit2 className="mr-2 h-4 w-4" />
        Edit
      </Button>
    </div>
  );
}
