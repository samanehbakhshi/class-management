"use client";
import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "../api/getTeacherById";

export default function useTeacher(classId: number) {
  return useQuery({
    queryKey: ["teacher", classId],
    queryFn: () => getTeacherById(classId),
  });
}
