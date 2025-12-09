"use client"
import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../api/getClasses";
import { GetClassesParams } from "../types";

export function useClasses(params: GetClassesParams) {
  const { page, limit, search, filters } = params;
  return useQuery({
    queryKey: ["classes", page, limit, search, filters],
    queryFn: () => getClasses(params),
    staleTime: 1000 * 60,
  });
}