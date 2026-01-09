import { Mail, Clock, CheckCircle2, XCircle, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PendingApprovalPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl flex flex-col h-full">

        {/* Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full">

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 sm:p-6 text-center shadow-lg flex-shrink-0 relative">
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-orange-100 hover:text-white text-sm sm:text-base font-medium"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back
            </button>

            <div className="flex justify-center mb-2">
              <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
              Account Pending Approval
            </h1>
            <p className="text-orange-100 text-sm sm:text-base">
              Your gym registration has been successfully submitted
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-4
                          scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black
                          scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {/* What happens next */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 sm:p-4 shadow-inner">
              <div className="flex items-start gap-2 sm:gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-white font-semibold text-sm sm:text-base mb-1">
                    What happens next?
                  </h2>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Our super admin team is reviewing your gym registration. You will receive an email
                    notification within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Status timeline */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 sm:gap-6">
              
              {/* Submitted */}
              <div className="flex gap-3 md:flex-col md:items-center md:text-center md:flex-1">
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 rounded-full p-2 shadow-md">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-700 mt-1 md:w-full md:h-0.5 md:mt-0 md:ml-1" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                    Registration Submitted
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Your gym information has been successfully received
                  </p>
                </div>
              </div>

              {/* Under review */}
              <div className="flex gap-3 md:flex-col md:items-center md:text-center md:flex-1">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 rounded-full p-2 animate-pulse shadow-md">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-700 mt-1 md:w-full md:h-0.5 md:mt-0 md:ml-1" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                    Under Review
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Super admin is verifying your details (within 24 hours)
                  </p>
                </div>
              </div>

              {/* Email Notification */}
              <div className="flex gap-3 md:flex-col md:items-center md:text-center md:flex-1">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-800 rounded-full p-2 shadow-inner">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 font-semibold text-xs sm:text-sm mb-1">
                    Email Notification
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    You will receive approval or feedback via email
                  </p>
                </div>
              </div>
            </div>

            {/* Outcome cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 sm:p-4 shadow-inner">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <h3 className="text-white font-semibold text-xs sm:text-sm">If Approved</h3>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  You'll get instant access to your gym dashboard with all management features
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 shadow-inner">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <h3 className="text-white font-semibold text-xs sm:text-sm">If Rejected</h3>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  You'll receive detailed feedback and can resubmit with corrections
                </p>
              </div>
            </div>

            {/* Email check info */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 sm:p-4 shadow-inner">
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Check Your Email</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">
                    Make sure to check your inbox (and spam folder). All updates will be sent via email.
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 text-xs text-gray-500">
                    <span className="bg-gray-800 px-2 py-0.5 rounded-full">Review time: 24 hours</span>
                    <span className="bg-gray-800 px-2 py-0.5 rounded-full">Email updates included</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-gray-900 border-t border-gray-800 p-3 sm:p-4 text-center shadow-inner flex-shrink-0">
            <p className="text-gray-400 text-xs sm:text-sm mb-1">
              Need immediate assistance? Contact our support team
            </p>
            <a
              href="mailto:support@fitpro.com"
              className="inline-flex items-center gap-1 sm:gap-2 text-orange-500 hover:text-orange-400 text-xs sm:text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              support@fitpro.com
            </a>
          </div>

        </div>

        <div className="mt-2 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            This is an automated review process. Thank you for your patience.
          </p>
        </div>
      </div>
    </div>
  );
}
