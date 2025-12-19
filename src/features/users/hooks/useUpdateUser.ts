import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  UserFormValues } from "../validation";
import { updateUser } from "../api/updateUser";

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<UserFormValues>;
    }) => updateUser(id, payload),
    onSuccess: () => {
      qc.invalidateQueries(["users"]);
      qc.invalidateQueries(["filterOptions"]);
    },
  });
}
