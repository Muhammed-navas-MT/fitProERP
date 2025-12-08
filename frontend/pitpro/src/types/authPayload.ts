import { UserRole } from "./userRole";

export type OtpPayload = {
  email: string;
  otp: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role:UserRole;
  gymName: string;
  tagline: string;
  description: string;
  logo: File | null;
  businessLicense: File | null;
  insuranceCertificate: File | null;
}