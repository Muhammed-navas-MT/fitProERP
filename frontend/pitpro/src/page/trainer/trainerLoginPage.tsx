import { SignInForm } from "@/components/shared/loginForm";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useTrainerLogin } from "@/hook/trainer/trainerLoginHook";
import { setAuthContext } from "@/store/slice/authContextState";
import { setToken } from "@/store/slice/tokenSlice";
import { setTrainerData } from "@/store/slice/trainerSlice";
import { LoginPayload } from "@/types/authPayload";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function TrainerLoginPage() {
  const {mutate:login,isPending} = useTrainerLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginPayload) => {
    login(data,{
        onSuccess:(res)=>{
            toast.success(res?.data?.message|| "Login successfully");
            dispatch(setTrainerData(res.data.data));
            dispatch(setAuthContext({role:res.data.data.role,subdomain:res.data.data.subdomain}));
            dispatch(setToken(res.data.accessToken))
            navigate(`${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.DASHBOARD}`);
        },
        onError:(err)=>{
            console.log(err)
            toast.error(err.message||"error while login...");
        }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0F14] px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[#2A2D31]">
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#6B3FA0] via-[#4A1E73] to-[#2A0B45] text-white relative">
          <div className="absolute inset-0 bg-purple-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-4xl font-bold leading-tight mb-4">
              Trainer Portal
            </h3>
            <p className="text-white/80 max-w-sm mb-10">
              Sign in to manage your clients, schedules, and daily training
              sessions with ease.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Client Management
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Workout Scheduling
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Attendance Tracking
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Performance Monitoring
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#111418] p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Trainer Sign In
          </h2>
          <p className="text-sm text-gray-400 mb-8">
            Access your trainer dashboard
          </p>

          <SignInForm
            role="TRAINER"
            buttonColor="bg-[#5B2D8B] hover:bg-[#4A1E73]"
            isLoading={isPending}
            onSubmit={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}
