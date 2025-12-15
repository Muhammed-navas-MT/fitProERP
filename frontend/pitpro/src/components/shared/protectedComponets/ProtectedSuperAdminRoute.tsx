import { FRONTEND_ROUTES } from '@/constants/frontendRoutes';
import { rootstate } from '@/store/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedSuperAdminRoute = () => {
    const accessToken = useSelector((state:rootstate)=>state.token.token);
    const navigate = useNavigate();

    const [isCheckig,setIsChecking] = useState(true);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(!accessToken){
                navigate(FRONTEND_ROUTES.SUPER_ADMIN.LOGIN);
            };
            setIsChecking(false);
        },100);
        return ()=>clearTimeout(timeout);
    },[accessToken]);

    if(isCheckig) return null;
    return accessToken ? <Outlet/> : null;
}

export default ProtectedSuperAdminRoute
