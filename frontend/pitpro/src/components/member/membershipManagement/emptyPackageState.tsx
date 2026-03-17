import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

export function EmptyPlansState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 border border-gray-800 rounded-xl bg-[#0a0a0a] text-center">

      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 mb-4"
      >
        <Dumbbell className="w-8 h-8 text-orange-500" />
      </motion.div>

      <h3 className="text-lg font-semibold text-gray-300">
        No Other Plans Available
      </h3>

      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        You are currently subscribed to the best available membership plan.
        New packages may be added later.
      </p>
    </div>
  );
}