import { getClassById } from "@/features/classes/api/getClassById";
import ClassHeader from "@/features/classes/components/ClassHeader";
import { getSessionByClassId } from "@/features/sessions/api/getSessionByClassId";
import AddSessionButton from "@/features/sessions/components/AddSessionButton";
import SessionsTable from "@/features/sessions/components/SessionTable";
import StudentsPagination from "@/features/students/components/StudentsPagination";
import React from "react";
interface ClassPageProps {
  params: {
    classId: string;
  };
}
export default async function ClassPage({ params }: ClassPageProps) {
  const { classId } = params;
  const classData = await getClassById(Number(classId));
  const sessions = await getSessionByClassId(+classId)
  console.log(sessions)
  console.log(classData)
  return (
    <div>
      <h1>جزئیات کلاس</h1>
      <p>کلاس: {classId}</p>
      <ClassHeader classData={classData}/>
      <SessionsTable sessions ={sessions}/>
         {/* Pagination */}
              {/* {classData?.total && (
                <StudentsPagination
                  page={page}
                  limit={limit}
                  total={students?.total}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              )} */}
      <AddSessionButton classId={Number(classId)}/>
    </div>
  );
}
