import React, { createContext, useMemo } from "react";
import { useIsMobile } from "../hooks/useResponsive";
import type { ResponsiveContextType, ResponsiveProviderProps } from "./ResponsiveContextTypes";

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  const isMobile = useIsMobile();

  const contextValue = useMemo<ResponsiveContextType>(
    () => ({
      isMobile,
    }),
    [isMobile]
  );

  return <ResponsiveContext.Provider value={contextValue}>{children}</ResponsiveContext.Provider>;
};

export { ResponsiveContext };
export default ResponsiveProvider;
