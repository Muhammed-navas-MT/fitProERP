import { BaseEmailContentGenerator } from "./baseEmailContentGenerator";
import { ISendPasswordEmailContentGenerator } from "../../../application/interfaces/service/IEmail/sendPasswordEmailContentGenerator";

export class SendPasswordEmailContentGenerator
  extends BaseEmailContentGenerator
  implements ISendPasswordEmailContentGenerator
{
  generateHtml(data: Record<string, string>): string {
    const name = data.name || "Member";
    const gymName = data.gymName || "our gym";
    const password = data.password;

    const body = `
      <div style="text-align: center; color: #1e293b; max-width: 520px; margin: 0 auto;">
        <!-- Welcome Title -->
        <h2 style="font-size: 28px; font-weight: 900; margin: 0 0 16px 0; color: #0f172a;">
          Welcome to the Family!
        </h2>

        <p style="font-size: 17px; line-height: 1.6; color: #475569; margin: 0 0 32px 0;">
          Hey <strong>${name}</strong>,<br><br>
          Your membership at <strong>${gymName}</strong> has been created successfully!<br>
          Your account is ready — here are your login credentials.
        </p>

        <!-- Password Highlight Box -->
        <div style="
          background: linear-gradient(135deg, #1e293b, #0f172a);
          color: white;
          padding: 32px 20px;
          border-radius: 16px;
          margin: 40px 0;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.4);
        ">
          <p style="margin: 0 0 12px 0; font-size: 15px; opacity: 0.9;">
            Your Temporary Password
          </p>
          <div style="
            font-size: 38px;
            font-weight: 900;
            letter-spacing: 6px;
            background: linear-gradient(90deg, #ef4444, #fb923c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          ">
            ${password}
          </div>
        </div>

        <!-- Login Button -->
        <div style="margin: 45px 0;">
          <a href="${data.loginUrl}"
             style="
               display: inline-block;
               background: linear-gradient(135deg, #ef4444, #f97316);
               color: white;
               font-size: 19px;
               font-weight: 800;
               padding: 18px 50px;
               border-radius: 14px;
               text-decoration: none;
               box-shadow: 0 12px 30px rgba(239, 68, 68, 0.35);
             "
             target="_blank">
             LOG IN NOW
          </a>
        </div>

        <!-- Security Warning Box -->
        <div style="background-color: #fffbeb; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 40px 0;">
          <p style="margin: 0; font-size: 15px; color: #92400e; font-weight: 600;">
            Security Tip: Change this password immediately after logging in.<br>
            <span style="font-weight: normal; opacity: 0.9;">
              This is the only time your password will be sent via email.
            </span>
          </p>
        </div>

        <div style="margin-top: 50px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 16px; color: #475569; margin: 0;">
            Time to level up,<br>
            <strong style="color: #0f172a;">The Gym Management Team</strong>
          </p>
        </div>
      </div>
    `;

    return this.htmlWrapper(body);
  }
}