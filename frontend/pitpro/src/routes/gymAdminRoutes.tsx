import { Route,Routes } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import GymAdminLoginPage from "@/page/gymAdmin/gymAdminLoginPage";
import GymRegistrationForm from "@/components/gymAdmin/multiForm/gymRegistrationForm";
import GymAdminDashboard from "@/page/gymAdmin/GymAdminDashboard";
import ProtectedLogin from "@/components/shared/protectedComponets/ProtectedSuperAdminLogin";
import MembersPage from "@/page/gymAdmin/GymadminMemberListPage";
import EmployeesPage from "@/page/gymAdmin/gymAdminEmpoyeesPage";

const GymAdminRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedLogin/>}>
                <Route path={FRONTEND_ROUTES.GYM_ADMIN.LOGIN} element={<GymAdminLoginPage/>}/>
            </Route>
            <Route path={FRONTEND_ROUTES.GYM_ADMIN.SIGNUP} element={<GymRegistrationForm/>}/>
            <Route path={FRONTEND_ROUTES.GYM_ADMIN.DASHBOARD} element={<GymAdminDashboard/>}/>
            <Route path={FRONTEND_ROUTES.GYM_ADMIN.LIST_MEMBERS} element ={<MembersPage/>}/>
            <Route path={FRONTEND_ROUTES.GYM_ADMIN.LIST_EMPLOYEES} element = {<EmployeesPage/>}/>
        </Routes>
    )
}
export default GymAdminRoutes;