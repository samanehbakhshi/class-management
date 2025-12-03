// src/features/students/hooks/useCreateStudent.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentApi } from "../api/createStudent";
import type { StudentFormValues } from "../validation";

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<StudentFormValues>) =>
      createStudentApi(payload),
    onSuccess: () => {
      qc.invalidateQueries(["students"]);
      qc.invalidateQueries(["filterOptions", "cities"]); // update city options if needed
    },
  });
}
