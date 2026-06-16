"use client";
import React, { useEffect } from "react";
import GeneralForm from "@/components/form/GeneralForm";
import { useCreateUser } from "@/features/users/hooks/useCreateUser";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import { UserSchema } from "@/features/users/validation";
import useTeacher from "../hooks/useTeacher";

type Props = {
  onClose: () => void;
  editId: number;
};

const defaultValues = {
  first_name: "",
  last_name: "",
  role: "",
  email: "",
  isActive: true,
};

export default function TeacherForm({ onClose, editId }: Props) {
  const classFormConfig = [
    { name: "first_name", label: "نام", type: "text", required: true },
    { name: "last_name", label: "نام خانوادگی", type: "text", required: true },
    { name: "email", label: "ایمیل", type: "text", required: true },
    {
      name: "is_active",
      label: "فعال بودن",
      type: "checkbox",
      required: true,
    },
  ];
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-7 dark:text-gray-3">
        {editId ? "ویرایش معلم" : "افزودن معلم"}
      </h2>

      <GeneralForm
        config={classFormConfig}
        editId={editId}
        createItem={createMutation}
        updateItem={updateMutation}
        onClose={onClose}
        useGetItem={useTeacher}
        defaultValues={defaultValues}
        schema={UserSchema}
      />
    </div>
  );
}
