export const FRONTEND_ROUTES = {
    LANDING:"/",
    SUBSCRPIPTION:"/subscription",
    GYM_ADMIN: {
        BASE:"/gym-admin",
        SIGNUP:"signup",
        LOGIN:"login",
        OTP:"/gym-admin/otp-verification",
        DASHBOARD:"dashboard",
        LIST_MEMBERS:"members",
        LIST_EMPLOYEES:"employees",
    },
    SUPER_ADMIN:{
        LOGIN:"/super-admin/login",
        DASHBOARD:"/super-admin/dashboard",
        LIST_SUBSCRIPTION:"/super-admin/subscriptions",
        ADD_SUBSCRIPTION:"/super-admin/add-subscription",
        EDIT_SUBSCRIPTION:"/super-admin/edit-subscription/:id",
        LIST_GYMS:"/super-admin/gyms",
        GYM_DETAIL:"/super-admin/gym-detail",
    },
    TRAINER:{
        BASE:"/trainer",
        LOGIN:"login",
        DASHBOARD:"dashboard",
        LIST_MEMBERS:"members",
    }
}