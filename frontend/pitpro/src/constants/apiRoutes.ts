export const API_ROUTES = {
  AUTH: {
    REFRESH: "/refresh_token",
    BASE:"/auth",
  },
  SUPERADMIN: {
    BASE: "/super_admin",
    LOGIN: "/login",
    LOGOUT: "/logout",
    CREATE_SUBSCRIPTION: "/create_subscription",
    BLOCK_SUBSCRIPTION: "/block_subscription",
    UNBLOCK_SUBSCRIPTION: "/unblock_subscription",
    FIND_SUBSCRIPTION: "/subscription",
    UPDATE_SUBSCRIPTION: "/update_subscription",
    LIST_SUBSCRIPTION: "/list_subscription",
    LIST_GYM: "/list_gym",
    BLOCK_GYM: "/block_gyms",
    UNBLOCK_GYM: "/unblock_gym",
    DETAIL_GYM: "/gym_detail",
    APPROVE_GYM: "/gym_approve",
    REJECT_GYM: "/gym_reject",
  },

  GYMADMIN: {
    BASE: "/gym_admin",
    AUTH: {
      EMAIL_VERIFY: "/verify_email",
      OTP_VERIFY: "/verify_otp",
      SIGNUP: "/signup",
      LOGIN: "/login",
      LOGOUT: "/logout",
    },
    LISTTRAINER: "/list_trainers",
    CREATE_TRAINER: "/create_trainer",
    UPDATE_TRAINER:"/update_trainer",
    FIND_TRAINER:"/find_trainer",
    UNBLOCK_TRAINER:"/unblock_trainer",
    BLOCK_TRAINER:"/block_trainer",
    LISTSUBSCRIPTION: "/list_active_subscription",
    PURCHASESUBSCRIPTION: "/purchase_subscription",
    CREATE_BRANCH: "/create_branch",
    BLOCK_BRANCH: "/block_branch",
    UNBLOCK_BRANCH: "/unblock_branch",
    FIND_BRANCH: "/branch_detail",
    UPDATE_BRANCH: "/update_branch",
    LIST_BRANCH: "/list_branch",
    LIST_ACTIVE_BRANCH:"/list_active_branch",
  },

  TRAINER: {
    BASE: "/trainer",
    AUTH: {
      EMAIL_VERIFY: "/verify_email",
      OTP_VERIFY: "/verify_otp",
      SIGNUP: "/signup",
      LOGIN: "/login",
    },
    ADD_MEMBER: "/add_member",
    LIST_MEMBER: "/list_members",
    LIST_ACTIVE_TRAINER:"/active_trainers",
  },
  MEMBER:{
    BASE:"/member",
    LOGIN:"/login"
  }
};
