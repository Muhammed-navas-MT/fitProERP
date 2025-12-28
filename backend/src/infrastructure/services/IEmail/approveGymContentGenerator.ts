import { BaseEmailContentGenerator } from "./baseEmailContentGenerator";
import { IApproveGymEmailContentGenerator  } from "../../../application/interfaces/service/IEmail/approveGymEmailContentGenerator";

export class ApproveGymEmailContentGenerator
  extends BaseEmailContentGenerator
  implements IApproveGymEmailContentGenerator
{
  generateHtml(data: Record<string, string>): string {
    const gymName = data.gymName || "Your Gym";
    const subdomain = data.subdomain || "your-gym";
    const gymUrl = data.gymUrl || "#";

    const body = `
      <div style="text-align: center; color: #1e293b; max-width: 520px; margin: 0 auto;">
        
        <!-- Title -->
        <h2 style="font-size: 28px; font-weight: 900; margin: 0 0 16px 0; color: #0f172a;">
          🎉 Gym Approved Successfully!
        </h2>

        <p style="font-size: 17px; line-height: 1.6; color: #475569; margin: 0 0 32px 0;">
          Congratulations!<br><br>
          Your gym <strong>${gymName}</strong> has been officially approved by our Super Admin team.
          You can now access your dashboard and start managing your gym online.
        </p>

        <!-- Info Box -->
        <div style="
          background: linear-gradient(135deg, #1e293b, #0f172a);
          color: white;
          padding: 28px 20px;
          border-radius: 16px;
          margin: 40px 0;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.4);
          text-align: left;
        ">
          <p style="margin: 0 0 12px 0; font-size: 15px; opacity: 0.85;">
            Your Gym Details
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Gym Name:</strong> ${gymName}
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Subdomain:</strong> 
            <span style="color: #fb923c; font-weight: 700;">
              ${subdomain}
            </span>
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Gym URL:</strong><br>
            <a href="${gymUrl}" target="_blank"
               style="color: #38bdf8; text-decoration: none; font-weight: 600;">
              ${gymUrl}
            </a>
          </p>
        </div>

        <!-- Dashboard Button -->
        <div style="margin: 45px 0;">
          <a href="${gymUrl}"
             style="
               display: inline-block;
               background: linear-gradient(135deg, #22c55e, #16a34a);
               color: white;
               font-size: 18px;
               font-weight: 800;
               padding: 18px 48px;
               border-radius: 14px;
               text-decoration: none;
               box-shadow: 0 12px 30px rgba(34, 197, 94, 0.35);
             "
             target="_blank">
             GO TO DASHBOARD
          </a>
        </div>

        <!-- Note Box -->
        <div style="background-color: #ecfeff; border: 2px solid #06b6d4; border-radius: 12px; padding: 20px; margin: 40px 0;">
          <p style="margin: 0; font-size: 15px; color: #0e7490; font-weight: 600;">
            Note:<br>
            <span style="font-weight: normal; opacity: 0.9;">
              Please keep your subdomain safe and do not share admin access with unauthorized users.
            </span>
          </p>
        </div>

        <div style="margin-top: 50px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 16px; color: #475569; margin: 0;">
            Wishing you success,<br>
            <strong style="color: #0f172a;">The Gym Management Team</strong>
          </p>
        </div>

      </div>
    `;

    return this.htmlWrapper(body);
  }
}
