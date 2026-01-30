import { BaseEmailContentGenerator } from "./baseEmailContentGenerator";
import { IRejectGymEmailContentGenerator } from "../../../application/interfaces/service/IEmail/rejectGymEmailContentGenerator";

export class RejectGymEmailContentGenerator
  extends BaseEmailContentGenerator
  implements IRejectGymEmailContentGenerator
{
  generateHtml(data: {
    gymName: string;
    reason: string;
    gymUrl: string;
    supportEmail?: string;
  }): string {
    const gymName = data.gymName || "Your Gym";
    const reason = data.reason || "Incomplete or invalid information provided.";
    const supportEmail = data.supportEmail || "support@yourapp.com";
    const gymUrl = data.gymUrl;

    const body = `
      <div style="text-align: center; color: #1e293b; max-width: 520px; margin: 0 auto;">
        
        <!-- Title -->
        <h2 style="font-size: 28px; font-weight: 900; margin: 0 0 16px 0; color: #7f1d1d;">
          ❌ Gym Application Rejected
        </h2>

        <p style="font-size: 17px; line-height: 1.6; color: #475569; margin: 0 0 32px 0;">
          Thank you for applying to our platform.<br><br>
          After reviewing your submission for <strong>${gymName}</strong>, we regret to inform you that
          the application could not be approved at this time.
        </p>

        <!-- Reason Box -->
        <div style="
          background: linear-gradient(135deg, #7f1d1d, #991b1b);
          color: white;
          padding: 28px 20px;
          border-radius: 16px;
          margin: 40px 0;
          box-shadow: 0 15px 35px rgba(127, 29, 29, 0.4);
          text-align: left;
        ">
          <p style="margin: 0 0 12px 0; font-size: 15px; opacity: 0.85;">
            Reason for Rejection
          </p>

          <p style="margin: 0; font-size: 16px; font-weight: 600; line-height: 1.6;">
            ${reason}
          </p>
        </div>

        <div style="text-align: center; margin: 32px 0;">
  <a
    href="${gymUrl}"
    target="_blank"
    style="
      display: inline-block;
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      color: white;
      padding: 14px 28px;
      border-radius: 12px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(185, 28, 28, 0.4);
    "
  >
    🔁 Reapply
  </a>
</div>


        <!-- Help Box -->
        <div style="background-color: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin: 40px 0;">
          <p style="margin: 0; font-size: 15px; color: #7f1d1d; font-weight: 600;">
            Need Help?<br>
            <span style="font-weight: normal; opacity: 0.9;">
              If you believe this is a mistake or want to reapply, please contact us at
              <a href="mailto:${supportEmail}" style="color: #b91c1c; font-weight: 700; text-decoration: none;">
                ${supportEmail}
              </a>
            </span>
          </p>
        </div>

        <div style="margin-top: 50px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 16px; color: #475569; margin: 0;">
            We appreciate your interest,<br>
            <strong style="color: #0f172a;">The Gym Management Team</strong>
          </p>
        </div>

      </div>
    `;

    return this.htmlWrapper(body);
  }
}
