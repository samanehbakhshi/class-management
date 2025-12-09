import React from "react";
import { Controller } from "react-hook-form";
import { required } from "zod/v4-mini";

type FormFieldProps = {
  name: string;
  control: any;
  label?: string;
  component: React.ComponentType<any>;
  rules?: any;
  defaultValue?: any;
  classNme?: string;
  [key: string]: any;
};

export default function FormField({
  name,
  control,
  label,
  component: Component,
  rules,
  defaultValue,
  className,
  ...rest
}: FormFieldProps) {
  console.log(rules)
  return (
    <div>
      {label && <label className="block mb-1">{rules && <span className="text-red-600 text-md">*</span>}{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <>
            <Component
              {...field}
              value={field.value ?? ""}
              {...rest}
              error={fieldState.error?.message}
              className={className}
              onChange={(val: any) => {
                console.log("[Component->onChange]", name, "val:",typeof val, );
                // اگر date picker است، ببین val چی هست
                field.onChange(val);
              }}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
