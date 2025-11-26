import {BrowserRouter,Route,Routes} from "react-router-dom";
import SuperAdminRoutes from "./routes/superAdminRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
   <>
   <Toaster/>
   <BrowserRouter>
    <Routes>
      <Route path="/*" element={<SuperAdminRoutes/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
