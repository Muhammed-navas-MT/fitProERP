import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { MembersPage } from "@/page/trainer/memberListPage";
import TrainerDashboardPage from "@/page/trainer/trainerDashboardPage";
import TrainerLoginPage from "@/page/trainer/trainerLoginPage";
import { Route, Routes } from "react-router-dom";

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route path={FRONTEND_ROUTES.TRAINER.LOGIN} element={<TrainerLoginPage />}/>
      <Route path={FRONTEND_ROUTES.TRAINER.DASHBOARD} element={<TrainerDashboardPage/>}/>
      <Route path={FRONTEND_ROUTES.TRAINER.LIST_MEMBERS} element={<MembersPage/>}/>
    </Routes>
  );
};
export default TrainerRoutes;
