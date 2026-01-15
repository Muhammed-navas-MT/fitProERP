export interface IUpdateAttendceUseCase {
    execute(attendanceId:string):Promise<void>
}