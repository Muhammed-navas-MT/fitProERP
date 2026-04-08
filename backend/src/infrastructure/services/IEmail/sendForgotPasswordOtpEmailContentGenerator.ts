import { BaseEmailContentGenerator } from "./baseEmailContentGenerator";
import { ISendPasswordEmailContentGenerator } from "../../../application/interfaces/service/IEmail/sendPasswordEmailContentGenerator";

export class SendForgotPasswordOtpEmailContentGenerator
  extends BaseEmailContentGenerator
  implements ISendPasswordEmailContentGenerator
{
  generateHtml(data: Record<string, string>): string {
    const otp = data.otp;

    const body = `
      <div style="text-align: center; color: #1e293b; max-width: 480px; margin: 0 auto;">
        
        <!-- Title -->
        <h2 style="font-size: 26px; font-weight: 900; margin: 0 0 20px 0; color: #0f172a;">
          Password Reset OTP
        </h2>

        <!-- Short Description -->
        <p style="font-size: 15px; color: #64748b; margin-bottom: 30px;">
          Use the code below to reset your password
        </p>

        <!-- OTP Box -->
        <div style="
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          padding: 30px 20px;
          border-radius: 14px;
          margin: 30px 0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.4);
        ">
          <div style="
            font-size: 40px;
            font-weight: 900;
            letter-spacing: 10px;
            background: linear-gradient(90deg, #22c55e, #4ade80);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">
            ${otp}
          </div>
        </div>

        <!-- Expiry -->
        <p style="font-size: 13px; color: #94a3b8; margin-top: -10px;">
          This OTP is valid for a few minutes
        </p>

        <!-- Warning -->
        <p style="font-size: 13px; color: #ef4444; margin-top: 20px;">
          Do not share this code with anyone
        </p>

      </div>
    `;

    return this.htmlWrapper(body);
  }
}
