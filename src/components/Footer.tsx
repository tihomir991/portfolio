import { usePortfolio } from "../hooks/usePortfolio";
import "./Footer.css";

const Footer = () => {
  const { contactInfo } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">John Doe</h3>
            <p className="footer-description">Frontend Developer passionate about creating beautiful, functional, and user-friendly web experiences.</p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-links">
              {contactInfo.github && (
                <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub Profile">
                  <span className="social-icon">🐱</span>
                  GitHub
                </a>
              )}
              {contactInfo.linkedin && (
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn Profile">
                  <span className="social-icon">💼</span>
                  LinkedIn
                </a>
              )}
              <a href={`mailto:${contactInfo.email}`} className="social-link" aria-label="Send Email">
                <span className="social-icon">📧</span>
                Email
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Let's Work Together</h4>
            <p className="footer-cta">Have a project in mind? Let's discuss how we can bring your ideas to life.</p>
            <a
              href="#contact"
              className="footer-btn"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© {currentYear} John Doe. All rights reserved.</p>
            <p className="built-with">Built with React, TypeScript & ❤️</p>
            <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
