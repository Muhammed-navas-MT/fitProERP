import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { rootstate } from "@/store/store";

interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const token = useSelector((state: rootstate) => state.token.token);

  if (!token) {
    return <Navigate to={`${redirectTo}`} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
