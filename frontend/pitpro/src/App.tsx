import {BrowserRouter,Route,Routes} from "react-router-dom";
import SuperAdminRoutes from "./routes/superAdminRoutes";
import { Toaster } from "sonner";
import { FRONTEND_ROUTES } from "./constants/frontendRoutes";
import GymAdminRoutes from "./routes/gymAdminRoutes";
import TrainerRoutes from "./routes/trainerRoutes";
import Home from "./page/gymAdmin/langdingPage";
import PricingPage from "./page/gymAdmin/pricingPage";
import GymRegistrationForm from "./components/gymAdmin/multiForm/gymRegistrationForm";

const App = () => {
  return (
   <>
   <Toaster position="top-right" />
   <BrowserRouter>
    <Routes>
      <Route path={`${FRONTEND_ROUTES.TRAINER.BASE}/*`} element={<TrainerRoutes/>}/>
      <Route path={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/*`} element={<GymAdminRoutes/>}/>
      <Route path={`${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/*`} element={<SuperAdminRoutes/>}/>
      <Route path={FRONTEND_ROUTES.LANDING} element={<Home/>}/>
      <Route path={FRONTEND_ROUTES.SUBSCRPIPTION} element={<PricingPage/>}/>
      <Route path={FRONTEND_ROUTES.GYM_ADMIN.SIGNUP} element={<GymRegistrationForm/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
