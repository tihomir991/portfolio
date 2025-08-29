import type { FC } from "react";
import { memo } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import { ContactForm } from "./ContactFormFallback";
import "./Contact.css";
import "./ContactForm.css";

/**
 * Enhanced Contact component with React 19 features
 */
const Contact: FC = memo(() => {
  const { contactInfo } = usePortfolio();

  return (
    <section id="contact" className="contact">
      <div className="contact-container container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gaming-title">Contact Protocol</h2>
          <p className="section-subtitle gaming-subtitle">Initiate communication channel</p>
        </div>

        <div className="contact-content">
          <div className="contact-info glass-card animate-on-scroll">
            <div className="contact-intro">
              <h3 className="gaming-subtitle">Let's Start a Mission</h3>
              <p>
                Ready to collaborate on cutting-edge projects? Whether you need a frontend warrior or want to discuss the latest tech innovations, I'm here to help bring your
                digital visions to life.
              </p>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </div>
              </div>

              {contactInfo.phone && (
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                  </div>
                </div>
              )}

              {contactInfo.linkedin && (
                <div className="contact-item">
                  <div className="contact-icon">💼</div>
                  <div className="contact-text">
                    <h4>LinkedIn</h4>
                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                      Connect with me
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.github && (
                <div className="contact-item">
                  <div className="contact-icon">🐱</div>
                  <div className="contact-text">
                    <h4>GitHub</h4>
                    <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
                      View my code
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="availability">
              <div className="availability-status">
                <div className="status-indicator available"></div>
                <span>Available for new projects</span>
              </div>
              <p>Currently accepting freelance missions and full-time quests</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="contact-form-container glass-card animate-on-scroll">
            <ContactForm className="enhanced-contact-form" />
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
