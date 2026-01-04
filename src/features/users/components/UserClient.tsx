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


  return (
    <div className="space-y-4">
      <RequireRole role="admin">
        <UsersTable
          users={initialData.data ?? []}
          isLoading={false}
          isError={false}
        />

      <Pagination
        page={page}
        total={initialData?.total ?? 0}
        limit={limit}
        onPageChange={setPage}
        />
        </RequireRole>
    </div>
  );
}
