export interface ICreateBranchType {
  branchName: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  openTime: string;
  closeTime: string;
}

export interface IUpdateBranchType {
  branchName: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  openTime: string;
  closeTime: string;
}
