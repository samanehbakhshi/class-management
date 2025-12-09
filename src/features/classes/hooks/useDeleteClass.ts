import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClass } from "../api/deleteClass";

export function useDeleteClass() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteClass(id),
    onSuccess: () => {
      qc.invalidateQueries(["classess"]);
      qc.invalidateQueries(["filterOptions"]);
    },
    onError: (err: any) => {
      console.error(err);
    },
  });
}
