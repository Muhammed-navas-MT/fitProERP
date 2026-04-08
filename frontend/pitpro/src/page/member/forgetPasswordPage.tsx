import ForgetPasswordFlow from "@/components/shared/forgetPasswordFlow";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";

export default function MemberForgetPasswordPage() {
  return (
    <ForgetPasswordFlow
      loginPath={`${FRONTEND_ROUTES.MEMBER.BASE}/${FRONTEND_ROUTES.MEMBER.LOGIN}`}
      theme="orange"
      storageKey="member-forget-password"
    />
  );
}