import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface Exercise {
  name: string;
  equipment: string;
  sets: number;
  reps: string;
  rest: string;
}

interface ExerciseRowProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseRow({ exercise, index }: ExerciseRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl hover:bg-zinc-900/60 hover:border-zinc-800 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="text-xs font-mono text-zinc-600 w-4 tabular-nums">
          {(index + 1).toString().padStart(2, "0")}
        </div>
        <div>
          <h4 className="font-medium text-zinc-200 group-hover:text-zinc-50 transition-colors">
            {exercise.name}
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">{exercise.equipment}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-tighter text-zinc-500">Sets</span>
            <span className="text-sm font-mono font-medium tabular-nums text-zinc-200">{exercise.sets}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-tighter text-zinc-500">Reps</span>
            <span className="text-sm font-mono font-medium tabular-nums text-zinc-200">{exercise.reps}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-tighter text-zinc-500">Rest</span>
            <span className="text-sm font-mono font-medium tabular-nums text-zinc-200">{exercise.rest}s</span>
          </div>
        </div>
        <button className="p-2 rounded-lg bg-zinc-800/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-500/20 hover:text-orange-400">
          <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
