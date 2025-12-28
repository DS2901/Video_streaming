import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Developer.css";
import Toast from "./Toast";
import auth from "../services/authServices.js";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", variant: "info" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = useMemo(() => {
    return (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setToast({ message: "Please enter a valid email", variant: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await auth.forgotPassword(email.trim());
      setToast({
        message: res?.message || "Reset link sent. Check your email.",
        variant: "success",
      });
      setTimeout(() => navigate("/reset-password"), 700);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Request failed. Please try again.";
      setToast({ message, variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-container">
      <Toast
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ message: "", variant: "info" })}
      />
      <div className="login-content">
        <div className="login-cta">
          <img
            src="/images/cta-logo-one.svg"
            alt="Disney+"
            className="login-logo-one"
          />

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="auth-links auth-links-split">
              <span className="auth-links-text">
                <Link to="/">Back to Login</Link>
              </span>
              <span className="auth-links-text">
                New here? <Link to="/signup">Create account</Link>
              </span>
            </div>
          </form>

          <img
            src="/images/cta-logo-two.png"
            alt="Logos"
            className="login-logo-two"
          />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
