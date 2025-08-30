import { useState, useEffect } from "react";

interface UseActiveSectionOptions {
  sections?: string[];
  scrollOffset?: number;
  scrollThreshold?: number;
}

interface UseActiveSectionReturn {
  isScrolled: boolean;
  activeSection: string;
}

/**
 * Custom hook for tracking active section based on scroll position
 * and determining if the page has been scrolled beyond a threshold
 */
export const useActiveSection = (options: UseActiveSectionOptions = {}): UseActiveSectionReturn => {
  const { sections = ["home", "about", "projects", "experience", "contact"], scrollOffset = 100, scrollThreshold = 50 } = options;

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0] || "home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Update scrolled state
      setIsScrolled(scrollY > scrollThreshold);

      // Update active section based on scroll position
      const scrollPosition = scrollY + scrollOffset;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Call once to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, scrollOffset, scrollThreshold]);

  return {
    isScrolled,
    activeSection,
  };
};
