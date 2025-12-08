import {BrowserRouter,Route,Routes} from "react-router-dom";
import SuperAdminRoutes from "./routes/superAdminRoutes";
import { Toaster } from "sonner";

const App = () => {
  return (
   <>
   <Toaster position="top-right" />
   <BrowserRouter>
    <Routes>
      <Route path="/*" element={<SuperAdminRoutes/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
