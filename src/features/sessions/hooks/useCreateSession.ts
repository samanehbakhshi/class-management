import { useMutation, useQueryClient } from "@tanstack/react-query";
import createSession from "../api/createSession";
import { SessionFormValues } from "../validaiton";

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<SessionFormValues>) => createSession(payload),
    onSuccess: () => {
      qc.invalidateQueries(["sessions"]);
    },
  });
}
