import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDuration } from "@/utils/formatDuration"
import { Durations } from "@/types/durationType"
import { usePurchaseSubscription } from "@/hook/gymAdmin/purchaseSubscriptionHook"
import { PaymentMethod } from "@/types/paymentMethod"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes"
import { useDispatch, useSelector } from "react-redux"
import { setGymAdminData } from "@/store/slice/gymAdminSlice"
import { rootstate } from "@/store/store"

interface PricingCardProps {
  planName: string
  price: number
  duration: Durations
  features: string[]
  id: string
}

export function PricingCard({
  planName,
  price,
  duration,
  features,
  id,
}: PricingCardProps) {

  const { mutate, isPending } = usePurchaseSubscription();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const gymAdmin = useSelector((state:rootstate)=>state.gymAdminData);

  const handleGetStarted = () => {
  mutate(
    {
      packageId: id,
      amount: price,
      paymentMethod: PaymentMethod.CASH,
    },
    {
      onSuccess: (data) => {
        console.log("Payment success", data)
        toast.success("Payment completed successfully")
        dispatch(setGymAdminData({...gymAdmin,status:"ACTIVE"}))
        navigate(`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}`)
      },
      onError: (error) => {
        console.error(error)
        toast.error(error.message || "Payment failed")
      },
    }
  )
}


  return (
    <div className="relative">
      <Card
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300 md:p-6 bg-neutral-900",
          "border-orange-300 shadow-2xl",
        )}
      >
        <div className="mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-orange-500">
          <Star className="h-5 w-5 md:h-6 md:w-6 text-neutral-950" />
        </div>

        <h3 className="mb-1.5 text-xl font-bold text-neutral-50 md:text-2xl">
          {planName}
        </h3>

        <div className="mb-4 md:mb-6">
          <div className="flex items-baseline">
            <span className="text-sm text-neutral-400">₹</span>
            <span className="text-3xl font-bold text-orange-500 md:text-4xl">
              {price}
            </span>
            <span className="ml-1 text-sm text-neutral-400 md:text-base">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        <ul className="mb-4 md:mb-6 flex-1 space-y-2 md:space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500/20">
                <Check className="h-3 w-3 text-orange-500" />
              </div>
              <span className="text-xs text-neutral-50 md:text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleGetStarted}
          disabled={isPending}
          className={cn(
            "w-full rounded-full py-4 md:py-5 text-sm font-semibold transition-all duration-200 md:text-base",
            "bg-orange-500/80 text-neutral-950 hover:bg-orange-500",
          )}
        >
          {isPending ? "Processing..." : "Get Started"}
        </Button>
      </Card>
    </div>
  )
}
