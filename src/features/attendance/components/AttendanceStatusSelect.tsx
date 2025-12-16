"use client";

import { AttendanceStatus } from "@/types/attendance";

interface AttendanceStatusSelectProps {
  value: AttendanceStatus;
  onChange: (status: AttendanceStatus) => void;
  disabled?: boolean;
}

const options: { label: string; value: AttendanceStatus }[] = [
  { label: "حاضر", value: "present" },
  { label: "غایب", value: "absent" },
  { label: "دیرآمده", value: "late" },
  { label: "موجه", value: "excused" },
];

export default function AttendanceStatusSelect({
  value,
  onChange,
  disabled,
}: AttendanceStatusSelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as AttendanceStatus)}
      className="
        border rounded px-2 py-1 text-sm
        
        focus:outline-none focus:ring-2 focus:ring-blue-500
        disabled:opacity-50
      "
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-gray-200 dark:bg-dark">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
