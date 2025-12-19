"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UsersTable from "./UsersTable";
import Pagination from "@/components/pagination/Pagination";

export default function UsersClient({ initialData, initialPage, limit }) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const { data, isLoading, isError } = useUsers({
    page,
    limit,
    search,
    filters,
  });
  console.log(data?.data)

  return (
    <div className="space-y-4">
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
    </div>
  );
}
