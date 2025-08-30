import React, { useState, useEffect } from "react";
import "./Header.css";
import { useScrollNavigation } from "../hooks/useScrollNavigation";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollToElement } = useScrollNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    scrollToElement(sectionId, {
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const navItems = [
    { id: "home", label: "INITIALIZE", number: "01" },
    { id: "about", label: "PROFILE", number: "02" },
    { id: "projects", label: "MISSIONS", number: "03" },
    { id: "experience", label: "ACHIEVEMENTS", number: "04" },
    { id: "contact", label: "CONNECT", number: "05" },
  ];

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">
        <div className="header__logo">
          <div className="logo__container">
            <div className="logo__icon">
              <div className="logo__hexagon">
                <div className="hexagon__inner">
                  <span className="hexagon__symbol">{"{"}</span>
                </div>
              </div>
              <div className="logo__circuits">
                <div className="circuit circuit--1"></div>
                <div className="circuit circuit--2"></div>
                <div className="circuit circuit--3"></div>
              </div>
            </div>
            <div className="logo__text">
              <span className="logo__name">
                <span className="name__primary">T.T</span>
                <span className="name__separator">.</span>
                <span className="name__secondary">Dev</span>
              </span>
              <span className="logo__tagline">Frontend Developer</span>
            </div>
          </div>
          <div className="logo__energy">
            <div className="energy__pulse"></div>
            <div className="energy__wave"></div>
          </div>
        </div>

        <nav className="header__nav">
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id} className="nav__item">
                <button
                  onClick={() => handleNavigateToSection(item.id)}
                  className={`nav__link ${activeSection === item.id ? "nav__link--active" : ""}`}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  <span className="nav__number">{item.number}</span>
                  <span className="nav__text">{item.label}</span>
                  <div className="nav__glow"></div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="header__grid"></div>
      <div className="header__particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </header>
  );
};

export default Header;
