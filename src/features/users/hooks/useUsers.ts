"use client";
import { useQuery } from "@tanstack/react-query";
import {  GetUsersParams } from "../types";
import { getUsers } from "../api/getUsers";

export function useUsers(params: GetUsersParams) {
  const { page, limit, search, filters } = params;
  return useQuery({
    queryKey: ["users", page, limit, search, filters],
    queryFn: () => getUsers(params),
    staleTime: 1000 * 60,
  });
}