import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import MemberLoginPage from "@/page/member/memberLoginPage";
import { Route, Routes } from "react-router-dom";

const MemeberRoutes = () => {
  return (
    <Routes>
        <Route path={FRONTEND_ROUTES.MEMBER.LOGIN} element={<MemberLoginPage/>}/>
    </Routes>
  );
};

export default MemeberRoutes;
