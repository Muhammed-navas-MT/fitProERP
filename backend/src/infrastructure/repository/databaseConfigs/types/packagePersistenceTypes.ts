export interface IBranchPopulated {
  _id: string
  branchName: string
}

export interface IPackageWithBranch {
  _id: string
  gymId: string
  branchId: IBranchPopulated | null
  name: string
  price: number
  durationInDays: number
  features: string[]
  isDailySession: boolean
  isActive: boolean
}
