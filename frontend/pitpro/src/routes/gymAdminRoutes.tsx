import { Route,Routes } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import GymAdminLoginPage from "@/page/gymAdmin/gymAdminLoginPage";
import GymRegistrationForm from "@/components/gymAdmin/multiForm/gymRegistrationForm";
import GymAdminDashboard from "@/page/gymAdmin/GymAdminDashboard";
import MembersPage from "@/page/gymAdmin/GymadminMemberListPage";
import EmployeesPage from "@/page/gymAdmin/gymAdminEmpoyeesPage";
import PublicRoute from "@/components/shared/protectedComponets/PublicRoute";
import ProtectedRoute from "@/components/shared/protectedComponets/protectedRoute";

const GymAdminRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoute redirectTo={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD}`}/>}>
                <Route path={FRONTEND_ROUTES.GYM_ADMIN.LOGIN} element={<GymAdminLoginPage/>}/>
            </Route>
            <Route element={<ProtectedRoute redirectTo={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`}/>}>
               <Route path={FRONTEND_ROUTES.GYM_ADMIN.SIGNUP} element={<GymRegistrationForm/>}/>
               <Route path={FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD} element={<GymAdminDashboard/>}/>
               <Route path={FRONTEND_ROUTES.GYM_ADMIN.LIST_MEMBERS} element ={<MembersPage/>}/>
               <Route path={FRONTEND_ROUTES.GYM_ADMIN.LIST_EMPLOYEES} element = {<EmployeesPage/>}/>
            </Route>
        </Routes>
    )
}
export default GymAdminRoutes;