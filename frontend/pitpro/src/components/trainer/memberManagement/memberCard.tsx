import { Phone, Calendar, Edit, Eye, Ban, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    profileImg: string;
    status: string;
    avatar: string;
  };
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleBlock: (id: string, status: string) => void;
}

const isValidImageUrl = (url: string) =>
  typeof url === "string" &&
  (url.startsWith("http://") || url.startsWith("https://"));

export function MemberCard({ member, onView, onEdit, onToggleBlock }: MemberCardProps) {
  const isBlocked = member.status === "BLOCK";
  const isInactive = member.status === "IN_ACTIVE";

  const getBadgeColor = () => {
    if (isBlocked) return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
    if (isInactive) return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
    return "bg-green-500/20 text-green-400 hover:bg-green-500/30"; // active
  };

  return (
    <div className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-purple-500/50 transition-colors">
      {/* Avatar */}
      <Avatar className="h-12 w-12 bg-gradient-to-br from-purple-500 to-blue-500">
        {isValidImageUrl(member.profileImg) ? (
          <AvatarImage src={member.profileImg} alt={member.name} />
        ) : (
          <AvatarFallback className="bg-transparent text-white font-semibold">
            {member.avatar}
          </AvatarFallback>
        )}
      </Avatar>

      {/* Member Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm mb-1">{member.name}</h3>
            <p className="text-gray-400 text-xs truncate flex items-center gap-1">
              <span className="hidden sm:inline">✉</span>
              {member.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-gray-400">
              <Phone className="h-3 w-3" />
              <span>{member.phone}</span>
            </div>

            <div className="flex items-center gap-1 text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>{member.role}</span>
            </div>

            {/* Status Badge */}
            <Badge className={cn("text-xs font-medium", getBadgeColor())}>
              {member.status}
            </Badge>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* View */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                onClick={() => onView(member.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>

              {/* Edit */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                onClick={() => onEdit(member.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>

              {/* Block / Unblock */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 hover:bg-[#2a2a2a]",
                  isBlocked ? "text-green-400" : "text-red-400"
                )}
                onClick={() => onToggleBlock(member.id, member.status)}
              >
                {isBlocked ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
