import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { rootstate } from "@/store/store";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";

const SubscriptionAccessRoute = () => {
  const gymAdmin = useSelector((state: rootstate) => state.gymAdminData);

  if (!gymAdmin) return null;
  if (gymAdmin.status === "ACTIVE") {
    return (
      <Navigate
        to={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default SubscriptionAccessRoute;
