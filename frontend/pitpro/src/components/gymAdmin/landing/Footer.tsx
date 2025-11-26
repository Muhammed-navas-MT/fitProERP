export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 px-6 py-12 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 text-sm font-bold text-white">
            F
          </div>
          <span className="font-bold text-white">FitPro ERP</span>
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-lg font-bold text-white">Ready to Transform Your Gym?</h3>
          <p className="text-sm text-gray-400">
            Join hundreds of successful gym owners whose streamlined their operations with FitPro ERP.
          </p>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 FitPro ERP. All rights reserved. Powering the future of fitness management.</p>
        </div>
      </div>
    </footer>
  )
}
