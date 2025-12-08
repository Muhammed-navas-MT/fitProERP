import { BaseEmailContentGenerator } from "./baseEmailContentGenerator";
import { IEmailTemplateGenerator } from "../../../application/interfaces/service/IEmail/emailTemplateGenerator";

export class SignUpOtpEmailContentGenerator
  extends BaseEmailContentGenerator
  implements IEmailTemplateGenerator
{
  generateHtml(data: Record<string, string>): string {
    const body = `
      <!-- OTP Content -->
      <div style="text-align: center; color: #1e293b; max-width: 520px; margin: 0 auto;">
        <h2 style="font-size: 26px; font-weight: 700; margin: 0 0 16px 0; color: #0f172a;">
          Verify Your Account
        </h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 32px 0;">
          You're almost ready to start crushing your gym goals! 
          Please use the One-Time Password (OTP) below to complete your signup.
        </p>

        <!-- OTP Box -->
        <div style="
          background: linear-gradient(135deg, #ef4444, #f97316);
          color: white;
          font-size: 36px;
          font-weight: 900;
          letter-spacing: 8px;
          padding: 24px 20px;
          border-radius: 16px;
          margin: 40px 0;
          text-align: center;
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        ">
          ${data.otp}
        </div>

        <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin: 0 0 24px 0;">
          This OTP is valid for the next <strong>10 minutes only</strong>.<br>
          For security, do not share this code with anyone.
        </p>

        <p style="font-size: 14px; color: #94a3b8; margin: 32px 0 0 0;">
          Didn’t request this? No worries — just ignore this email.
        </p>

        <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 16px; color: #475569; margin: 0;">
            Let's get stronger together,<br>
            <strong style="color: #0f172a;">The Gym Management Team</strong>
          </p>
        </div>
      </div>
    `;

    return this.htmlWrapper(body);
  }
}