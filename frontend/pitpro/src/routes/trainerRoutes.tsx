import ProtectedRoute from "@/components/shared/protectedComponets/protectedRoute";
import PublicRoute from "@/components/shared/protectedComponets/PublicRoute";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import DashboardPage from "@/page/trainer/dashboardPage";
import { MembersPage } from "@/page/trainer/memberListPage";
import TrainerLoginPage from "@/page/trainer/trainerLoginPage";
import { Route, Routes } from "react-router-dom";

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PublicRoute
            redirectTo={`${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.DASHBOARD}`}
          />
        }
      >
        <Route
          path={FRONTEND_ROUTES.TRAINER.LOGIN}
          element={<TrainerLoginPage />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute
            redirectTo={`${FRONTEND_ROUTES.TRAINER.BASE}/${FRONTEND_ROUTES.TRAINER.LOGIN}`}
          />
        }
      >
        <Route
          path={FRONTEND_ROUTES.TRAINER.DASHBOARD}
          element={<DashboardPage/>}
        />
        <Route
          path={FRONTEND_ROUTES.TRAINER.LIST_MEMBERS}
          element={<MembersPage />}
        />

      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
