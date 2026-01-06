export const SubscriptionPlanLimits = {
  BASIC: {
    maxMembers: 100,
    maxTrainers: 2,
    maxBranches: 1,
  },

  PREMIUM: {
    maxMembers: 200,
    maxTrainers: 5,
    maxBranches: 3,
  }
} as const;
