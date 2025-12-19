"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/deleteUser";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });
}
