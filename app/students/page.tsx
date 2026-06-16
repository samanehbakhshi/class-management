
import { getStudentsServer } from "@/features/students/api/getStudentsServer";
import StudentsClient from "@/features/students/components/StudentsClient";
const initialPageLimit = 2;

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page: pageNumber } = await searchParams;
  const page = Number(pageNumber ?? 1);
  const limit = 10;

  const initialData = await getStudentsServer({
    page,
    limit,
    search: "",
    filters: {},
  });
  // Render UI
  console.log(initialData)
  // Render UI
  return (
  <StudentsClient initialData={initialData} initialPageLimit={initialPageLimit} />
  );
}
