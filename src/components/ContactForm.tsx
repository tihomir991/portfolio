import { useState, useId } from "react";
import type { FC, FormEvent } from "react";
import "./ContactForm.css";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormState {
  status: "idle" | "pending" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactFormData, string>>;
}

// Standard async form submission function
async function submitContactForm(data: ContactFormData): Promise<ContactFormState> {
  // Validation
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      message: "Please fix the errors below",
    };
  }

  // Simulate API call
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional failures for demo
        if (Math.random() > 0.8) {
          reject(new Error("Network error"));
        } else {
          resolve(data);
        }
      }, 1000);
    });

    return {
      status: "success",
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      status: "error",
      message: "Sorry, there was an error sending your message. Please try again.",
    };
  }
}

interface ContactFormProps {
  className?: string;
}

/**
 * Standard React Contact Form using useState and form handling
 */
export const ContactForm: FC<ContactFormProps> = ({ className = "" }) => {
  const baseId = useId();
  const [state, setState] = useState<ContactFormState>({
    status: "idle",
  });
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (state.errors?.[name as keyof ContactFormData]) {
      setState((prev) => ({
        ...prev,
        errors: prev.errors ? { ...prev.errors, [name]: undefined } : undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setState({
      status: "pending",
      message: "Sending your message...",
    });

    try {
      const result = await submitContactForm(formData);
      setState(result);

      if (result.status === "success") {
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      setState({
        status: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const getFieldError = (field: keyof ContactFormData) => {
    return state.errors?.[field];
  };

  const isFieldInvalid = (field: keyof ContactFormData) => {
    return Boolean(getFieldError(field));
  };

  const isPending = state.status === "pending";

  return (
    <form onSubmit={handleSubmit} className={`contact-form ${className}`} noValidate>
      <div className="form-group">
        <label htmlFor={`${baseId}-name`} className="form-label">
          Name{" "}
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <input
          type="text"
          id={`${baseId}-name`}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`form-input ${isFieldInvalid("name") ? "error" : ""}`}
          aria-invalid={isFieldInvalid("name")}
          aria-describedby={isFieldInvalid("name") ? `${baseId}-name-error` : undefined}
          disabled={isPending}
          required
        />
        {isFieldInvalid("name") && (
          <div id={`${baseId}-name-error`} className="form-error" role="alert">
            {getFieldError("name")}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor={`${baseId}-email`} className="form-label">
          Email{" "}
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <input
          type="email"
          id={`${baseId}-email`}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`form-input ${isFieldInvalid("email") ? "error" : ""}`}
          aria-invalid={isFieldInvalid("email")}
          aria-describedby={isFieldInvalid("email") ? `${baseId}-email-error` : undefined}
          disabled={isPending}
          required
        />
        {isFieldInvalid("email") && (
          <div id={`${baseId}-email-error`} className="form-error" role="alert">
            {getFieldError("email")}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor={`${baseId}-message`} className="form-label">
          Message{" "}
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          className={`form-textarea ${isFieldInvalid("message") ? "error" : ""}`}
          aria-invalid={isFieldInvalid("message")}
          aria-describedby={isFieldInvalid("message") ? `${baseId}-message-error` : undefined}
          disabled={isPending}
          required
        />
        {isFieldInvalid("message") && (
          <div id={`${baseId}-message-error`} className="form-error" role="alert">
            {getFieldError("message")}
          </div>
        )}
      </div>

      <button type="submit" className={`btn btn-primary ${isPending ? "loading" : ""}`} disabled={isPending} aria-describedby={`${baseId}-form-status`}>
        {isPending ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {state.message && (
        <div id={`${baseId}-form-status`} className={`form-message ${state.status}`} role="alert" aria-live="polite">
          {state.message}
        </div>
      )}
    </form>
  );
};
