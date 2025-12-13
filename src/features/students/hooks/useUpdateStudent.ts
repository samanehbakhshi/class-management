"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentApi } from "../api/updateStudent";
import type { StudentFormValues } from "../validation";

export function useUpdateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<StudentFormValues>;
    }) => updateStudentApi(id, payload),
    onSuccess: () => {
      qc.invalidateQueries(["students"]);
      qc.invalidateQueries(["filterOptions", "cities"]);
    },
  });
}
