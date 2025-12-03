"use client";

import { useEffect } from "react";


export default function useClickOutSide(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;

      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
