import { useCallback, useRef } from "react";

interface ScrollToOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

interface UseScrollNavigationReturn {
  scrollToElement: (elementId: string, options?: ScrollToOptions) => void;
  scrollToTop: () => void;
  isScrolling: React.MutableRefObject<boolean>;
}

/**
 * Custom hook for smooth scroll navigation with enhanced features
 * Provides utilities for scrolling to elements and managing scroll state
 */
export const useScrollNavigation = (): UseScrollNavigationReturn => {
  const isScrolling = useRef<boolean>(false);

  const scrollToElement = useCallback((elementId: string, options: ScrollToOptions = {}) => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    // Prevent multiple rapid scroll operations
    if (isScrolling.current) {
      return;
    }

    isScrolling.current = true;

    const defaultOptions: ScrollToOptions = {
      behavior: "smooth",
      block: "start",
      inline: "nearest",
      ...options,
    };

    try {
      element.scrollIntoView(defaultOptions);

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000); // Approximate scroll animation duration
    } catch (error) {
      console.error("Error during scroll navigation:", error);
      isScrolling.current = false;
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (isScrolling.current) {
      return;
    }

    isScrolling.current = true;

    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    } catch (error) {
      console.error("Error during scroll to top:", error);
      isScrolling.current = false;
    }
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    isScrolling,
  };
};
