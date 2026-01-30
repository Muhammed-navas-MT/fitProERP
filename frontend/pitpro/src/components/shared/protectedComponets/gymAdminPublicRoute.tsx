import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { rootstate } from "@/store/store";

interface GymAdminPublicRouteProps {
  redirectTo: string;
}

const GymAdminPublicRoute: React.FC<GymAdminPublicRouteProps> = ({ redirectTo }) => {
  const token = useSelector((state: rootstate) => state.token.token);
  const gymAdmin = useSelector((state: rootstate) => state.gymAdminData);

  const isActive = gymAdmin?.status === "ACTIVE";

  if (token && isActive) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default GymAdminPublicRoute;
