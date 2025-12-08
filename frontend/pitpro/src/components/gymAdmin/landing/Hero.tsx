import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

    const goToSubscription = () => {
    navigate(FRONTEND_ROUTES.SUBSCRPIPTION);
  };

  const goToRegistration = ()=>{
    navigate(FRONTEND_ROUTES.GYM_ADMIN.SIGNUP);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-600 to-orange-900 px-6 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">POWER YOUR GYM WITH</h1>
        <h2 className="mb-6 text-2xl font-bold text-orange-300 sm:text-3xl">SMART ERP SOLUTIONS</h2>
        <p className="mb-8 text-base text-gray-100 sm:text-lg">
          Transform your fitness business with our comprehensive gym management platform. Streamline operations, boost
          member satisfaction, and accelerate growth.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button onClick={goToSubscription} className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600 transition-colors">
            Get Started Today
          </button>
          <button onClick={()=>goToRegistration()} className="rounded-lg border-2 border-orange-500 px-8 py-3 font-semibold text-orange-500 hover:bg-orange-500/10 bg-transparent transition-colors flex items-center justify-center gap-2">
            Register Your Gym
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
