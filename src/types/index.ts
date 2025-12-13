export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

