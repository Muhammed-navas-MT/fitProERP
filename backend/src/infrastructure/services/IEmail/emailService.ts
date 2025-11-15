import nodemailer from "nodemailer";
import { IEmailService } from "../../../application/interfaces/service/IEmail/emailServiceInterface";
import { configEnv } from "../../../config/envConfig";
import { EmailPayloadType } from "../../../domain/type/emailPayload";

export class EmailService implements IEmailService {
  private _transporter: nodemailer.Transporter; 

  constructor() {
    this._transporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {
          user: configEnv.GOOGLE_MAIL,
          pass: configEnv.GOOGLE_APP_PASSWORD,
        },
      },
      {
        from: configEnv.GOOGLE_MAIL,
      }
    );

    this._transporter
      .verify()
      .then(() => console.log("Gmail connection established"))
      .catch((err) => console.log(" Gmail connection failed:", err));
  };

  async sendEmail(email: Required<EmailPayloadType>): Promise<void> {
      try {
        console.log("email " + email.recieverMailId);
        await this._transporter.sendMail({
            to:email.recieverMailId,
            subject:email.subject,
            html:email.content
        })
      } catch (error) {
        throw error
      }
  }
}
