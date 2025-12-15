
"use client";
import React, { useEffect } from "react";
import GeneralForm from "@/components/form/GeneralForm";
import { useCreateClass } from "../hooks/useCreateClass";
import { useUpdateClass } from "../hooks/useUpdateClass";
import useClass from "../hooks/useClass";
import { classSchema } from "../validation";


type Props = {
  onClose: () => void;
  editId: number;
};

const defaultValues = {
  name: "",
  teacher: "",
  id: undefined,
  session_count: "",
  start_date: undefined,
  start_time: undefined,
  subject: "",
  grade: "",
}; 

export default function ClassForm({ onClose, editId }: Props) {




//   console.log(classOptions)
   const classFormConfig = [
    { name: "name", label: "کلاس", type: "text", required: true },
    { name: "teacher", label: "نام معلم", type: "text", required: true },
    { name: "grade", label: "نمره", type: "text", required: true },
    { name: "subject", label: "موضوع", type: "text" },
    {
      name: "session_count",
      label: "تعداد جلسات",
      type: "number",
      required: true,
    },
    { name: "start_date", label: "تایخ شروع", type: "date", required: true },
    { name: "start_time", label: "زمان شروع", type: "time", required: true },
    
  ];


 

  const createMutation = useCreateClass();
  const updateMutation = useUpdateClass();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {editId ? "Edit Student" : "Add Student"}
      </h2>

      <GeneralForm
        config={classFormConfig}
        editId={editId}
        createItem={createMutation}
        updateItem={updateMutation}
        onClose={onClose}
        useGetItem={useClass}
        defaultValues={defaultValues}
        schema={classSchema}
      />
    </div>
  );
}
