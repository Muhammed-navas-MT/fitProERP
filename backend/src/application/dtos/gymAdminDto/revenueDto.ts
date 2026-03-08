import { SummaryType } from "../../../infrastructure/repository/databaseConfigs/types/populatedRevenueType";

export interface IListRevenueRequestDTO {
  search: string;
  page: number;
  limit: number;
  gymId: string;
  branchId: string;
  sourceType: string;
}

export interface IListRevenueResponseDTO {
  revenues: RevenueResponseDto[];
  total: number;
  page: number;
  totalPages: number;
  search: string;
  limit: number;
  sourceType: string;
  summary: SummaryType[];
  grandTotalAmount: number;
}

export interface RevenueResponseDto {
  id: string;
  branchName: string;
  branchAddress: {
    city: string;
    pincode: string;
  };
  memberName: string;
  email: string;
  source: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}
