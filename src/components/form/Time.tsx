import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker, { DateObject } from "react-multi-date-picker";
type TimeProps = {
  onChange: (value: string) => string;
  value: string;
  className?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function Time({
  className,
  error,
  onChange,
  value,
  ...props
}: TimeProps) {
  const baseClasses =
    "w-full rounded-lg placeholder:text-right border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white";
  // Convert backend value to DateObject
  const dateObjectValue = value
    ? (() => {
        const [h, m, s] = value?.split(":").map(Number);
        return new DateObject({
          year: 1970,
          month: 1,
          day: 1,
          hour: h,
          minute: m,
          second: s,
        });
      })()
    : null;
  return (
    <DatePicker
      inputClass={cn(baseClasses, className)}
      disableDayPicker
        format="HH:mm:ss"
    //   format="MM/DD/YYYY HH:mm:ss"
      plugins={[<TimePicker />]}
      {...props}
      onChange={(dateObject) => {
        if (!dateObject) return;
        const timeString = dateObject.format("HH:mm:ss");
        onChange(timeString); // always string
      }}
      value={dateObjectValue}
    //   locale={persian_fa}
    //   calendar={persian}
      className="bg-dark"
    />
  );
}
