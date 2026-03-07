export interface IListPaymentRequestDTO {
  search: string;
  page: number;
  limit: number;
}

export interface IPaymentItemDTO {
  id: string;
  gymName: string;
  packageName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}

export interface IListPaymentResponseDTO {
  payments: IPaymentItemDTO[];
  totalPayments: number;
  currentPage: number;
  totalPages: number;
}

export interface IPaymentDetailDTO {
  id: string;
  gymName: string;
  packageName: string;
  stripeSessionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  ownerName: string;
  ownerEmail: string;
}
