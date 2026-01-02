"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { getTeachers } from "../api/getTeachers";
import { GetUsersParams } from "@/features/users/types";

interface UseUsersParams extends GetUsersParams {
  initialData?: {
    data: User[];
    total: number;
  };
}
export function useTeachers({
  page = 1,
  limit = 10,
  search = "",
  filters = {},
  initialData,
}: UseUsersParams) {
  return useQuery({
    queryKey: ["teachers", { page, search, filters }],
    queryFn: () => getTeachers({ page, limit, search, filters }),
    initialData,
    keepPreviousData: true,
  });
}
