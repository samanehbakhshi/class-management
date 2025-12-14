import { getClassById } from "@/features/classes/api/getClassById";
import ClassHeader from "@/features/classes/components/ClassHeader";
import React from "react";
interface ClassPageProps {
  params: {
    classId: string;
  };
}
export default async function ClassPage({ params }: ClassPageProps) {
  const { classId } = params;
  const classData = await getClassById(Number(classId));
  console.log(classData)
  return (
    <div>
      <h1>جزئیات کلاس</h1>
      <p>کلاس: {classId}</p>
      <ClassHeader classData={classData}/>
    </div>
  );
}
