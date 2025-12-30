import { Route,Routes } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import PricingPage from "@/page/gymAdmin/pricingPage";
import Home from "@/page/gymAdmin/langdingPage";
import SuperAdminLoginPage from "@/page/superAdmin/SuperAdminLoginPage";
import SuperAdminDashboard from "@/page/superAdmin/superAdminDashboard";
import SubscriptionPage from "@/page/superAdmin/SupscriptionPage";
import AddSubscriptionPage from "@/page/superAdmin/AddSubscriptionPage";
import EditSubscriptionPage from "@/page/superAdmin/EditSubscriptionPage";
import GymsPage from "@/page/superAdmin/gymsPage";
import GymDetailPage from "@/page/superAdmin/gymDetailPage";
import PublicRoute from "@/components/shared/protectedComponets/PublicRoute";
import ProtectedRoute from "@/components/shared/protectedComponets/protectedRoute";

const SuperAdminRoutes = () => {
    return (
        <Routes>
            <Route element ={<PublicRoute redirectTo={`${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD}`}/>}>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.LOGIN} element={<SuperAdminLoginPage/>}/>
            </Route>
            <Route element = {<ProtectedRoute redirectTo={`${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.LOGIN}`}/>}>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD} element={<SuperAdminDashboard/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION} element={<SubscriptionPage/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.ADD_SUBSCRIPTION} element={<AddSubscriptionPage/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.EDIT_SUBSCRIPTION} element={<EditSubscriptionPage/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.LIST_GYMS} element={<GymsPage/>}/>
                <Route path={FRONTEND_ROUTES.SUPER_ADMIN.GYM_DETAIL} element={<GymDetailPage/>}/>
            </Route>
            <Route path={FRONTEND_ROUTES.LANDING} element={<Home/>}/>
            <Route path={FRONTEND_ROUTES.SUBSCRPIPTION} element={<PricingPage/>}/>
        </Routes>
    )
}
export default SuperAdminRoutes;