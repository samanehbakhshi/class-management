"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormValues } from "../validation";
import { useCreateStudent } from "../hooks/useCreateStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<StudentFormValues> & { id?: number };
};

export default function StudentForm({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      id: "",
      date_of_birth: "",
      gender: undefined,
      email: "",
      phone: "",
      address: "",
      class_id: undefined,
      ...initialValues,
    },
  });

  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();

  useEffect(() => {
    // When modal opens with initialValues (edit), reset form
    if (isOpen) {
      reset({
        first_name: initialValues?.first_name ?? "",
        last_name: initialValues?.last_name ?? "",
        id: initialValues?.id ?? "",
        date_of_birth: initialValues?.date_of_birth ?? "",
        gender: (initialValues?.gender as any) ?? undefined,
        email: initialValues?.email ?? "",
        phone: initialValues?.phone ?? "",
        address: initialValues?.address ?? "",
        class_id: initialValues?.class_id ?? undefined,
      });
    }
  }, [isOpen, initialValues, reset]);

  const onSubmit = async (data: StudentFormValues) => {
    try {
      if (initialValues?.id) {
        await updateMutation.mutateAsync({
          id: initialValues.id,
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



  return (

     <div>
        <h2 className="text-lg font-semibold mb-4">
          {initialValues?.id ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">First name</label>
              <input
                {...register("first_name")}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.first_name && (
                <p className="text-xs text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm">Last name</label>
              <input
                {...register("last_name")}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.last_name && (
                <p className="text-xs text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm">Student ID</label>
              <input
                {...register("id")}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Date of birth</label>
              <input
                type="date"
                {...register("date_of_birth")}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Gender</label>
              <select
                {...register("gender")}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Phone</label>
              <input
                {...register("phone")}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Class</label>
              <input
                type="number"
                {...register("class_id", { valueAsNumber: true })}
                className="w-full border px-2 py-1 rounded"
              />
              {/* Ideally replace with select populated from classes via useFilterOptions */}
            </div>

            <div className="col-span-2">
              <label className="text-sm">Address</label>
              <input
                {...register("address")}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                createMutation.isLoading ||
                updateMutation.isLoading
              }
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {initialValues?.id ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </div>

  );
}
