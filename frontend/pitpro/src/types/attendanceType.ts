export interface GetAttendanceType {
  _id: string;
  userId: string;
  userType: string;
  branchId: string;
  date: Date;
  status: string;
  checkInTime: Date;
  checkOutTime?: Date;
}
