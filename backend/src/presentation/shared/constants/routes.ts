export const ROUTES = {
  REFRESH: "/refresh_token",
  REFRESH_BASE:"/auth",
  AUTH: {
    SUPERADMIN: {
      BASE: "/super_admin",
      LOGIN: "/login",
      LOGOUT: "/logout",
      CREATE_SUBSCRIPTION: "/create_subscription",
      BLOCK_SUBSCRIPTION: "/block_subscription/:subscriptionId",
      UNBLOCK_SUBSCRIPTION: "/unblock_subscription/:subscriptionId",
      FIND_SUBSCRIPTION: "/subscription/:subscriptionId",
      UPDATE_SUBSCRIPTION: "/update_subscription/:subscriptionId",
      LIST_SUBSCRIPTION: "/list_subscription",
      LIST_GYM: "/list_gym",
      BLOCK_GYM: "/block_gyms/:gymId",
      UNBLOCK_GYM: "/unblock_gym/:gymId",
      DETAIL_GYM: "/gym_detail/:gymId",
      APPROVE_GYM: "/gym_approve/:gymId",
      REJECT_GYM: "/gym_reject/:gymId",
    },
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
    LISTSUBSCRIPTION: "/list_active_subscription",
    PURCHASESUBSCRIPTION: "/purchase_subscription",
    CREATE_BRANCH: "/create_branch",
    BLOCK_BRANCH: "/block_branch/:branchId",
    UNBLOCK_BRANCH: "/unblock_branch/:branchId",
    FIND_BRANCH: "/branch_detail/:branchId",
    UPDATE_BRANCH: "/update_branch/:branchId",
    LIST_BRANCH: "/list_branch",
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
    LIST_ACTIVE_TRAINER:"/active_trainers"
  },

  MEMBER: {
    BASE: "/member",
    LOGIN: "/login",
  }
};