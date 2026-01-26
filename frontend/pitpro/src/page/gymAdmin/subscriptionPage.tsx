import { Sidebar } from "@/components/gymAdmin/sidebar";
import { SubscriptionSection } from "@/components/gymAdmin/subscriptionManagement/subscriptionSession";
import { TopBar } from "@/components/gymAdmin/topbar";

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar (hidden on mobile if your sidebar supports it) */}
      <Sidebar />

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          title="Subscription"
          subtitle="View your current plan and upgrade anytime"
        >

        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SubscriptionSection />
          </div>
        </main>
        </TopBar>
      </div>
    </div>
  );
}
