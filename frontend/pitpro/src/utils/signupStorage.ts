const SIGNUP_ID_KEY = "signupId";

export const  signupStorage = {
  saveSignupId(signupId: string): void {
    localStorage.setItem(SIGNUP_ID_KEY, signupId);
  },

  getSignupId(): string | null {
    return localStorage.getItem(SIGNUP_ID_KEY);
  },

  removeSignupId(): void {
    localStorage.removeItem(SIGNUP_ID_KEY);
  },

  hasSignupId(): boolean {
    return localStorage.getItem(SIGNUP_ID_KEY) !== null;
  },
};
