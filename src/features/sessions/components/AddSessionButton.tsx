"use client"
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import SessionForm from "./SessionForm";

export default function AddSessionButton({ classId }: { classId: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      {/* Add Button */}
      <Button
        label="افزودن"
        className=""
        variant={"primary"}
        shape={"rounded"}
        // TODO: open modal
        onClick={() => {
          setModalOpen(true);
        }}
      />
         <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
              <SessionForm
              classId={classId}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                editId={undefined}
              />
            </Modal>
    </div>
  );
}
