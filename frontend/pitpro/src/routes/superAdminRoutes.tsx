import { Route,Routes } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import PricingPage from "@/page/gymAdmin/pricingPage";
import Home from "@/page/gymAdmin/langdingPage";
import GymRegistrationForm from "@/components/gymAdmin/multiForm/gymRegistrationForm";
import SuperAdminLoginPage from "@/page/superAdmin/SuperAdminLoginPage";
import SuperAdminDashboard from "@/page/superAdmin/superAdminDashboard";
import ProtectedSuperAdminLogin from "@/components/protectedComponets/ProtectedSuperAdminLogin";
import ProtectedSuperAdminRoute from "@/components/protectedComponets/ProtectedSuperAdminRoute";
import SubscriptionPage from "@/page/superAdmin/SupscriptionPage";
import AddSubscriptionPage from "@/page/superAdmin/AddSubscriptionPage";
import EditSubscriptionPage from "@/page/superAdmin/EditSubscriptionPage";

const SuperAdminRoutes = () => {
    return (
        <Routes>
            <Route element ={<ProtectedSuperAdminLogin/>}>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.LOGIN} element={<SuperAdminLoginPage/>}/>
            </Route>
            <Route element = {<ProtectedSuperAdminRoute/>}>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD} element={<SuperAdminDashboard/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION} element={<SubscriptionPage/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.ADD_SUBSCRIPTION} element={<AddSubscriptionPage/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.EDIT_SUBSCRIPTION} element={<EditSubscriptionPage/>}/>
            </Route>
            <Route path={FRONTEND_ROUTES.LANDING} element={<Home/>}/>
            <Route path={FRONTEND_ROUTES.SUBSCRPIPTION} element={<PricingPage/>}/>
            <Route path={FRONTEND_ROUTES.GYM_ADMIN.SIGNUP} element={<GymRegistrationForm/>}/>
        </Routes>
    )
}
export default SuperAdminRoutes;