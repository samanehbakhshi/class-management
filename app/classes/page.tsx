import { getClassServer } from "@/features/classes/api/getClassServer";
import ClassClient from "@/features/classes/components/ClassClient";

export default async function Classes({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page: pageNumber } = await searchParams;
  const page = Number(pageNumber ?? 1);
  const limit = 10;

  const initialData = await getClassServer({
    page,
    limit,
    search: "",
    filters: {},
  });
  // Render UI
  return (
    <ClassClient initialData={initialData} initialPage={page} limit={limit} />
  );
}
