import axios from "axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { setToken, deleteToken } from "@/store/slice/tokenSlice";
import { store } from "@/store/store";
import { clearData } from "@/store/slice/authDataSlice";


const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

AxiosInstance.interceptors.request.use((config) => {
    const accessToken = store.getState().token.token;
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
                const response = await AxiosInstance.post(API_ROUTES.AUTH.REFRESH);
                store.dispatch(setToken(response.data.data));
                originalRequest.headers.Authorization = `Bearer ${response.data.data}`;
                return AxiosInstance(originalRequest);

            } catch (error) {
                console.log(error);
                store.dispatch(clearData());
                store.dispatch(deleteToken());
            }
        }
        return Promise.reject(err);
    }
);

export default AxiosInstance;
