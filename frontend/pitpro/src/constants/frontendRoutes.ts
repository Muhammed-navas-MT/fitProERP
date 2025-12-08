export const FRONTEND_ROUTES = {
    LANDING:"/",
    SUBSCRPIPTION:"/subscription",
    GYM_ADMIN: {
        SIGNUP:"/gym-admin/signup",
        OTP:"/gym-admin/otp-verification",
    },
    SUPER_ADMIN:{
        LOGIN:"/super-admin/login",
        DASHBOARD:"/super-admin/dashboard",
        LIST_SUBSCRIPTION:"/super-admin/subscriptions",
        ADD_SUBSCRIPTION:"/super-admin/add-subscription",
        EDIT_SUBSCRIPTION:"/super-admin/edit-subscription/:id",
    }
}