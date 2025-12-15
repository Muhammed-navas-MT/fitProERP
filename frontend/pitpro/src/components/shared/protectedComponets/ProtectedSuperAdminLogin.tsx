import { FRONTEND_ROUTES } from '@/constants/frontendRoutes';
import { rootstate } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedSuperAdminLogin:React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector((state:rootstate)=>state.token.token);
    
    const [isCheckig,setIsChecking] = useState(true);

    useEffect(()=>{
      const timeout = setTimeout(()=>{
        if(accessToken){
          navigate(FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD)
        }
        setIsChecking(false);
      },100);

      return ()=>clearTimeout(timeout);
    },[accessToken]);

    if(isCheckig) return null;
    return  !accessToken ? <Outlet/> : null;
}

export default ProtectedSuperAdminLogin
