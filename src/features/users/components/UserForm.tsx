"use client";
import React, { useEffect } from "react";
import GeneralForm from "@/components/form/GeneralForm";
import { UserSchema } from "../validation";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import useUser from "../hooks/useUser";


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

export default function UserForm({ onClose, editId }: Props) {
  //   console.log(classOptions)
  const classFormConfig = [
    { name: "first_name", label: "نام", type: "text", required: true },
    { name: "last_name", label: "نام خانوادگی", type: "text", required: true },
    { name: "emil", label: "ایمیل", type: "text", required: true },
    { name: "role", label: "سمت", type: "select", options: ["teacher"] },
    {
      name: "is_active",
      label: "فعال بودن",
      type: "check",
      required: true,
    },

  ];

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

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
        useGetItem={useUser}
        defaultValues={defaultValues}
        schema={UserSchema}
      />
    </div>
  );
}
