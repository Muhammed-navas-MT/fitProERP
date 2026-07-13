import { motion } from "framer-motion";

export default function SuperAdminNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0E1116] px-6">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Blue Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute -top-60 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500 blur-[180px]"
      />

      {/* Cyan Glow */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500 blur-[180px]"
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative w-full max-w-2xl"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(59,130,246,.15)]">
          <motion.h1
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-center text-[120px] font-black leading-none tracking-tight text-transparent md:text-[180px]"
          >
            404
          </motion.h1>

          <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <h2 className="mt-8 text-center text-4xl font-bold text-white">
            Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-center leading-8 text-slate-400">
            The page you're trying to access doesn't exist or may have been
            removed. Return to the Super Admin portal to continue managing your
            FitPro ERP platform.
          </p>

          <p className="mt-3 text-center text-sm text-cyan-400">
            Error Code • 404
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => window.history.back()}
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-8 py-3 font-semibold text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white"
            >
              Go Back
            </button>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Super Admin Portal
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
