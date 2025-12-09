"use client"
import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../api/getStudentById";

export default function useStudent(studentId: number) {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudentById(studentId),
  });
}
