import { useState } from "react";
import { Search, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/trainer/memberManagement/memberCard";
import { useGetAllMembers } from "@/hook/trainer/memberManagementHook";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";

export interface IMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  profileImg: string;
  status: string;
  avatar: string;
}

export function MembersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const { _id } = useSelector((state: rootstate) => state.trainerData);

  const { data, isPending } = useGetAllMembers(page, searchQuery, _id);
  if (isPending) return null;

  const members: IMember[] = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleFilter = () => {
    setPage(1);
    setSearchQuery(searchInput);
  };

  return (
    <Card className="bg-[#0f0f0f] border-[#2a2a2a] p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white">Members</h2>

        <div className="flex flex-col sm:flex-row gap-3 flex-1 md:max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search members by name or email..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  e.preventDefault();
                  handleFilter();
                }
              }}
              className="pl-10 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500"
            />
          </div>

          <Button onClick={handleFilter}className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Filter by
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#2a2a2a] bg-[#141414] py-14 text-center">
            <Users className="mb-4 h-10 w-10 text-gray-500" />
            <h3 className="mb-1 text-lg font-semibold text-white">
              No members found
            </h3>
            <p className="max-w-sm text-sm text-gray-400">
              No members match your search. Try a different keyword or check back
              later.
            </p>
          </div>
        ) : (
          members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-[#1a1a1a] border-[#2a2a2a] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <Button
                key={pageNumber}
                variant="outline"
                size="sm"
                onClick={() => setPage(pageNumber)}
                className={
                  page === pageNumber
                    ? "border-purple-500 bg-purple-500/20 text-white"
                    : "bg-transparent border-[#2a2a2a] text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                }
              >
                {pageNumber}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-[#1a1a1a] border-[#2a2a2a] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  );
}
