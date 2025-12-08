"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormValues } from "../validation";
import { useCreateStudent } from "../hooks/useCreateStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import FormField from "@/components/form/FormField";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import Select from "@/components/form/Select";
import DateInput from "@/components/form/Date";
import useStudent from "../hooks/useStudent";
import Button from "@/components/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editId: number;
  initialValues?: Partial<StudentFormValues> & { id?: number };
};

const defaultValues = {
  first_name: "",
  last_name: "",
  id: null,
  date_of_birth: undefined,
  gender: undefined,
  email: "",
  phone: "",
  address: "",
  class_id: null,
};

export default function StudentForm({ onClose, editId }: Props) {
  const { data: studentData } = useStudent(editId);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    // defaultValues,
  });

  console.log(editId);

  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();

  useEffect(() => {
    // When modal opens with initialValues (edit), reset form
    if (studentData) {
      reset({
        ...studentData,
        date_of_birth: studentData.date_of_birth
          ? new Date(studentData.date_of_birth)
          : undefined,
      });
    } else {
      reset(defaultValues);
    }
  }, [studentData, reset]);

  const onSubmit = async (data: StudentFormValues) => {
    console.log(data);
    // const {id, ...rest} = data;
    // console.log(rest)
    try {
      if (editId) {
        await updateMutation.mutateAsync({
          id: editId,
          // date_of_birth: new Date(data?.date_of_birth)
          payload: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onClose();
    } catch (err) {
      // You can show toast here
      console.error(err);
    }
  };
  console.log(errors);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {editId ? "Edit Student" : "Add Student"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name={"first_name"}
            control={control}
            component={Input}
            label="نام"
          />
          <FormField
            name={"last_name"}
            control={control}
            component={Input}
            label=" نام خانوادگی "
          />
          <FormField
            name={"email"}
            control={control}
            component={Input}
            label="ایمیل"
          />
          <FormField
            name={"phone"}
            control={control}
            component={Input}
            label="تلفن"
          />
          <FormField
            name={"class"}
            control={control}
            component={Input}
            label="کلاس"
          />

          <FormField
            name={"gender"}
            control={control}
            component={Select}
            label="جنسیت"
            className=""
            options={[
              { value: "male", label: "مرد" },
              { value: "female", label: "زن" },
            ]}
          />

          <FormField
            name={"address"}
            control={control}
            component={Textarea}
            label="آدرس"
            className="resize-none"
          />
          <FormField
            name={"date_of_birth"}
            control={control}
            component={DateInput}
            label="تاریخ تولد"
            className="!dark:bg-dark-2"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            label="لغو"
            type="button"
            onClick={onClose}
            variant={"outlinePrimary"}
            shape={"rounded"}
            // className="px-4 py-2 border rounded"
          />

          <Button
            type="submit"
            label={editId ? "ذخیره" : "افزودن"}
            className=""
            variant={"primary"}
            shape={"rounded"}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
