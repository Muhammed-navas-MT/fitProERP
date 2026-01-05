import {
  useMutation,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query"

import {
  addTrainerService,
  getTrainers,
  updateTrainerService,
  findTrainerService,
  blockTrainerService,
  unblockTrainerService,
  listActiveTrainers,
} from "@/services/gymAdmin/trainerService"

import { TrainerAddPayload } from "@/types/authPayload"
import { UpdateTrainerType } from "@/types/updateTrainerType"

export const useAddTrainer = () => {
  return useMutation({
    mutationFn: (data: TrainerAddPayload) =>
      addTrainerService(data),
  })
}

export const useGetAllTrainers = (
  page: number,
  search: string,
  gymId: string
) => {
  return useQuery({
    queryKey: ["trainers", page, search, gymId],
    queryFn: () => getTrainers(page, search, gymId),
    placeholderData: keepPreviousData,
  })
}

export const useGetAllActiveTrainers = (
  branchId:string
) => {
  return useQuery({
    queryKey: ["active-trainers",branchId],
    queryFn: () => listActiveTrainers(branchId),
    placeholderData: keepPreviousData,
  })
}

export const useFindTrainer = (trainerId: string) => {
  return useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: () => findTrainerService(trainerId),
    enabled: !!trainerId, 
  })
}

export const useUpdateTrainer = () => {
  return useMutation({
    mutationFn: ({
      trainerId,
      data,
    }: {
      trainerId: string
      data: UpdateTrainerType
    }) => updateTrainerService(trainerId, data),
  })
}


export const useBlockTrainer = () => {
  return useMutation({
    mutationFn: (trainerId: string) =>
      blockTrainerService(trainerId),
  })
}

export const useUnblockTrainer = () => {
  return useMutation({
    mutationFn: (trainerId: string) =>
      unblockTrainerService(trainerId),
  })
}