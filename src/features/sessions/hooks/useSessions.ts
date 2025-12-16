import { useQuery } from "@tanstack/react-query";
import { GetSessionByClassIdParams } from "../type";
import { getSessionByClassId } from "../api/getSessionByClassId";

export function useSessions (params : GetSessionByClassIdParams){
      const { page, limit, classId, search, filters } = params;
      return useQuery({
        queryKey: ["classes",classId, page, limit, search, filters],
        queryFn: () => getSessionByClassId(params),
        staleTime: 1000 * 60,
      });
}