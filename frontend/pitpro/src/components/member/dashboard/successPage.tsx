import { updateData } from "@/store/slice/authSlice";
import { rootstate } from "@/store/store";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

const MemberSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector((state:rootstate)=>state.authData);
  const sessionId = searchParams.get("session_id");

  useEffect(()=>{
    dispatch(updateData({...member,status:"ACTIVE"}));
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        
        <CheckCircle className="mx-auto text-green-500 w-16 h-16" />

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="mt-2 text-gray-600 text-sm">
          Your Package has been activated successfully.
        </p>

        {sessionId && (
          <p className="mt-3 text-xs text-gray-400 break-all">
            Session ID: {sessionId}
          </p>
        )}

        <button
          onClick={() => navigate("/member/dashboard")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MemberSuccess;
