import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddMemberModal } from "./addMemberModal";

interface MemberSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function MembersSearch({ searchQuery, setSearchQuery }: MemberSearchProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="mb-6 rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search employees by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-zinc-800 bg-black pl-10 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="flex-shrink-0 sm:w-1/6">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full bg-orange-500 text-white hover:bg-orange-600"
          >
            Add Member
          </Button>
        </div>
      </div>

      <AddMemberModal open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}
