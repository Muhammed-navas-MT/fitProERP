import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Clock, MoreVertical } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { ListSessionsItem } from "@/types/member/memberSessionType";

interface Props {
  isLoadingSessions: boolean;
  sessions: ListSessionsItem[];
}

export function UpcomingSessionsSection({
  isLoadingSessions,
  sessions,
}: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleCancel = (sessionId: string) => {
    console.log("Cancel session:", sessionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
        <Activity className="h-4 w-4" />
        <h2>Upcoming Sessions</h2>
      </div>

      <div className="space-y-3">
        {isLoadingSessions ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-[88px] animate-pulse rounded-2xl bg-zinc-900"
              />
            ))
        ) : sessions.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-800 p-10 text-center">
            <p className="text-sm text-gray-500">
              No upcoming sessions found.
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <Card
              key={session._id}
              className="overflow-visible border border-gray-800 bg-[#0a0a0a] shadow-none transition-colors hover:border-gray-700"
            >
              <CardContent className="p-0">
                <div className="relative flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-zinc-900 text-gray-300">
                    <span className="text-[10px] font-bold uppercase leading-none">
                      {format(parseISO(session.date), "MMM")}
                    </span>
                    <span className="text-lg font-bold leading-none">
                      {format(parseISO(session.date), "dd")}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-white">
                      Trainer : {session.trainerDetail.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {session.startTime} - {session.endTime}
                    </div>
                  </div>

                  <div className="relative flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        session.status === "CONFIRMED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-zinc-800 text-gray-400"
                      }`}
                    >
                      {session.status}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === session._id ? null : session._id,
                        )
                      }
                      className="rounded-md p-1 hover:bg-zinc-800"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-400 hover:text-white" />
                    </button>

                    {openMenuId === session._id && (
                      <div className="absolute right-0 top-10 z-50 w-36 rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg">
                        <button
                          type="button"
                          onClick={() => {
                            handleCancel(session._id);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-800"
                        >
                          Cancel Session
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}