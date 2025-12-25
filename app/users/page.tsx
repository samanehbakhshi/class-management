import { getUsers } from "@/features/users/api/getUsers";
import UsersClient from "@/features/users/components/UserClient";
import React from "react";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {

  const user = await getCurrentUser();

  const page =  Number(await searchParams.page ?? 1);
  const limit = 10;

  const initialData = await getUsers({
    page,
    limit,
    search: "",
    filters: {},
  });

  console.log(user)

  if(!user) redirect("/auth/login")

    if (user.role !== "admin"){
      redirect("/unauthorized")
    }
  return (
    <UsersClient initialData={initialData} initialPage={page} limit={limit} />
  );
}
