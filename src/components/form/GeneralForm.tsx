"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import Textarea from "./Textarea";
import Select from "./Select";
import DateInput from "./Date";
import Input from "./Input";
import Button from "../Button";
import { FormConfig } from "@/types/formTypes";
import { z } from "zod";
import Time from "./Time";
import NumberInput from "./NumberInput";
interface GeneralFormProps<TValues> {
  config: FormConfig;
  useGetItem: (id: number | null) => { data?: TValues } | void;
  editId: number | null;
  onClose: () => void;
  createItem: { mutateAsync: (values: TValues) => Promise<any> };
  updateItem: {
    mutateAsync: (payload: { id: number; values: TValues }) => Promise<any>;
  };
  schema: z.ZodSchema<TValues>;
  defaultValues?: TValues;
  extraCreatePayload?: Partial<TValues>;
}

export default function GeneralForm<TValues>({
  config,
  useGetItem,
  editId,
  onClose,
  createItem,
  updateItem,
  schema,
  defaultValues,
  extraCreatePayload,
}: GeneralFormProps<TValues>) {
  // Fetch existing data when editId exists
  const result = useGetItem(editId);
  const data = result?.data;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = async (values: TValues) => {
    const {id, ...rest} = values;

    const payload = {...rest, ...extraCreatePayload}
    editId
      ? await updateItem.mutateAsync({ id: id, payload: rest })
      : await createItem.mutateAsync(payload);
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            control={control}
            component={
              field.type === "textarea"
                ? Textarea
                : field.type === "select"
                ? Select
                : field.type === "date"
                ? DateInput
                : field.type === "time"
                ? Time 
                :field.type === "number"
                ? NumberInput
                : Input
            }
            label={field.label}
            options={field.options}
            // rules={field.required ? { required: true } : undefined}
          />
        ))}
      </div>
      <div className="flex justify-end gap-3 mt-8">
        <Button
          type="button"
          onClick={onClose}
          label="لغو"
          variant="outlinePrimary"
          shape="rounded"
        />
        <Button
          shape="rounded"
          type="submit"
          label={editId ? "ذخیره" : "افزودن"}
        />
      </div>
    </form>
  );
}
