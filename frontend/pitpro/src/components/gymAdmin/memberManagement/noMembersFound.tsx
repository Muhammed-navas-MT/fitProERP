import { Users } from "lucide-react";

export function NoMembersFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
        <Users className="h-7 w-7 text-orange-400" />
      </div>

      <h3 className="text-lg font-semibold text-white">
        No Members Found
      </h3>

      <p className="mt-1 text-sm text-zinc-400">
        Try adjusting your search or add a new member.
      </p>
    </div>
  );
}
