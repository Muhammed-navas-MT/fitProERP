export const ROUTES = {
    AUTH:{
        SUPERADMIN:{
            BASE:"/super_admin",
            LOGIN:"/login",
            CREATE_SUBSCRIPTION:"/create_subscription",
            BLOCK_SUBSCRIPTION:"/block_subscription/:subscriptionId",
            UNBLOCK_SUBSCRIPTION:"/unblock_subscription/:subscriptionId",
            FIND_SUBSCRIPTION:"/subsctiption/:subscriptionId",
            UPDATE_SUBSCRIPTION:"/update_subscription/:subscriptionId",
            LIST_SUBSCRIPTION:"/list_subscription"
        }
    },

    GYMADMIN:{
        BASE:"/gym_admin",
        AUTH:{
            EMAIL_VERIFY:"/verify_email",
            OTP_VERIFY:"/verify_otp",
            SIGNUP:"/signup",
            LOGIN:"/login",
        }
    },

    TRAINER:{
        BASE:"/trainer",
        AUTH:{
            EMAIL_VERIFY:"/verify_email",
            OTP_VERIFY:"/verify_otp",
            SIGNUP:"/signup",
            LOGIN:"/login",
        },
        ADD_MEMBER:"/add_member"
    }
}