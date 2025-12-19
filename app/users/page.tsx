import { getUsers } from "@/features/users/api/getUsers";
import UsersClient from "@/features/users/components/UserClient";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const limit = 10;

  const initialData = await getUsers({
    page,
    limit,
    search: "",
    filters: {},
  });
  return (
    <UsersClient initialData={initialData} initialPage={page} limit={limit} />
  );
}
