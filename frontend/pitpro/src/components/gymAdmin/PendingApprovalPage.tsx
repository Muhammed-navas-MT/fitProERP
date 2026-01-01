import { Mail, Clock, CheckCircle2, XCircle, ShieldCheck } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d10] via-[#111418] to-[#1a1f24] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <div className="bg-[#1a1f24] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Account Pending Approval
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Your gym registration has been successfully submitted
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 sm:p-6 mb-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-white font-semibold text-base sm:text-lg mb-2">
                    What happens next?
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Our super admin team is currently reviewing your gym registration. You will receive an email
                    notification within 24 hours with the status of your application.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">

              <div className="flex gap-4 md:flex-col md:items-center md:text-center md:flex-1">
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 rounded-full p-2">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-700 mt-2 md:w-full md:h-0.5 md:mt-0 md:ml-2" />
                </div>
                <div className="pb-6 md:pb-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                    Registration Submitted
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Your gym information has been successfully received
                  </p>
                </div>
              </div>

              <div className="flex gap-4 md:flex-col md:items-center md:text-center md:flex-1">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 rounded-full p-2 animate-pulse">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-700 mt-2 md:w-full md:h-0.5 md:mt-0 md:ml-2" />
                </div>
                <div className="pb-6 md:pb-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                    Under Review
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Super admin is verifying your details (within 24 hours)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 md:flex-col md:items-center md:text-center md:flex-1">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-700 rounded-full p-2">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 font-semibold text-sm sm:text-base mb-1">
                    Email Notification
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    You will receive approval or feedback via email
                  </p>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="text-white font-semibold text-sm sm:text-base">If Approved</h3>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  You'll get instant access to your gym dashboard with all management features
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <h3 className="text-white font-semibold text-sm sm:text-base">If Rejected</h3>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  You'll receive detailed feedback and can resubmit with corrections
                </p>
              </div>
            </div>

            <div className="bg-[#111418] border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-orange-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Check Your Email</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Make sure to check your inbox (and spam folder). All updates will be sent via email.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="bg-gray-800 px-3 py-1 rounded-full">Review time: 24 hours</span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full">Email updates included</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[#111418] border-t border-gray-800 p-4 sm:p-6 text-center">
            <p className="text-gray-400 text-xs sm:text-sm mb-3">
              Need immediate assistance? Contact our support team
            </p>
            <a
              href="mailto:support@fitpro.com"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              support@fitpro.com
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            This is an automated review process. Thank you for your patience.
          </p>
        </div>
      </div>
    </div>
  )
}
