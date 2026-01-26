import { Route, Routes } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import GymAdminLoginPage from "@/page/gymAdmin/gymAdminLoginPage";
import GymAdminDashboard from "@/page/gymAdmin/GymAdminDashboard";
import EmployeesPage from "@/page/gymAdmin/gymAdminEmpoyeesPage";
import PublicRoute from "@/components/shared/protectedComponets/PublicRoute";
import ProtectedRoute from "@/components/shared/protectedComponets/protectedRoute";
import SubscriptionListPage from "@/page/gymAdmin/SubscriptionListPag";
import GymAdminStatusRoute from "@/components/shared/protectedComponets/gymAdminStatusRoute";
import SubscriptionAccessRoute from "@/components/shared/protectedComponets/subscriptionAccessRoute";
import BranchesPage from "@/page/gymAdmin/BranchListPage";
import PendingApprovalPage from "@/components/gymAdmin/PendingApprovalPage";
import EmployeeDetailsPage from "@/page/gymAdmin/trainerDetailPage";
import MemeberListPage from "@/page/gymAdmin/memberListPage";
import MemberDetailPage from "@/page/gymAdmin/memberDetailpage";
import GymInfoPage from "@/page/gymAdmin/gymProfileInfoPage";
import PackagePage from "@/page/gymAdmin/packageListPage";
import Success from "@/components/shared/stripeSucess";
import Cancel from "@/components/shared/stripeCalncel";
import SubscriptionPage from "@/page/gymAdmin/subscriptionPage";

const GymAdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PublicRoute
            redirectTo={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}`}
          />
        }
      >
        <Route
          path={FRONTEND_ROUTES.GYM_ADMIN.LOGIN}
          element={<GymAdminLoginPage />}
        />
        <Route path={FRONTEND_ROUTES.GYM_ADMIN.PENDINGAPPROVAL} element={<PendingApprovalPage/>}/>
      </Route>

      <Route element={<SubscriptionAccessRoute />}>
        <Route
          path={FRONTEND_ROUTES.GYM_ADMIN.LIST_SUBSCRIPTION}
          element={<SubscriptionListPage />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute
            redirectTo={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`}
          />
        }
      >
        <Route path={FRONTEND_ROUTES.GYM_ADMIN.SUCCESS} element={<Success/>}/>
        <Route path={FRONTEND_ROUTES.GYM_ADMIN.CANCEL} element={<Cancel/>}/>
        
        <Route element={<GymAdminStatusRoute />}>
          <Route
            path={FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}
            element={<GymAdminDashboard />}
          />
          <Route
            path={FRONTEND_ROUTES.GYM_ADMIN.LIST_MEMBERS}
            element={<MemeberListPage />}
          />
          <Route
           path={`${FRONTEND_ROUTES.GYM_ADMIN.DETAIL_MEMBER}/:memberId`}
           element={<MemberDetailPage/>}
          />
          <Route
            path={FRONTEND_ROUTES.GYM_ADMIN.LIST_EMPLOYEES}
            element={<EmployeesPage />}
          />
          <Route path={`${FRONTEND_ROUTES.GYM_ADMIN.DETAIL_EMPLOYEES}/:id`}
          element={<EmployeeDetailsPage/>}
          />
          <Route path={FRONTEND_ROUTES.GYM_ADMIN.LIST_BRANCH}
           element={<BranchesPage/>}
           />
           <Route path={FRONTEND_ROUTES.GYM_ADMIN.GYM_INFO}
           element={<GymInfoPage/>}
           />
           <Route path={FRONTEND_ROUTES.GYM_ADMIN.LIST_PACKAGE}
           element={<PackagePage/>}
           />
           <Route path={FRONTEND_ROUTES.GYM_ADMIN.SUBSCRIPTION}
           element={<SubscriptionPage/>}
           />
        </Route>
      </Route>
    </Routes>
  );
};

export default GymAdminRoutes;
