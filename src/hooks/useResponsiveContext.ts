import { useContext } from "react";
import { ResponsiveContext } from "../context/ResponsiveContext";

/**
 * Hook to get only the isMobile boolean from ResponsiveContext
 * @returns boolean indicating if device is mobile
 * @throws Error if used outside of ResponsiveProvider
 */
export const useIsMobileContext = (): boolean => {
  const context = useContext(ResponsiveContext);

  if (context === undefined) throw new Error("useIsMobileContext must be used within a ResponsiveProvider");

  return context.isMobile;
};
