'use client';
import { useEffect, useState } from "react";
import { getStudents } from "../src/services/apiStudents";
import { Student } from "@/src/types/student";

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      console.log(data)
      setStudents(data as Student[]);
    };
    fetchStudents();
  }, []);
  return (
    <div>
      <ul>
        {students?.map((student) => (
          <li key={student.id}>{student.first_name} {student.last_name}</li>
        ))}
      </ul>
    </div>
  );
}
