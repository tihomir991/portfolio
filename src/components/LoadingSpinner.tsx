import type { FC } from "react";
import "./LoadingSpinner.css";

/**
 * Loading spinner component for Suspense fallbacks
 */
const LoadingSpinner: FC = () => (
  <div className="loading-container" role="status" aria-label="Loading content">
    <div className="loading-spinner" />
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;
