"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../api/getUserRole";

export function useUserRole() {
  return useQuery({
    queryKey: ["userRole"],
    queryFn: () => getUserRole(),
    staleTime: 1000 * 60,
  });
}
