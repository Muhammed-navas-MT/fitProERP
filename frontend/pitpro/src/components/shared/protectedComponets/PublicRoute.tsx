import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { rootstate } from "@/store/store";
 
interface PublicRouteProps {
  redirectTo: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectTo }) => {
  const token = useSelector((state: rootstate) => state.token.token);

  if (token) {
    return <Navigate to={`${redirectTo}`} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
