import { IPopulatedRevenue, SummaryType } from "../../../infrastructure/repository/databaseConfigs/types/populatedRevenueType";
import { IListRevenueRequestDTO, IListRevenueResponseDTO, RevenueResponseDto } from "../../dtos/gymAdminDto/revenueDto";

export class RevenueMapper {
  constructor() {}

  static toRevenueDetailResponse(revenue:IPopulatedRevenue):RevenueResponseDto{
    return{
        id:revenue._id.toString(),
        branchName:revenue.branch.branchName,
        branchAddress:revenue.branch.address,
        memberName:revenue.member.name,
        email:revenue.member.email,
        source:revenue.source,
        amount:revenue.amount,
        paymentMethod:revenue.paymentMethod,
        status:revenue.status,
        createdAt:revenue.createdAt
    }
  }

  static toRevenueListResponse(
  revenues: IPopulatedRevenue[],
  params: IListRevenueRequestDTO,
  total: number,
  summary:SummaryType[],
  grandTotalAmount:number
): IListRevenueResponseDTO {

  const page = params.page;
  const limit = params.limit;

  const mappedRevenues: RevenueResponseDto[] = revenues.map((revenue) => ({
    id:revenue._id.toString(),
    branchName:revenue.branch.branchName,
    branchAddress:revenue.branch.address,
    memberName:revenue.member.name,
    email:revenue.member.email,
    source:revenue.source,
    amount:revenue.amount,
    paymentMethod:revenue.paymentMethod,
    status:revenue.status,
    createdAt:revenue.createdAt
  }));

  return {
    revenues: mappedRevenues,
    total: total,
    page: page,
    totalPages: Math.ceil(total / limit),
    search:params.search,
    limit:params.limit,
    sourceType:params.sourceType,
    grandTotalAmount,
    summary
  };
}
}
