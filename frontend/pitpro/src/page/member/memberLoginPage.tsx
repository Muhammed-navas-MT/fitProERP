import { SignInForm } from "@/components/shared/loginForm"
import { useMemberLogin } from "@/hook/member/memberLoginHook";
import { setAuthContext } from "@/store/slice/authContextState";
import { setData } from "@/store/slice/authSlice";
import { setToken } from "@/store/slice/tokenSlice";
import type { LoginSchemaType } from "@/validation/loginShema"
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function MemberLoginPage() {

  const {mutate:login,isPending} = useMemberLogin();
  const dispatch = useDispatch()

  const handleLogin = (data: LoginSchemaType) => {
    login(data,{
      onSuccess:(res)=>{
        console.log(res.data.accessToken)
        dispatch(setData(res.data.data))
        dispatch(setToken(res.data.accessToken))
        dispatch(setAuthContext({role:res.data.data.role,subdomain:res.data.data.subdomain}))
        toast.success(res.data.message || "Login successfully")
      },
      onError:(err)=>{
        toast.error(err.message||"Error While login. Please try agian.!")
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        <div className="bg-orange-600 p-12 flex flex-col justify-center text-white">
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Sign in to track your fitness journey and stay consistent with your goals.
              </p>
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-white flex-shrink-0" />
                <p className="text-lg font-medium">Attendance Tracking</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-white flex-shrink-0" />
                <p className="text-lg font-medium">Package Purchase & Subscription Details</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-white flex-shrink-0" />
                <p className="text-lg font-medium">Workout Plan Access</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-white flex-shrink-0" />
                <p className="text-lg font-medium">Diet & Nutrition Plans</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-white flex-shrink-0" />
                <p className="text-lg font-medium">Progress Tracking (Weight, Strength, BMI)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#000000] p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Sign in</h2>
            </div>

            <SignInForm
              role="MEMBER"
              buttonColor="bg-orange-600  hover:bg-orange-800 text-white font-semibold"
              isLoading={isPending}
              onSubmit={handleLogin}
              signUpLink="/signup"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
