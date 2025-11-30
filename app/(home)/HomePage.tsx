"use client";
import { useEffect, useState } from "react";
import { Student } from "@/src/types/student";
import { getStudents } from "@/src/features/students/api/getStudents";

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      console.log(data);
      setStudents(data as Student[]);
    };
    fetchStudents();
  }, []);
  return (
    <div>
      <ul>
        {students?.map((student) => (
          <li key={student.id}>
            {student.first_name} {student.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
