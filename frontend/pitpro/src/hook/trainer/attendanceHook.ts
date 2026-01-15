import { getAttendanceListService, getTodayAttendanceService, MarkAttendanceService, updateAttendanceService } from "@/services/trainer/attendanceService";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export const useMarkAttendance = ()=>{
  return useMutation({
    mutationFn:() => MarkAttendanceService()
  })
};

export const useUpdateAttendance = ()=>{
  return useMutation({
    mutationFn:(id:string) => updateAttendanceService(id)
  })
};

export const useTodayAttendance = ()=>{
  return useQuery({
    queryKey:["today-attendance"],
    queryFn:getTodayAttendanceService,
  })
};

export const useAttendanceList = ()=>{
  return useQuery({
    queryKey:["attendances"],
    queryFn:getAttendanceListService,
    placeholderData:keepPreviousData
  })
};