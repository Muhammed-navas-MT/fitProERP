export interface EmailPayloadType {
    recieverMailId:string,
    subject:string,
    content:string,
    attachement?:string[];
}