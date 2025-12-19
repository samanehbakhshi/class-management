"use client";
import React, { useEffect } from "react";
import GeneralForm from "@/components/form/GeneralForm";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import useUser from "../hooks/useUser";
import { useUserRole } from "../hooks/useUserRole";
import { UserSchema } from "../validation";

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
}

export default function UserForm({ onClose, editId }: Props) {
  //   console.log(classOptions)
  const { data: roleList } = useUserRole();

  const roleLables = (role: string) => {
    if (role === "teacher") return "معلم";
    if (role === "student") return "دانش آموز";
    if (role === "admin") return "ادمین";
  };

    const roleOptions = roleList?.map((item) => {
      return {
        value: item.role,
        label: roleLables(item.role),
      };
    });

  const classFormConfig = [
    { name: "first_name", label: "نام", type: "text", required: true },
    { name: "last_name", label: "نام خانوادگی", type: "text", required: true },
    { name: "email", label: "ایمیل", type: "text", required: true },
    { name: "role", label: "سمت", type: "select", options: roleOptions },
    {
      name: "is_active",
      label: "فعال بودن",
      type: "checkbox",
      required: true,
    },
  ];
console.log(roleOptions, roleList)
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {editId ? "ویرایش کاربر" : "افزودن کاربر"}
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
