"use client";

import Button from "@/components/Button";
import React, { useEffect, useRef, useState } from "react";
import { updateSessionNote } from "../api/updateSessionNote";

interface Props {
  sessionId: number;
  note: string | null;
}

export default function SessionNote({ sessionId, note }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(note ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  const handleCancel = () => {
    setValue(note ?? "");
    setIsEditing(false);
  };

  const handleSave = () => {
    updateSessionNote(  sessionId, value );
    setIsEditing(false);
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 dark:bg-dark p-4">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-dark-7">
          📝 یادداشت جلسه
        </span>

        {!isEditing && (
          <Button
            label="ویرایش"
            size="small"
            shape="rounded"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>

      {/* Content */}
      {!isEditing ? (
        <p
          className={`whitespace-pre-line text-sm ${
            value ? "text-gray-800 dark:text-dark-7" : "text-gray-400 dark:text-dark-6 italic"
          }`}
        >
          {value || "یادداشتی ثبت نشده است"}
        </p>
      ) : (
        <>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full min-h-[100px] rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Actions */}
          <div className="mt-3 flex gap-3">
            <Button
              label="لغو"
              size="small"
              variant="outlineDark"
              onClick={handleCancel}
              className="text-gray-700"
            />
            <Button
              label="ذخیره"
              size="small"
              variant="primary"
              onClick={handleSave}
            />
          </div>
        </>
      )}
    </div>
  );
}
