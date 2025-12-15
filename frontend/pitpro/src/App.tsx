import {BrowserRouter,Route,Routes} from "react-router-dom";
import SuperAdminRoutes from "./routes/superAdminRoutes";
import { Toaster } from "sonner";
import { FRONTEND_ROUTES } from "./constants/frontendRoutes";
import GymAdminRoutes from "./routes/gymAdminRoutes";
import TrainerRoutes from "./routes/trainerRoutes";

const App = () => {
  return (
   <>
   <Toaster position="top-right" />
   <BrowserRouter>
    <Routes>
      <Route path={`${FRONTEND_ROUTES.TRAINER.BASE}/*`} element={<TrainerRoutes/>}/>
      <Route path={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/*`} element={<GymAdminRoutes/>}/>
      <Route path="/*" element={<SuperAdminRoutes/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
