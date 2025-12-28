"use client";
import { useQuery } from "@tanstack/react-query";
import { GetUsersParams } from "../types";
import { getUsers } from "../api/getUsers";
import { User } from "@/types/user";

interface UseUsersParams extends GetUsersParams {
  initialData?: {
    data: User[];
    total: number;
  };
}
export function useUsers({
  page = 1,
  limit = 10,
  search = "",
  filters = {},
  initialData,
}: UseUsersParams) {
  return useQuery({
    queryKey: ["users", { page, search, filters }],
    queryFn: () => getUsers({ page, limit, search, filters }),
    initialData,
    keepPreviousData: true,
  });
}
