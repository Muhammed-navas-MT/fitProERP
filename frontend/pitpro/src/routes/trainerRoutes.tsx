import ProtectedRoute from "@/components/shared/protectedComponets/protectedRoute";
import PublicRoute from "@/components/shared/protectedComponets/PublicRoute";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import TrainerChatPage from "@/page/trainer/chatTrainerPage";
import DashboardPage from "@/page/trainer/dashboardPage";
import TrainerForgetPasswordPage from "@/page/trainer/forgetPasswordPage";
import LeavesPage from "@/page/trainer/leavePage";
import MemberDetailPage from "@/page/trainer/memberDetailPage";
import { MembersPage } from "@/page/trainer/memberListPage";
import TrainerLoginPage from "@/page/trainer/trainerLoginPage";
import ProfilePage from "@/page/trainer/trainerProfilePage";
import TrainerSchedulePage from "@/page/trainer/trainerSchedulePage";
import { Route, Routes } from "react-router-dom";

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route
        path={FRONTEND_ROUTES.TRAINER.FORGET_PASSWORD}
        element={<TrainerForgetPasswordPage />}
      />
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
          element={<DashboardPage />}
        />
        <Route
          path={FRONTEND_ROUTES.TRAINER.LIST_MEMBERS}
          element={<MembersPage />}
        />
        <Route
          path={FRONTEND_ROUTES.TRAINER.PROFILE}
          element={<ProfilePage />}
        />
        <Route
          path={`${FRONTEND_ROUTES.TRAINER.DETAIL_MEMBER}/:memberId`}
          element={<MemberDetailPage />}
        />
        <Route path={FRONTEND_ROUTES.TRAINER.LEAVE} element={<LeavesPage />} />
        <Route
          path={FRONTEND_ROUTES.TRAINER.SESSION}
          element={<TrainerSchedulePage />}
        />
        <Route
          path={FRONTEND_ROUTES.TRAINER.CHAT}
          element={<TrainerChatPage />}
        />
      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
