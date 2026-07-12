import {useMutation} from '@tanstack/react-query';
import type { LoginPayload } from '@/types/authPayload';
import { gymAdminLogin } from '@/services/gymAdmin/gymAdminLoginService';
 
export const useGymAdminLogin =()=>{
    console.log("login hook")
    return useMutation({
        mutationFn:(data:LoginPayload) => gymAdminLogin(data),
    });
};