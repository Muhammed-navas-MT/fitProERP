export interface IVerifyEmailRequestDTO {
  email: string;
  phone: string;
  ownerName: string;
  password: string;
  signupId?: string;
}

export interface IVerifyOtpRequestDTO {
  email: string;
  signupId: string;
  otp: string;
}

export interface IRegistrationResponseDTO {
  ownerName?: string;
  email?: string;
  phone?: string;
  gymName?: string;
  isVerified?: boolean;
  tagline?: string;
  description?: string;
  logo?: string;
  currentStep?: 1 | 2 | 3;
}

export interface IGymInfoRequestDTO {
  signupId: string;
  gymName: string;
  description: string;
  subdomain: string;
  tagline: string;
  logo: Express.Multer.File | undefined;
}
