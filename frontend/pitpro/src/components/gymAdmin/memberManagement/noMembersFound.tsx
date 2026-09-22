import { Users } from "lucide-react";
import { EmptyState } from "@/components/gymAdmin/ui/EmptyState";

export function NoMembersFound() {
  return (
    <EmptyState
      compact
      icon={Users}
      title="No Members Found"
      description="Try adjusting your search or add a new member."
    />
  );
}
