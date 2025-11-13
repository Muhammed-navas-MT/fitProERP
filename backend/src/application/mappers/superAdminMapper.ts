import { ISuperAdminLoginResponseDTO } from "../dtos/auth/superAdminLoginDto"
import { SuperAdminEntity } from "../../domain/entities/superAdmin/superAdminEntity"


export class SuperAdminMapper {
    static toSuperAdminLoginResponse(superAdmin:SuperAdminEntity):ISuperAdminLoginResponseDTO {
        return {
            id:superAdmin._id?.toString()||"",
            name:superAdmin.name|| "",
            email:superAdmin.email || "",
            role:superAdmin.role || ""
        }
    }
}