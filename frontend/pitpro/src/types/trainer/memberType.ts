export type Status = "ACTIVE" | "BLOCKED" | "IN_ACTIVE";

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  avatar?: string;
  status: Status;
  createdAt?: Date;
}
