import React from "react";
import useClickOutSide from "../hooks/useClickOutSide";
import { useRef } from "react";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutSide(ref, onClose);
  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        ref={ref}
        className="w-full max-w-2xl bg-white rounded shadow-lg p-6 flex flex-col gap-2 items-end"
      >
        <button onClick={onClose} className="text-red-600 font-bold text-xl ">
          x
        </button>

        {children}
      </div>
    </div>
  );
}
