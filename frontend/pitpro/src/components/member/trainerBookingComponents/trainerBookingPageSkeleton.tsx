import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  avatar?: string;
  profileImg?:string;
}

export function TrainerBookingPageSkeleton({ avatar = "MB", profileImg }: Props) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          avatar={avatar}
          profileImg={profileImg}
          title="Trainer Booking"
          subtitle="Book your personal training session easily."
        />

        <main className="mx-auto w-full max-w-[1400px] space-y-6 p-4 lg:p-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="h-8 w-56 animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-80 animate-pulse rounded bg-zinc-900" />
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="border border-gray-800 bg-[#0a0a0a] shadow-sm"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div className="space-y-3">
                      <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
                      <div className="h-8 w-14 animate-pulse rounded bg-zinc-700" />
                      <div className="h-3 w-20 animate-pulse rounded bg-zinc-900" />
                    </div>
                    <div className="h-12 w-12 animate-pulse rounded-lg bg-zinc-800" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Left side */}
            <div className="space-y-6 lg:col-span-8">
              {/* Date selector skeleton */}
              <Card className="border border-gray-800 bg-[#0a0a0a]">
                <CardContent className="p-5">
                  <div className="mb-4 h-5 w-28 animate-pulse rounded bg-zinc-800" />

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={item}
                        className="min-w-[100px] animate-pulse rounded-2xl bg-zinc-900"
                        style={{ height: 96 }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Slots skeleton */}
              <Card className="border border-gray-800 bg-[#0a0a0a]">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-5 w-32 animate-pulse rounded bg-zinc-800" />
                    <div className="h-4 w-20 animate-pulse rounded bg-zinc-900" />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-gray-800 bg-zinc-950 p-4"
                      >
                        <div className="space-y-3">
                          <div className="h-5 w-28 animate-pulse rounded bg-zinc-800" />
                          <div className="h-4 w-20 animate-pulse rounded bg-zinc-900" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA skeleton */}
              <Card className="overflow-hidden border border-orange-600/20 bg-gradient-to-r from-zinc-950 to-[#161616]">
                <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 animate-pulse rounded-full bg-zinc-800" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
                      <div className="h-5 w-56 animate-pulse rounded bg-zinc-700" />
                      <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
                    </div>
                  </div>

                  <div className="h-12 w-full animate-pulse rounded-xl bg-orange-700/40 md:w-52" />
                </CardContent>
              </Card>
            </div>

            {/* Right side */}
            <div className="space-y-6 lg:col-span-4">
              <div className="h-5 w-36 animate-pulse rounded bg-zinc-800" />

              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <Card
                    key={item}
                    className="overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-none"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-4">
                        <div className="h-12 w-12 animate-pulse rounded-xl bg-zinc-900" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-28 animate-pulse rounded bg-zinc-800" />
                          <div className="h-3 w-24 animate-pulse rounded bg-zinc-900" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-800" />
                          <div className="h-4 w-4 animate-pulse rounded bg-zinc-900" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-orange-600 to-orange-500 p-6">
                <div className="space-y-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-orange-400/40" />
                  <div className="h-8 w-40 animate-pulse rounded bg-orange-300/40" />
                  <div className="h-2 w-full animate-pulse rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}