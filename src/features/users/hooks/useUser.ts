"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/getUserById";

export default function useUser(classId: number) {
  return useQuery({
    queryKey: ["user", classId],
    queryFn: () => getUserById(classId),
  });
}
