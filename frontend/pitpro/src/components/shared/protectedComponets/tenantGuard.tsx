import { Navigate, Outlet } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";

interface TenantGuardProps {
  requireSubdomain: boolean;
}

const TenantGuard = ({ requireSubdomain }: TenantGuardProps) => {
  const hostname = window.location.hostname;

  const isRoot =
    hostname === "fitproerp.services" || hostname === "localhost" || hostname === "127.0.0.1";

  if (requireSubdomain && isRoot) {
    return <Navigate to={FRONTEND_ROUTES.NOT_FOUND} replace />;
  }

  if (!requireSubdomain && !isRoot) {
    return <Navigate to={FRONTEND_ROUTES.NOT_FOUND} replace />;
  }

  return <Outlet />;
};

export default TenantGuard;