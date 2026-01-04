import { getUsers } from "@/features/users/api/getUsers";
import UsersClient from "@/features/users/components/UserClient";
import React from "react";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { getUsersServer } from "@/features/users/api/getUsersServer";

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page: pageParam } = await searchParams;
  const user = await getCurrentUser();
  if(!user) redirect("/auth/login")

    if (user.role !== "admin"){
      redirect("/unauthorized")
    }

  const page =  Number(pageParam ?? 1);
  const limit = 10;

  const initialData = await getUsersServer({
    page,
    limit,
    search: "",
    filters: {},
  });



  return (
    <UsersClient initialData={initialData} initialPage={page} limit={limit} />
  );
}
