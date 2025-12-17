"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormValues } from "../validation";
import { createUser } from "../api/createUser";

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<UserFormValues>) => createUser(payload),
    onSuccess: () => {
      qc.invalidateQueries(["users"]);
      qc.invalidateQueries(["filterOptions"]);
    },
  });
}
