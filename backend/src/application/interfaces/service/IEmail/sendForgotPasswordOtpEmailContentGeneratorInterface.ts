export interface ISendForgotPasswordOtpEmailContentGenerator {
  generateHtml(data: { otp: string }): string;
}
