import { useEffect, useState } from "react";
export const MOBILE_BEAKPOINT = 850;
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BEAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BEAKPOINT);
    };
    // Set initial value 
    setIsMobile(window.innerWidth < MOBILE_BEAKPOINT);

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
