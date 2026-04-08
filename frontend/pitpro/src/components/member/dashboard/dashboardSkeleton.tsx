import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { rootstate } from "@/store/store";
import { useSelector } from "react-redux";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-zinc-800/80 ${className}`} />
  );
}

export default function MemberDashboardSkeleton() {
    const name = useSelector((state: rootstate) => state.authData.name);
    const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
           avatar={avatarText}
          title={`Welcome Back, ${name || "Member"}!`}
          subtitle="Ready to crush your fitness goals today."
        />

        <main className="space-y-6 p-4 lg:p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="border border-gray-800 bg-[#0a0a0a] shadow-sm"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div className="space-y-3">
                      <SkeletonBlock className="h-4 w-28" />
                      <SkeletonBlock className="h-9 w-24" />
                      <SkeletonBlock className="h-3 w-32" />
                    </div>

                    <SkeletonBlock className="h-16 w-16 rounded-xl" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 space-y-3">
                <SkeletonBlock className="h-6 w-40" />
                <SkeletonBlock className="h-4 w-72" />
              </div>

              <div className="h-[280px] rounded-xl border border-zinc-900 bg-black/40 p-4">
                <div className="flex h-full items-end gap-3">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex h-full flex-1 flex-col justify-end gap-2"
                    >
                      <SkeletonBlock
                        className={`w-full rounded-t-md ${
                          index === 10
                            ? "h-16"
                            : index === 11
                              ? "h-28"
                              : "h-8"
                        }`}
                      />
                      <SkeletonBlock className="mx-auto h-3 w-10" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm">
              <CardHeader className="space-y-3">
                <SkeletonBlock className="h-7 w-48" />
              </CardHeader>

              <CardContent>
                <div className="rounded-2xl bg-zinc-900/80 p-5">
                  <div className="space-y-5">
                    {[1, 2, 3, 4].map((row) => (
                      <div
                        key={row}
                        className="flex items-center justify-between"
                      >
                        <SkeletonBlock className="h-4 w-28" />
                        <SkeletonBlock className="h-5 w-32" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <SkeletonBlock className="h-11 w-full rounded-xl" />
                  <SkeletonBlock className="h-11 w-full rounded-xl" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm">
              <CardHeader className="space-y-3">
                <SkeletonBlock className="h-7 w-56" />
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-7 gap-4 text-center">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <SkeletonBlock
                      key={`head-${index}`}
                      className="mx-auto h-5 w-8"
                    />
                  ))}

                  {Array.from({ length: 14 }).map((_, index) => (
                    <SkeletonBlock
                      key={`day-${index}`}
                      className="mx-auto h-5 w-5 rounded-full"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl border border-gray-800 bg-[#0a0a0a] shadow-xl">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-6 w-1 rounded" />
                <SkeletonBlock className="h-7 w-44" />
              </div>
              <SkeletonBlock className="h-4 w-40" />
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[1, 2].map((col) => (
                  <div key={col}>
                    <SkeletonBlock className="mb-4 h-6 w-28" />

                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="rounded-lg border border-gray-800 bg-[#0a0a0a] p-4"
                        >
                          <div className="flex items-center justify-between">
                            <SkeletonBlock className="h-5 w-40" />
                            <SkeletonBlock className="h-5 w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}