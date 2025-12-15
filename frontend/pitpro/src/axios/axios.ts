import axios from "axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { setToken, deleteToken } from "@/store/slice/tokenSlice";
import { store } from "@/store/store";
// import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
// import { clearData } from "@/store/slice/authDataSlice";


const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

AxiosInstance.interceptors.request.use((config) => {
    const accessToken = store.getState().token.token;
    console.log(accessToken,"from axiosss....")
    const host = window.location.hostname;
    console.log(host)
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

        if (
            err.response.status === 401 &&
            err.response.data?.message === "Token expired" &&
            !originalRequest._retry
        ) {
            try {
                originalRequest._retry = true;
                console.log("send request to server for creating access token.....")
                const response = await AxiosInstance.post(API_ROUTES.AUTH.REFRESH);
                store.dispatch(setToken(response.data.data));
                originalRequest.headers.Authorization = `Bearer ${response.data.data}`;
                return AxiosInstance(originalRequest);

            } catch (error) {
                console.log(error);
                // if(error.role === "SUPERADMIN"){
                //     window.location.href=`${FRONTEND_ROUTES.SUPER_ADMIN.LOGIN}`
                // }else if(error.role === "GYMADMIN"){
                //     window.location.href = `http:${error.subdomain}.localhost:5173${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`
                // }else if(error.role === "TRAINER"){
                //     window.location.href = `http:\\${error.subdomain}.localhost:5173${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`
                // }
                store.dispatch(deleteToken());
            }
        }
        return Promise.reject(err);
    }
);

export default AxiosInstance;


// import axios from "axios";
// import { API_ROUTES } from "@/constants/apiRoutes";
// import { setToken, deleteToken } from "@/store/slice/tokenSlice";
// import { store } from "@/store/store";
// import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";

// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// AxiosInstance.interceptors.request.use((config) => {
//   const accessToken = store.getState().token.token;
//   const host = window.location.hostname; 
//   const parts = host.split(".");
//   let subdomain = null;

//   if (parts.length === 2 && parts[1] === "localhost" && parts[0] !== "localhost") {
//     subdomain = parts[0];
//   }
//   if (subdomain) {
//     config.headers["X-Tenant"] = subdomain;
//   }
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// AxiosInstance.interceptors.response.use(
//   (res) => res,

//   async (err) => {
//     const originalRequest = err.config;

//     if (!err.response) {
//       console.error("Network Error or CORS Blocked");
//       return Promise.reject(err);
//     }

//     if (
//       err.response.status === 401 &&
//       err.response.data?.message === "Token expired" &&
//       !originalRequest._retry
//     ) {
//       try {
//         originalRequest._retry = true;

//         const response = await AxiosInstance.post(API_ROUTES.AUTH.REFRESH);

//         store.dispatch(setToken(response.data.data));

//         originalRequest.headers.Authorization = `Bearer ${response.data.data}`;
//         return AxiosInstance(originalRequest);
//       } catch (error) {
//         console.log("Refresh Token Error:", error);

//         const backendError = error?.response?.data;
//         const role = backendError?.role;
//         const sub = backendError?.subdomain;

//         if (role === "SUPERADMIN") {
//           window.location.href = FRONTEND_ROUTES.SUPER_ADMIN.LOGIN;
//         } 
//         else if (role === "GYMADMIN") {
//           window.location.href = `http://${sub}.localhost:5173${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`;
//         } 
//         // else if (role === "TRAINER") {
//         //   // FIXED WRONG URL SYNTAX
//         //   window.location.href = `http://${sub}.localhost:5173${FRONTEND_ROUTES.TRAINER.LOGIN}`;
//         // }else if (role === "MEMBER") {
//         //   // FIXED WRONG URL SYNTAX
//         //   window.location.href = `http://${sub}.localhost:5173${FRONTEND_ROUTES.MEMBER.LOGIN}`;
//         // }

//         store.dispatch(deleteToken());
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default AxiosInstance;

