import { IBranchEntity } from "../../../domain/entities/gymAdmin/branchEntity";
import { IListActiveBranchResponseDTO, IListBranchResponseDTO, ISingleBranchResponseDTO } from "../../dtos/gymAdminDto/BranchDto";

export class BranchResponseMapper {
  static toFindBranchResponse(
    branch: IBranchEntity
  ): ISingleBranchResponseDTO {
    return {
      id: branch._id?.toString() || "",
      branchName: branch.branchName || "",
      phone:branch.phone || "",
      address: branch.address || "",
      openTime: branch.openTime || "",
      closeTime: branch.closeTime || "",
      status: branch.status || "",
      createdAt: branch.createdAt!,
    };
  };

  static toListItem(
    data: {
      branch: IBranchEntity;
      membersCount: number;
      staffCount: number;
      phone: string;
    }[],
    total: number
  ): IListBranchResponseDTO {
    return {
      branches: data.map((item) => ({
        id: item.branch._id?.toString() || "",
        branchName: item.branch.branchName || "",
        address: `${item.branch.address.street}, ${item.branch.address.city}` || "",
        phone: item.phone || "",
        membersCount: item.membersCount || 0,
        staffCount: item.staffCount || 0,
        status:item.branch.status
      })),
      total,
    };
  };

  static toListActiveItem(branch: IBranchEntity[]): IListActiveBranchResponseDTO {
    return {
       branches:branch.map((item) => ({
        id: item._id?.toString() || "",
        branchName: item.branchName || "",
        address: `${item.address.street}, ${item.address.city}` || ""
      }))
    };
  }
}
