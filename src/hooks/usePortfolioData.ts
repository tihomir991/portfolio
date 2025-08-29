import { useState, useEffect } from "react";
import type { Project, Experience, ContactInfo, PersonalInfo } from "../types";

// Standard data fetching function without React 19 cache
const fetchPortfolioData = async (): Promise<{
  projects: Project[];
  experience: Experience[];
  contactInfo: ContactInfo;
  personalInfo: PersonalInfo;
}> => {
  // Simulate API call - in real app this would be actual API calls
  return new Promise((resolve) => {
    setTimeout(() => {
      // Import the static data - in real app this would be from API
      import("../data/portfolioData").then((data) => {
        resolve({
          projects: data.projects,
          experience: data.experience,
          contactInfo: data.contactInfo,
          personalInfo: data.personalInfo,
        });
      });
    }, 100); // Simulate network delay
  });
};

// Standard React hook using useState and useEffect
export const usePortfolioData = () => {
  const [data, setData] = useState<{
    projects: Project[];
    experience: Experience[];
    contactInfo: ContactInfo;
    personalInfo: PersonalInfo;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPortfolioData()
      .then((portfolioData) => {
        setData(portfolioData);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error("Failed to fetch portfolio data"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};

// Alternative hook for specific data slices
export const useProjectsData = () => {
  const { data, isLoading, error } = usePortfolioData();
  return {
    data: data?.projects || [],
    isLoading,
    error,
  };
};

export const usePersonalInfoData = () => {
  const { data, isLoading, error } = usePortfolioData();
  return {
    data: data?.personalInfo || null,
    isLoading,
    error,
  };
};
