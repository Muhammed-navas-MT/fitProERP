import {listAllActivePackages } from "@/services/member/packageService";
import { useQuery } from "@tanstack/react-query";

export const useListActivepackage = () => {
  return useQuery({
    queryKey: ["activePackage"],
    queryFn: listAllActivePackages,
  });
};
