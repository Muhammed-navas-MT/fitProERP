import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { rootstate } from "@/store/store";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { toast } from "sonner";

const MemberStatusRoute = () => {
  const member = useSelector((state: rootstate) => state.authData);

  if (!member) return null;

  if (member.status === "BLOCKED") {
    toast.error("Your account is blocked. Please contact support.");
    return (
      <Navigate
        to={`${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.LOGIN}`}
        replace
      />
    );
  }

  if (member.status === "IN_ACTIVE") {
    return (
      <Navigate
        to={`${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.PACKAGELIST}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default MemberStatusRoute;
