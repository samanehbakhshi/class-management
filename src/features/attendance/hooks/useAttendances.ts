"use client"
import { useQuery } from "@tanstack/react-query";
import { GetAttendanceParams } from "../types";
import { getAttendances } from "../api/attendance";

export function useAttendances(params: GetAttendanceParams) {
  const { page, limit, search, filters } = params;
  return useQuery({
    queryKey: ["attendances", page, limit, search, filters],
    queryFn: () => getAttendances(params),
    staleTime: 1000 * 60,
  });
}