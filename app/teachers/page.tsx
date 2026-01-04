import { getTeachers } from "@/features/teachers/api/getTeachers";
import { getTeachersServer } from "@/features/teachers/api/getTeachersServer";
import TeacherClient from "@/features/teachers/components/TeacherClient";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number((await searchParams.page) ?? 1);
  const limit = 10;

  const initialData = await getTeachersServer({
    page,
    limit,
  });


  return (
    <>
      <TeacherClient
        initialData={initialData}
        initialPage={page}
        limit={limit}
      />
    </>
  );
}
