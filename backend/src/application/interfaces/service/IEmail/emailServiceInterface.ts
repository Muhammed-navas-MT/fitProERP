import { EmailPayloadType } from "../../../../domain/type/emailPayload";

export interface IEmailService {
    sendEmail(email:Required<EmailPayloadType>):Promise<void>;
}