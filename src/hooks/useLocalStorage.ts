import { useState, useEffect, useCallback, useRef } from "react";

type Serializer<T> = {
  stringify: (value: T) => string;
  parse: (value: string) => T;
};

interface UseLocalStorageOptions<T> {
  serializer?: Serializer<T>;
  syncAcrossTabs?: boolean;
  onError?: (error: Error) => void;
}

/**
 * Advanced localStorage hook with type safety, error handling, and cross-tab synchronization
 */
export const useLocalStorage = <T>(key: string, initialValue: T, options: UseLocalStorageOptions<T> = {}) => {
  const { serializer = JSON, syncAcrossTabs = true, onError = console.error } = options;

  // Keep track of the key to handle key changes
  const keyRef = useRef(key);
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }

      return serializer.parse(item);
    } catch (error) {
      onError(error as Error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, serializer.stringify(valueToStore));
        }
      } catch (error) {
        onError(error as Error);
      }
    },
    [key, serializer, storedValue, onError]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      onError(error as Error);
    }
  }, [key, initialValue, onError]);

  // Check if value exists in localStorage
  const hasValue = useCallback(() => {
    try {
      if (typeof window === "undefined") {
        return false;
      }
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      onError(error as Error);
      return false;
    }
  }, [key, onError]);

  // Handle storage events for cross-tab synchronization
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === "undefined") {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = serializer.parse(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
          onError(error as Error);
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue, serializer, syncAcrossTabs, onError]);

  // Handle key changes
  useEffect(() => {
    if (keyRef.current !== key) {
      keyRef.current = key;

      try {
        if (typeof window !== "undefined") {
          const item = window.localStorage.getItem(key);
          if (item !== null) {
            setStoredValue(serializer.parse(item));
          } else {
            setStoredValue(initialValue);
          }
        }
      } catch (error) {
        onError(error as Error);
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue, serializer, onError]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    hasValue,
  } as const;
};

/**
 * Hook for managing user preferences with localStorage
 */
export const useUserPreferences = () => {
  interface UserPreferences {
    theme: "light" | "dark" | "auto";
    reducedMotion: boolean;
    language: string;
    fontSize: "small" | "medium" | "large";
  }

  const defaultPreferences: UserPreferences = {
    theme: "auto",
    reducedMotion: false,
    language: "en",
    fontSize: "medium",
  };

  const { value: preferences, setValue: setPreferences } = useLocalStorage("user-preferences", defaultPreferences, {
    syncAcrossTabs: true,
    onError: (error) => {
      console.error("Error managing user preferences:", error);
    },
  });

  const updatePreference = useCallback(
    <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
    },
    [setPreferences]
  );

  return {
    preferences,
    updatePreference,
    setPreferences,
  };
};
