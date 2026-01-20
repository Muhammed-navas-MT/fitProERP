import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { rootstate } from "@/store/store";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";

const PackageAccessRoute = () => {
  const member = useSelector((state: rootstate) => state.authData);

  if (!member) return null;
  if (member.status === "ACTIVE") {
    return (
      <Navigate
        to={`${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.DASHBOARD}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PackageAccessRoute;
