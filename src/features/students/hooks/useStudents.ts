"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../api/getStudents";
import { GetStudentsParams } from "../types";

export function useStudents(params: GetStudentsParams = {}) {
  const { page, limit, search, filters } = params;
  return useQuery({
    queryKey: ["students", page, limit, search, filters],
    queryFn: () => getStudents(params),
    staleTime: 1000 * 60,
  });
}
