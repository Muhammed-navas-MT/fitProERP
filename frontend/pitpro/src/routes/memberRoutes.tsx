import ProtectedRoute from "@/components/shared/protectedComponets/protectedRoute";
import PublicRoute from "@/components/shared/protectedComponets/PublicRoute";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import MemberDashboard from "@/page/member/dashboardPage";
import MemberLoginPage from "@/page/member/memberLoginPage";
import MemberProfilePage from "@/page/member/memberProfilePage";
import { Route, Routes } from "react-router-dom";

const MemberRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PublicRoute
            redirectTo={`${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.DASHBOARD}`}
          />
        }
      >
        <Route
          path={FRONTEND_ROUTES.MEMBER.LOGIN}
          element={<MemberLoginPage />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute
            redirectTo={`${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.LOGIN}`}
          />
        }
      >
        <Route
          path={FRONTEND_ROUTES.MEMBER.PROFILE}
          element={<MemberProfilePage />}
        />
        <Route
        path={FRONTEND_ROUTES.MEMBER.DASHBOARD}
        element={<MemberDashboard/>}
        />

      </Route>
    </Routes>
  );
};

export default MemberRoutes;

