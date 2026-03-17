import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { CreateWorkoutButton } from "./createWorkoutButton";

export function EmptyWorkoutState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">

      {/* Animated icon */}
      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 0],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center"
      >
        <Dumbbell className="w-10 h-10 text-orange-500" />
      </motion.div>

      {/* Text */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-200">
          No Workout Plan Yet
        </h2>

        <p className="text-zinc-500 max-w-md">
          Generate your personalized gym routine and start building strength.
        </p>
      </div>

      {/* Button */}
      <CreateWorkoutButton onClick={onCreate} />
    </div>
  );
}