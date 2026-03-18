import { Target } from "lucide-react";

export function MonthlyGoalCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 to-orange-500 p-6 text-white">
      <div className="relative z-10">
        <p className="text-sm text-orange-100">Monthly Goal</p>
        <h3 className="mt-1 text-2xl font-bold">12 / 20 Sessions</h3>

        <div className="mt-4 h-2 w-full rounded-full bg-white/20">
          <div className="h-full w-[60%] rounded-full bg-white" />
        </div>
      </div>

      <Target className="absolute -bottom-4 -right-4 h-28 w-28 rotate-12 text-white/10" />
    </div>
  );
}