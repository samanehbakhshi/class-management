import React from 'react'
import { useStudents } from '../hooks/useStudents';
import { Student } from '@/src/types/student';

export default function StudentsTable({students, isError, isLoading, setModalOpen, setEditing} ) {



  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  if (!students || students.length === 0) return <p>No students found.</p>;



  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">

            <th className="p-2 text-gray-800">Row</th>
            <th className="p-2 text-gray-800">Full Name</th>
            <th className="p-2 text-gray-800">Student ID</th>
            <th className="p-2 text-gray-800">Email</th>
            <th className="p-2 text-gray-800">Phone</th>
            <th className="p-2 text-gray-800">Gender</th>
            <th className="p-2 text-gray-800">DOB</th>
            <th className="p-2 text-gray-800">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s : Student, index: number) => (
            <tr key={s.id} className="border-b">

              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                {s.first_name} {s.last_name}
              </td>
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.national_id}</td>
              <td className="p-2">{s.phone}</td>
              <td className="p-2">{s.phone}</td>
              <td className="p-2">{s.province}</td>

              <td className="p-2">
                <button className="text-blue-500 mr-2" onClick={() => {
                   setEditing(s); 
                   setModalOpen(true)
                  }
                   }>Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}
