import { IBaseRepository } from "../base/baseRepo";
import { GymAdminEntity } from "../../../../domain/entities/gymAdmin/gymAdminEntity";
import { IListGymsRequestDTO } from "../../../dtos/superAdminDto/gymManagementDtos";
import { GymAdminProfileResponseDTO } from "../../../dtos/gymAdminDto/gymAdminProfileDtos";
import { GymGrowthDto } from "../../../dtos/superAdminDto/dashboardDto";

export interface IGymAdminRepository extends IBaseRepository<GymAdminEntity> {
  findByEmail(email: string): Promise<GymAdminEntity | null>;
  findBySubdomian(subdomain: string): Promise<GymAdminEntity | null>;
  listGyms(params: IListGymsRequestDTO): Promise<{
    gyms: (GymAdminEntity & { planName: string })[];
    total: number;
  }>;
  findGymAdminWithBranches(
    gymAdminId: string,
  ): Promise<GymAdminProfileResponseDTO | null>;
  findAllGymIds(): Promise<string[]>;
  countTotalGymAdmins(): Promise<number>;
  countGymAdminsCreatedThisMonth(start: Date, end: Date): Promise<number>;
  countGymAdminsCreatedLastMonth(start: Date, end: Date): Promise<number>;
  getGymAdminGrowthByMonth(months: number): Promise<GymGrowthDto[]>;
}
