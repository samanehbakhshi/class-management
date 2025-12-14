"use client";
import { useQuery } from "@tanstack/react-query";
import { getClassById } from "../api/getClassById";

export default function useClass(classId: number) {
  return useQuery({
    queryKey: ["class", classId],
    queryFn: () => getClassById(classId),
  });
}
