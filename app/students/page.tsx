"use client"
import { useStudents } from "@/src/features/students/hooks/useStudents"

export default function StudentPage(){
    const {data: students} = useStudents({page: 1, limit: 10})

    console.log(students?.data, students?.total)
    return(
        <div></div>
    )
}