"use client";
import React, { useEffect } from "react";
import { studentSchema, type StudentFormValues } from "../validation";
import { useCreateStudent } from "../hooks/useCreateStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import GeneralForm from "@/components/form/GeneralForm";
import useStudent from "../hooks/useStudent";
import { useClasses } from "@/features/classes/hooks/useClasses";


type Props = {
  onClose: () => void;
  editId: number;
};

const defaultValues = {
  first_name: "",
  last_name: "",
  id: "",
  date_of_birth: undefined,
  gender: undefined,
  email: "",
  phone: "",
  address: "",
  class_id: null,
} ;

export default function StudentForm({ onClose, editId }: Props) {
  const {data : classes } =useClasses({});
  const classOptions = classes?.data?.map((item) =>{
    return {
      value: item.id,
       label: item.name
      }
  });

   const studentFormConfig = [
    { name: "first_name", label: "نام", type: "text", required: true },
    { name: "last_name", label: "نام خانوادگی", type: "text", required: true },
    { name: "email", label: "ایمیل", type: "email", required: true },
    { name: "phone", label: "تلفن", type: "text" },
    {
      name: "gender",
      label: "جنسیت",
      type: "select",
      required: true,
      options: [
        { value: "male", label: "مرد" },
        { value: "female", label: "زن" },
      ],
    },
    { name: "date_of_birth", label: "تاریخ تولد", type: "date", required: true },
    { name: "class_id", label: "کلاس", type: "select", options: classOptions },
    { name: "address", label: "آدرس", type: "textarea" },
  ];


  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();


  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">
        {editId ? "ویرایش دانش آموز" : "افزودن دانش آموز"}
      </h2>

      <GeneralForm
        config={studentFormConfig}
        editId={editId}
        createItem={createMutation}
        updateItem={updateMutation}
        onClose={onClose}
        useGetItem={useStudent}
        schema={studentSchema}
        defaultValues={defaultValues}
      />
    </div>
  );
}
