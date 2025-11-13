export const ROUTES = {
    AUTH:{
        SUPERADMIN:{
            BASE:"/admin",
            LOGIN:"/login",
            CREATE_SUBSCRIPTION:"/create_subscription",
            BLOCK_SUBSCRIPTION:"/block_subscription/:subscriptionId",
            UNBLOCK_SUBSCRIPTION:"/unblock_subscription/:subscriptionId",
            FIND_SUBSCRIPTION:"/subsctiption/:subscriptionId",
            UPDATE_SUBSCRIPTION:"/update_subscription/:subscriptionId",
            LIST_SUBSCRIPTION:"/list_subscription"
        }
    }
}