


import { getAttendanceServer } from "@/features/attendance/api/getAttendanceServer";
import AttendanceClient from "@/features/attendance/components/AttendanceClient";

export default async function Attendance({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page: pageNumber } = await searchParams;
  const page = Number(pageNumber ?? 1);
  const limit = 10;

  const initialData = await getAttendanceServer({
    page,
    limit,
    search: "",
    filters: {},
  });
  // Render UI
  console.log(initialData)
  return (
    <AttendanceClient initialData={initialData} initialPage={page} limit={limit} />
  );
}
