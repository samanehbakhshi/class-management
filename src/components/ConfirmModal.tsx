"use client";

import React from "react";
import Modal from "./Modal";
interface ConfirmModalProps {
    isOpen: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
    isOpen,
  title = "Are you sure?",
  description = "",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
    if (!isOpen) return null;

  return (

    <Modal isOpen={isOpen} onClose={onCancel}>
      <div>
        <div className="flex justify-end gap-2">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          {description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
