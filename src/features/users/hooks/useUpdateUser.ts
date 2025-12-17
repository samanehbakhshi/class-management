import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClassFormValues } from "../validation";
import { updateUser } from "../api/updateUser";

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<ClassFormValues>;
    }) => updateUser(id, payload),
    onSuccess: () => {
      qc.invalidateQueries(["users"]);
      qc.invalidateQueries(["filterOptions"]);
    },
  });
}
