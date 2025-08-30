import { useState, useEffect } from "react";

/**
 * Simplified hook that returns only mobile detection
 * @param mobileBreakpoint - Custom mobile breakpoint (default: 768px)
 * @returns boolean indicating if device is mobile
 */
export const useIsMobile = (mobileBreakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < mobileBreakpoint;
    }
    return false;
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [mobileBreakpoint]);

  return isMobile;
};

export default useIsMobile;
