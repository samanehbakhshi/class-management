"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/Button";
import * as Icons from "../"
import { PencilSquareIcon } from "@/assets/icon/Icons";

interface EditableCellProps<T> {
  rowId: number;
  value: T;
  onUpdate: (id: number, newValue: T) => void;
  renderDisplay?: (value: T) => React.ReactNode;
  renderEdit?: (value: T, onChange: (val: T) => void) => React.ReactNode;
}

export default function EditableCell<T>({
  rowId,
  value,
  onUpdate,
  renderDisplay,
  renderEdit,
}: EditableCellProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => onUpdate(rowId, localValue),
    onSuccess: () => {
      qc.invalidateQueries(["attendance"]);
      setIsEditing(false);
    },
  });

  return (
    <div>
      {!isEditing ? (
        <div className="flex items-center justify-between">
          <span>{renderDisplay ? renderDisplay(value) : value}</span>
          <Button
            label=""
            icon={  <PencilSquareIcon />}
            size="small"
            shape="rounded"
            onClick={() => setIsEditing(true)}
          />
           {/* <span role="button">
             <PencilSquareIcon />
            </span> */}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {renderEdit ? (
            renderEdit(localValue, setLocalValue)
          ) : (
            <input
              value={localValue as any}
              onChange={(e) => setLocalValue(e.target.value as any)}
            />
          )}
          <div className="flex gap-2">
            <Button
              label="لغو"
              size="small"
              variant="outlineDark"
              onClick={() => {
                setIsEditing(false);
                setLocalValue(value);
              }}
            />
            <Button
              label="ذخیره"
              size="small"
              variant="primary"
              onClick={() => mutation.mutate()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
