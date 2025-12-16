export interface GetSessionByClassIdParams {
  classId: number;
  page: number;
  limit: number;
  search?: string;
  filters?: {
    status?: string;
    date?: string;
  };
}