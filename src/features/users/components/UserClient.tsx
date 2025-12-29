"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UsersTable from "./UsersTable";
import Pagination from "@/components/pagination/Pagination";
import RequireRole from "@/components/auth/RequireRole";
type UserClientProps = {
  initialData: { data: []; total: number };
  initialPage: number;
  limit: number;
};
export default function UsersClient({
  initialData,
  initialPage,
  limit,
}: UserClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const { data, isLoading, isError } = useUsers({
    page,
    limit,
    search,
    filters,
    initialData,
  });
  console.log(data?.data);

  return (
    <div className="space-y-4">
      <RequireRole role="admin">
        <UsersTable
          users={data?.data ?? []}
          isLoading={isLoading}
          isError={isError}
        />

      <Pagination
        page={page}
        total={data?.total ?? 0}
        limit={limit}
        onPageChange={setPage}
        />
        </RequireRole>
    </div>
  );
}
