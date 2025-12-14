import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClassFormValues } from "../validation";
import { updateClassApi } from "../api/updateClass";

export function useUpdateClass() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<ClassFormValues>;
    }) => updateClassApi(id, payload),
    onSuccess: () => {
      qc.invalidateQueries(["classes"]);
      qc.invalidateQueries(["filterOptions"]);
    },
  });
}
