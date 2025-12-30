import axios from "axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { setToken, deleteToken } from "@/store/slice/tokenSlice";
import { store } from "@/store/store";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { clearAuthContext } from "@/store/slice/authContextState";
import { clearSuperAdminData } from "@/store/slice/superAdminSlice";
import { clearGymAdminData } from "@/store/slice/gymAdminSlice";
import { clearTrainerData } from "@/store/slice/trainerSlice";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

AxiosInstance.interceptors.request.use((config) => {
    const accessToken = store.getState().token.token;
    const host = window.location.hostname;
    const parts = host.split('.');
    let subdomain = null;
    if(parts.length === 2 && parts[1] === "localhost") {
        subdomain = parts[0];
    }
    if(subdomain){
        config.headers["X-Tenant"] = subdomain;
    }
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});


AxiosInstance.interceptors.response.use(
    (res) => res,

    async (err) => {
        const originalRequest = err.config;
        if (!err.response) {
            console.error("Network error / CORS blocked");
            return Promise.reject(err);
        }

        console.log("navbass......");

        if (
            err.response.status === 401 &&
            err.response.data?.message === "Access token has expired" &&
            !originalRequest._retry
        ) {
            try {
                originalRequest._retry = true;
                console.log("creating new access token.....");
                const response = await AxiosInstance.post(API_ROUTES.AUTH.REFRESH);
                console.log("created new access token via refresh token.....")
                store.dispatch(setToken(response.data.data));
                originalRequest.headers.Authorization = `Bearer ${response.data.data}`;
                return AxiosInstance(originalRequest);

            } catch (error) {
                console.log(error);
                const authContext = store.getState().authContext;
                console.log(authContext);
                if(authContext.role === "SUPERADMIN"){
                    store.dispatch(clearSuperAdminData())
                    window.location.href=`${FRONTEND_ROUTES.SUPER_ADMIN.LOGIN}`
                }else if(authContext.role === "GYMADMIN"){
                    window.location.href = `http:${authContext.subdomain}.localhost:5173${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`
                    store.dispatch(clearGymAdminData())                    
                }else if(authContext.role === "TRAINER"){
                    window.location.href = `http:\\${authContext.subdomain}.localhost:5173${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`
                    store.dispatch(clearTrainerData())
                }
                store.dispatch(deleteToken());
                store.dispatch(clearAuthContext());
            }
        }
        return Promise.reject(err);
    }
);

export default AxiosInstance;

