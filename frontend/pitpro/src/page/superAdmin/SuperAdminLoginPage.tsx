import { SignInForm } from "@/components/shared/loginForm"
import { useSuperAdminLogin } from "@/hook/superAdmin/superAdminLoginHook";
import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import {toast} from "sonner"
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slice/tokenSlice";
import { setSuperAdminData } from "@/store/slice/superAdminSlice";

export default function SuperAdminLoginPage() {
    const { mutate, isPending} = useSuperAdminLogin();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (data:{email:string,password:string}) =>{
        mutate(
            {email:data.email,password:data.password},
            {onSuccess:(res)=>{
              dispatch(setToken(res.data.accessToken));
              dispatch(setSuperAdminData(res.data.data));
              toast.success("Login successfully");
              navigate(FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD);
            },
            onError:(err)=>{
                toast.error(err.message);
            }
        }
        )
    }
  return (
    <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#4C75FF] to-[#00a1db] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏋️</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to FitPro ERP
          </h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>
        
        <div className="bg-[#111418] border border-[#2A2D31] rounded-xl p-8 shadow-2xl">
          <p className="text-gray-400 text-center text-sm mb-6">
            Enter your credentials to access your account
          </p>

          <SignInForm
            role="SUPERADMIN"
            onSubmit={handleLogin}
            signUpLink="/fitpro/sign-up" 
            isLoading = {isPending}
            buttonColor="w-full bg-gradient-to-r from-[#4C75FF] to-[#00a1db] hover:from-[#3a5ce6] hover:to-[#0088b8] text-white font-semibold shadow-lg" 
          />
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} FitPro ERP. All rights reserved.
        </p>
      </div>
    </div>
  )
}