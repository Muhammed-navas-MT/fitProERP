import { motion } from "framer-motion";

export default function TrainerNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6">

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:38px_38px]" />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600 blur-[180px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-[-180px] right-[-150px] h-[420px] w-[420px] rounded-full bg-fuchsia-500 blur-[180px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: .7,
          ease: "easeOut",
        }}
        className="relative w-full max-w-3xl"
      >
        <div className="rounded-[32px] border border-violet-500/20 bg-white/[0.04] p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(139,92,246,.15)]">

          <motion.h1
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-500 bg-clip-text text-center text-[130px] font-black leading-none tracking-tight text-transparent md:text-[180px]"
          >
            404
          </motion.h1>

          <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

          <h2 className="mt-8 text-center text-4xl font-bold text-white">
            Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-center text-[16px] leading-8 text-zinc-400">
            Sorry, the page you're looking for doesn't exist,
            has been moved, or is unavailable.
          </p>

          <p className="mt-2 text-center text-sm text-violet-400">
            Error Code: 404 • Resource Not Found
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              onClick={() => window.history.back()}
              className="h-12 rounded-xl border border-zinc-700 bg-zinc-900/70 px-8 font-medium text-zinc-300 transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800 hover:text-white"
            >
              Go Back
            </button>

          </div>

          <div className="mt-12 flex items-center justify-center">

            <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-violet-300">
              Trainer Portal
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}