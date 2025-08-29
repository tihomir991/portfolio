import { useMemo, useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContextTypes";

/**
 * Enhanced hook using standard React patterns for context consumption
 * This demonstrates enhanced context consumption without React 19 use() hook
 */
export function useEnhancedPortfolioContext() {
  // Standard React useContext hook
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("useEnhancedPortfolioContext must be used within a PortfolioProvider");
  }

  // Enhanced context with computed values
  return useMemo(
    () => ({
      ...context,

      // Computed statistics
      stats: {
        totalProjects: context.projects.length,
        featuredProjects: context.projects.filter((p) => p.featured).length,
        experienceYears: context.experience.length,
      },

      // Enhanced getters
      getProjectsByTechnology: (tech: string) => context.projects.filter((p) => p.technologies.some((t) => t.toLowerCase().includes(tech.toLowerCase()))),

      getFeaturedProjects: () => context.projects.filter((p) => p.featured),
    }),
    [context]
  );
}

/**
 * Hook that combines multiple contexts and provides enhanced functionality
 * This shows how to compose context consumption with additional utilities
 */
export function useEnhancedPortfolio() {
  const portfolio = useEnhancedPortfolioContext();

  // Additional computed values for better developer experience
  return useMemo(
    () => ({
      ...portfolio,

      // Quick access properties
      isLoading: false, // Could be enhanced with actual loading state
      hasProjects: portfolio.stats.totalProjects > 0,
      hasExperience: portfolio.stats.experienceYears > 0,

      // Search functionality - using the enhanced getters
      searchProjects: (query: string) => {
        const lowercaseQuery = query.toLowerCase();
        return portfolio
          .getFeaturedProjects()
          .filter(
            (project) =>
              project.title.toLowerCase().includes(lowercaseQuery) ||
              project.description.toLowerCase().includes(lowercaseQuery) ||
              project.technologies.some((tech) => tech.toLowerCase().includes(lowercaseQuery))
          );
      },

      // Validation utilities
      validation: {
        isValidProject: (project: unknown): project is { title: string; description: string; technologies: string[] } => {
          if (!project || typeof project !== "object") return false;
          const p = project as Record<string, unknown>;
          return typeof p.title === "string" && typeof p.description === "string" && Array.isArray(p.technologies);
        },

        isValidSkill: (skill: unknown): skill is { name: string; level: number } => {
          if (!skill || typeof skill !== "object") return false;
          const s = skill as Record<string, unknown>;
          return typeof s.name === "string" && typeof s.level === "number" && s.level >= 0 && s.level <= 100;
        },
      },
    }),
    [portfolio]
  );
}
