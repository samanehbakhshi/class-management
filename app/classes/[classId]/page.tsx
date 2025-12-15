import { getClassById } from "@/features/classes/api/getClassById";
import ClassHeader from "@/features/classes/components/ClassHeader";
import React from "react";
import ClassSessionsClient from "./ClassSessionsClient";
interface ClassPageProps {
  params: {
    classId: number;
  };
}
export default async function ClassPage({ params }: ClassPageProps) {
  const { classId } = params;
  const classData = await getClassById(classId);

  return (
    <div>
      <ClassHeader classData={classData} />
      <ClassSessionsClient classId={classId}/>
    </div>
  );
}
