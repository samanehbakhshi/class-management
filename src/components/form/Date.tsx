import { cn } from "@/lib/utils/cn";
import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
type DateProps = {
  className?: string;
  error?: string;
  label?: string;
  onChange: (value: string) => void;
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function DateInput({
  className,
  error,
  label,
  value,
  onChange,
  ...props
}: DateProps) {
  const baseClasses = cn(
    " w-full rounded-[7px] dark:bg-dark border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-gray-6 dark:text-gray-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary flatpickr-input active",
    className,
  );
  return (
    <div>
      {label && <label className="font-medium text-sm">{label}</label>}
      <DatePicker
        {...props}
        value={
          value
            ? new DateObject({
                date: new Date(value), // میلادی
                calendar: persian,
                locale: persian_fa,
              })
            : ""
        }
        onChange={(d) => {
          onChange(d.toDate());
        }}
        format={"YYYY/MM/DD"}
        locale={persian_fa}
        calendar={persian}
        inputClass={baseClasses}
        className="bg-dark"
      />
      {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
    </div>
  );
}
