import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { rootstate } from "@/store/store";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { toast } from "react-hot-toast";

const GymAdminStatusRoute = () => {
  const gymAdmin = useSelector((state: rootstate) => state.gymAdminData);

  if (!gymAdmin) return null;

  if (gymAdmin.status === "BLOCKED" || gymAdmin.status === "REJECTED") {
    toast.error("Your account is blocked or rejected. Please contact support.");
    return (
      <Navigate
        to={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`}
        replace
      />
    );
  }

  if (gymAdmin.status === "PENDING") {
    toast.error("Your account will verify in 24 hours");
    return (
      <Navigate
        to={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.PENDINGAPPROVAL}`}
        replace
      />
    );
  }

  if (gymAdmin.status === "IN_ACTIVE") {
    return (
      <Navigate
        to={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.LIST_SUBSCRIPTION}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default GymAdminStatusRoute;
