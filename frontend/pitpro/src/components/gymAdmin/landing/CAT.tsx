import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CTA() {
  const navigate = useNavigate();

  const goToSubscription = ()=>{
    navigate(FRONTEND_ROUTES.SUBSCRPIPTION);
  }

  const goToRegistration = ()=>{
    navigate(FRONTEND_ROUTES.GYM_ADMIN.SIGNUP);
  }

  return (
    <section className="bg-black px-6 py-20 text-center sm:px-12 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">Ready to Transform Your Gym?</h2>
        <p className="mb-8 text-base text-gray-400 sm:text-lg">
          Join thousands of gym owners who have revolutionized their business with our platform.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button  onClick={()=>goToSubscription()} className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
            Get Started Today
            <ArrowRight className="h-4 w-4" />
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
