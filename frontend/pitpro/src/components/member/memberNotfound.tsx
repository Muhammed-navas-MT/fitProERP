import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A] px-6">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_45%)]" />

      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl"
      >
        <div className="rounded-3xl border border-orange-500/20 bg-white/[0.03] p-10 backdrop-blur-xl">

          <motion.h1
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="text-center text-[110px] font-black leading-none tracking-tight text-orange-500 md:text-[170px]"
          >
            404
          </motion.h1>

          <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          <h2 className="mt-8 text-center text-3xl font-semibold text-white">
            Page not found
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-center leading-8 text-zinc-400">
            The page you're trying to access doesn't exist, may have been
            removed, or you don't have permission to view it.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-8 text-zinc-300 transition-all duration-300 hover:border-orange-500/40 hover:text-white"
            >
              Go Back
            </button>

          </div>

          <div className="mt-12 flex justify-center">

            <div className="rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-orange-300">
              Member Portal
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}