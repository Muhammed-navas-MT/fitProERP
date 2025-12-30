import { Edit2, Lock, Unlock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  console.log(id,"adsfasdfsadfasdfasdfas")
  return (
    <div className="rounded-lg border border-orange-500/30 bg-black p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-orange-500/20 p-2">
            <svg
              className="h-5 w-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.05 3H3a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2h-1.05A2 2 0 0016 1H4a2 2 0 00-2 2zm12 9V5H4v7h12z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">{name}</h3>

              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  isBranchActive
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {isBranchActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>

            <p className="text-xs text-zinc-400">{address}</p>
            <p className="mt-1 text-xs text-zinc-400">{phone}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-zinc-400 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-zinc-900 border-zinc-800"
          >
            <DropdownMenuItem
              onClick={() => onEdit(id)}
              className="text-white cursor-pointer hover:bg-zinc-800"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                isBranchActive ? onToggleBlock(id) : onToggleUnBlock(id)
              }
              className="text-white cursor-pointer hover:bg-zinc-800"
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

      <div className="border-t border-zinc-800 pt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-white">{members}</p>
            <p className="text-xs text-zinc-400">Members</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{staff}</p>
            <p className="text-xs text-zinc-400">Staff</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {revenue.toLocaleString()}
            </p>
            <p className="text-xs text-zinc-400">Revenue</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={() => onEdit(id)}
          variant="outline"
          className="flex-1 border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  );
}
