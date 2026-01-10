export default function Footer() {
  return (
    <footer className="border-t border-orange-500/20 bg-gradient-to-b from-neutral-950 via-black to-black px-6 py-14 sm:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Brand */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30">
            F
          </div>
          <span className="text-lg font-extrabold tracking-wide text-white">
            FitPro ERP
          </span>
        </div>

        {/* CTA */}
        <div className="mb-10 max-w-xl">
          <h3 className="mb-3 text-xl font-bold text-white">
            Ready to Transform Your Gym?
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            Join hundreds of successful gym owners who’ve streamlined their
            operations using <span className="text-orange-400">FitPro ERP</span>.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8 text-center">
          <p className="text-xs text-neutral-500">
            © 2025 FitPro ERP. All rights reserved.
            <span className="hidden sm:inline">
              {" "}
              Powering the future of fitness management.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
