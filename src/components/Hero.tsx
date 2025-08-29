import type { FC } from "react";
import { memo, useMemo, useCallback, startTransition } from "react";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import { useImageLoading } from "../hooks/useImageLoading";
import { usePortfolio } from "../hooks/usePortfolio";
import "./Hero.css";

interface HeroActionButtonProps {
  onClick: () => void;
  variant: "primary" | "secondary";
  ariaLabel: string;
  children: React.ReactNode;
}

/**
 * Memoized action button component with React 19 optimizations
 */
const HeroActionButton: FC<HeroActionButtonProps> = memo(({ onClick, variant, ariaLabel, children }) => {
  // React 19: ref as a callback for better performance
  const buttonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (node) {
        // Enhanced focus management with React 19
        node.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            startTransition(() => {
              onClick();
            });
          }
        });
      }
    },
    [onClick]
  );

  const handleClick = () => {
    // React 19: startTransition for non-urgent updates
    startTransition(() => {
      onClick();
    });
  };

  return (
    <button ref={buttonRef} onClick={handleClick} className={`btn btn-${variant}`} aria-label={ariaLabel} type="button">
      {children}
    </button>
  );
});

HeroActionButton.displayName = "HeroActionButton";

interface HeroAvatarProps {
  src: string;
  alt: string;
  fallbackText: string;
}

/**
 * Optimized avatar component with lazy loading and error handling
 */
const HeroAvatar: FC<HeroAvatarProps> = memo(({ src, alt, fallbackText }) => {
  const {
    src: imageSrc,
    isLoading,
    hasError,
    handleLoad,
    handleError,
    imgRef,
  } = useImageLoading(src, {
    lazy: true,
    onError: (error) => {
      console.warn("Hero avatar failed to load:", error);
    },
  });

  if (hasError || !imageSrc) {
    return (
      <div className="avatar-placeholder" role="img" aria-label={alt}>
        {fallbackText}
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="avatar-loading" aria-label="Loading avatar">
          <div className="loading-spinner" />
        </div>
      )}
      <img ref={imgRef} src={imageSrc} alt={alt} onLoad={handleLoad} onError={handleError} className={isLoading ? "loading" : ""} loading="lazy" />
    </>
  );
});

HeroAvatar.displayName = "HeroAvatar";

/**
 * Enhanced Hero component with performance optimizations and accessibility improvements
 */
const Hero: FC = memo(() => {
  const { scrollToElement } = useScrollNavigation();
  const { personalInfo } = usePortfolio();

  // Memoize handlers to prevent unnecessary re-renders
  const handleViewWork = useMemo(() => () => scrollToElement("projects"), [scrollToElement]);

  const handleGetInTouch = useMemo(() => () => scrollToElement("contact"), [scrollToElement]);

  // Memoize avatar fallback text
  const avatarFallback = useMemo(() => {
    if (!personalInfo?.firstName || !personalInfo?.lastName) {
      return "JD";
    }
    return `${personalInfo.firstName[0]}${personalInfo.lastName[0]}`;
  }, [personalInfo?.firstName, personalInfo?.lastName]);

  // Use real data from context with fallbacks
  const heroData = useMemo(
    () => ({
      name: personalInfo?.fullName || "John Doe",
      title: personalInfo?.title || "Frontend Developer",
      bio:
        personalInfo?.bio ||
        "I create beautiful, responsive, and user-friendly web applications using modern technologies like React, TypeScript, and CSS. Passionate about clean code and exceptional user experiences.",
      avatar: personalInfo?.avatar || "/placeholder-avatar.jpg",
      avatarAlt: personalInfo?.avatarAlt || `${personalInfo?.fullName || "John Doe"} - ${personalInfo?.title || "Frontend Developer"}`,
    }),
    [personalInfo]
  );

  return (
    <section id="home" className="hero" aria-labelledby="hero-title" role="banner">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 id="hero-title" className="hero-title">
              Hi, I'm <span className="hero-name">{heroData.name}</span>
            </h1>
            <h2 className="hero-subtitle">{heroData.title}</h2>
            <p className="hero-description">{heroData.bio}</p>
            <div className="hero-buttons" role="group" aria-label="Hero actions">
              <HeroActionButton onClick={handleViewWork} variant="primary" ariaLabel="Navigate to projects section to view my work">
                View My Work
              </HeroActionButton>
              <HeroActionButton onClick={handleGetInTouch} variant="secondary" ariaLabel="Navigate to contact section to get in touch">
                Get In Touch
              </HeroActionButton>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar">
              <HeroAvatar src={heroData.avatar} alt={heroData.avatarAlt} fallbackText={avatarFallback} />
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" role="img" aria-label="Scroll down to see more content">
          <div className="scroll-arrow" aria-hidden="true">
            ↓
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
