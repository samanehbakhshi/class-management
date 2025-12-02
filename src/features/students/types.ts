export interface GetStudentsParams {
  search?: string;
  page?: number;
  limit?: number;
  filters?: {
    class_id?: number;
    province?: string;
    city?: string;
  };
}

export interface StudentPaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}
