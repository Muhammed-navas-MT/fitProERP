import { Route,Routes } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import PricingPage from "@/page/gymAdmin/pricingPage";
import Home from "@/page/gymAdmin/langdingPage";
import GymRegistrationForm from "@/components/gymAdmin/multiForm/gymRegistrationForm";

const SuperAdminRoutes = () => {
    return (
        <Routes>
            <Route path={FRONTEND_ROUTES.LANDING} element={<Home/>}/>
            <Route path={FRONTEND_ROUTES.SUBSCRPIPTION} element={<PricingPage/>}/>
            <Route path={FRONTEND_ROUTES.GYM_ADMIN.SIGNUP} element={<GymRegistrationForm/>}/>
        </Routes>
    )
}
export default SuperAdminRoutes;