import {useMutation} from '@tanstack/react-query';
import type { LoginPayload } from '@/types/authPayload';
import { gymAdminLogin } from '@/services/gymAdmin/gymAdminLoginService';
 
export const useGymAdminLogin =()=>{
    return useMutation({
        mutationFn:(data:LoginPayload) => gymAdminLogin(data),
    });
};