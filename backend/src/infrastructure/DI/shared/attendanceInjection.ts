import { GetAttendanceListUseCase } from "../../../application/useCases/shared/attendanceManagement/getAttendanceListUseCase";
import { GetAttendanceUseCase } from "../../../application/useCases/shared/attendanceManagement/getAttendanceUseCase";
import { GetCurrentMonthAttendanceUseCase } from "../../../application/useCases/shared/attendanceManagement/getCurrentMonthAttendanceUseCase";
import { MarkAttendanceUseCase } from "../../../application/useCases/shared/attendanceManagement/markAttendanceUseCase";
import { UpdateAttendanceUseCase } from "../../../application/useCases/shared/attendanceManagement/updateAttendanceUseCase";
import { AttendanceController } from "../../../presentation/controller/shared/attendanceController";
import { AttendanceModel } from "../../repository/databaseConfigs/models/attendanceModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { MemberRepository } from "../../repository/member/memberRepo";
import { AttendanceRepository } from "../../repository/shared/attendanceRepo";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";

// attendance management
const attendanceRepository = new AttendanceRepository(AttendanceModel);
const trainerRepository = new TrainerRepository(trainerModel);
const memberRepository = new MemberRepository(memberModel);
const markAttendanceUseCase = new MarkAttendanceUseCase(attendanceRepository,trainerRepository,memberRepository);
const updateAttendanceUseCase = new UpdateAttendanceUseCase(attendanceRepository,trainerRepository,memberRepository);
const getAttendanceUseCase = new GetAttendanceUseCase(attendanceRepository);
const getAttendanceListUseCase = new GetAttendanceListUseCase(attendanceRepository);
const getCurrentMonthAttendanceUseCase = new GetCurrentMonthAttendanceUseCase(attendanceRepository,trainerRepository,memberRepository);
export const injectedAttendanceController = new AttendanceController(markAttendanceUseCase,updateAttendanceUseCase,getAttendanceUseCase,getAttendanceListUseCase,getCurrentMonthAttendanceUseCase);