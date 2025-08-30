import { useCallback, useRef, useEffect, useState } from "react";

interface ScrollToOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

interface UseScrollNavigationOptions {
  activeSection?: string;
  autoScrollToActiveSection?: boolean;
}

interface UseScrollNavigationReturn {
  scrollToElement: (elementId: string, options?: ScrollToOptions) => void;
  scrollToTop: () => void;
  ensureActiveSectionInView: () => void;
  isScrolling: React.MutableRefObject<boolean>;
  setSelectedNavItem: React.Dispatch<React.SetStateAction<string>>;
  selectedNavItem: string;
}

/**
 * Custom hook for smooth scroll navigation with enhanced features
 * Provides utilities for scrolling to elements and managing scroll state
 */
export const useScrollNavigation = (options: UseScrollNavigationOptions = {}): UseScrollNavigationReturn => {
  const { activeSection, autoScrollToActiveSection = false } = options;
  const [selectedNavItem, setSelectedNavItem] = useState<string>(activeSection || "home");
  const isScrolling = useRef<boolean>(false);
  const userNavigatedRef = useRef<boolean>(false);
  const pendingScrollTarget = useRef<string | null>(null);

  // Sync selectedNavItem with activeSection
  useEffect(() => {
    if (activeSection && activeSection !== selectedNavItem && !userNavigatedRef.current) {
      // For natural scrolling, sync immediately
      setSelectedNavItem(activeSection);
    }
  }, [activeSection, selectedNavItem]);

  const scrollToElement = useCallback((elementId: string, options: ScrollToOptions = {}) => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    // If already scrolling, queue this target for later
    if (isScrolling.current) {
      pendingScrollTarget.current = elementId;
      return;
    }

    isScrolling.current = true;
    pendingScrollTarget.current = null;

    const defaultOptions: ScrollToOptions = {
      behavior: "smooth",
      block: "start",
      inline: "nearest",
      ...options,
    };

    try {
      element.scrollIntoView(defaultOptions);

      // Reset scrolling flag and check for pending targets
      setTimeout(() => {
        isScrolling.current = false;

        // If there's a pending target, scroll to it
        if (pendingScrollTarget.current) {
          const targetId = pendingScrollTarget.current;
          pendingScrollTarget.current = null;
          scrollToElement(targetId, options);
        }
      }, 1000); // Approximate scroll animation duration
    } catch (error) {
      console.error("Error during scroll navigation:", error);
      isScrolling.current = false;
      pendingScrollTarget.current = null;
    }
  }, []);

  const ensureActiveSectionInView = useCallback(() => {
    if (!activeSection) return;

    const element = document.getElementById(activeSection);
    if (!element) return;

    // Check if element is already in view
    const rect = element.getBoundingClientRect();
    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isInView && !isScrolling.current) {
      scrollToElement(activeSection, {
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [activeSection, scrollToElement]);

  // Auto-scroll to active section if autoScrollToActiveSection is enabled
  useEffect(() => {
    if (autoScrollToActiveSection && activeSection) {
      ensureActiveSectionInView();
    }
  }, [activeSection, autoScrollToActiveSection, ensureActiveSectionInView]);

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

  // Wrapper for setSelectedNavItem that marks user-initiated navigation
  const handleSetSelectedNavItem = useCallback(
    (value: React.SetStateAction<string>) => {
      userNavigatedRef.current = true;
      const currentValue = typeof value === "function" ? value(selectedNavItem) : value;

      // Always update the selected nav item immediately for UI responsiveness
      setSelectedNavItem(currentValue);

      // If the new value is different from activeSection, trigger scroll
      if (currentValue !== activeSection) {
        scrollToElement(currentValue);
      }

      // Reset user navigation flag after a short delay to allow natural sync again
      setTimeout(() => {
        userNavigatedRef.current = false;
      }, 100);
    },
    [selectedNavItem, activeSection, scrollToElement]
  );

  return {
    scrollToElement,
    scrollToTop,
    ensureActiveSectionInView,
    isScrolling,
    setSelectedNavItem: handleSetSelectedNavItem,
    selectedNavItem,
  };
};
