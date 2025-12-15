import { SignInForm } from "@/components/shared/loginForm";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useGymAdminLogin } from "@/hook/gymAdmin/gymAdminLoginHook";
import { setAuthContext } from "@/store/slice/authContextState";
import { setGymAdminData } from "@/store/slice/gymAdminSlice";
import { LoginPayload } from "@/types/authPayload";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function GymAdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: login, isPending } = useGymAdminLogin();

  const handleLogin = (data:LoginPayload) => {
    login(data,{
        onSuccess:(res)=>{
            toast.success(res.data.message||"Login successfully");
            dispatch(setGymAdminData(res.data.data))
            console.log(res.data.data.subdomain,"from gym admin login page...")
            dispatch(setAuthContext({role:"GYMADMIN",subdomain:res.data.data.subdomain}));
            navigate(`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}`);
        },
        onError:(err)=>{
            toast.error(err.message||"please try again");
        }
    });
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111418] p-8 rounded-xl shadow-lg border border-[#2A2D31]">
        <h2 className="text-3xl font-bold text-center text-orange-500">
          GYM ADMIN LOGIN
        </h2>
        <p className="text-center text-gray-400 mt-1">
          Sign in to manage your gym
        </p>
        <div className="mt-8">
          <SignInForm
            role="GYMADMIN"
            buttonColor="bg-orange-600 hover:bg-orange-700"
            isLoading={isPending}
            onSubmit={handleLogin}
            signUpLink={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.SIGNUP}`}
          />
        </div>
      </div>
    </div>
  );
}
