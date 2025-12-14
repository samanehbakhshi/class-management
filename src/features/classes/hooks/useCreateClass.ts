"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClassApi } from "../api/createClass";

import { ClassFormValues } from "../validation";

export function useCreateClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<ClassFormValues>) => createClassApi(payload),
    onSuccess: () => {
      qc.invalidateQueries(["classes"]);
      qc.invalidateQueries(["filterOptions"]);
    },
  });
}
