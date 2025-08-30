import type { FC } from "react";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import { PortfolioProvider } from "./context/PortfolioContext";
import ResponsiveProvider from "./context/ResponsiveContext";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import "./App.css";

// Lazy load components for better performance
const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const ExperienceComponent = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

/**
 * Main app content wrapper with scroll animations
 */
const AppContent: FC = () => {
  useScrollAnimation();

  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
        </Suspense>
      </ErrorBoundary>

      <main role="main">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Projects />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ExperienceComponent />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

/**
 * Main App component with providers and error boundaries
 */
const App: FC = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to error reporting service in production
        console.error("Application Error:", error, errorInfo);
      }}
    >
      <ResponsiveProvider>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </ResponsiveProvider>
    </ErrorBoundary>
  );
};

export default App;
