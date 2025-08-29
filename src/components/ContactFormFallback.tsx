import React, { useState, useCallback } from "react";
import "./ContactForm.css";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormState {
  success: boolean;
  error: string | null;
  isSubmitting: boolean;
  data: ContactFormData;
}

/**
 * Fallback Contact Form using standard React hooks (no React 19 features)
 */
export const ContactForm: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [state, setState] = useState<ContactFormState>({
    success: false,
    error: null,
    isSubmitting: false,
    data: formData,
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isSubmitting: true, error: null }));

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate success
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          success: true,
          data: formData,
        }));

        // Reset form after success
        setTimeout(() => {
          setFormData({ name: "", email: "", subject: "", message: "" });
          setState((prev) => ({ ...prev, success: false }));
        }, 3000);
      } catch {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: "Failed to send message. Please try again.",
        }));
      }
    },
    [formData]
  );

  return (
    <div className={`contact-form-wrapper ${className}`}>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={state.isSubmitting}
            placeholder="Your full name"
            aria-describedby="name-error"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={state.isSubmitting}
            placeholder="your.email@example.com"
            aria-describedby="email-error"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            disabled={state.isSubmitting}
            placeholder="What's this about?"
            aria-describedby="subject-error"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={state.isSubmitting}
            rows={6}
            placeholder="Tell me about your project or just say hello!"
            aria-describedby="message-error"
          />
        </div>

        <button type="submit" disabled={state.isSubmitting} className={`submit-btn ${state.isSubmitting ? "submitting" : ""}`} aria-describedby="submit-status">
          {state.isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {state.success && (
          <div className="form-message success" role="alert" id="submit-status">
            ✅ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {state.error && (
          <div className="form-message error" role="alert" id="submit-status">
            ❌ {state.error}
          </div>
        )}
      </form>
    </div>
  );
};
