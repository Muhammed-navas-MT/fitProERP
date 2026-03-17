import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export function EmptyMembershipState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">

      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center"
      >
        <Crown className="w-10 h-10 text-orange-500" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-200">
          No Membership Plans Available
        </h2>

        <p className="text-zinc-500 max-w-md">
          There are currently no membership packages available.
          Please check back later.
        </p>
      </div>
    </div>
  );
}