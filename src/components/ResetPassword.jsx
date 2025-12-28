import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../Developer.css";
import Toast from "./Toast";
import auth from "../services/authServices.js";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [toast, setToast] = useState({ message: "", variant: "info" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setToast({ message: "Invalid or expired reset link", variant: "error" });
      return;
    }

    if (password.length < 6) {
      setToast({ message: "Password must be at least 6 characters", variant: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setToast({ message: "Passwords do not match", variant: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await auth.resetPassword(token, password, confirmPassword);
      setToast({
        message: res?.message || "Password reset successful. Please login.",
        variant: "success",
      });
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Reset failed. Please try again.";
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
                type="password"
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>New Password</label>
            </div>

            <div className="input-box">
              <input
                type="password"
                required
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>Confirm Password</label>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>

            <div className="auth-links auth-links-split">
              <span className="auth-links-text">
                <Link to="/forgot-password">Resend link</Link>
              </span>
              <span className="auth-links-text">
                <Link to="/">Back to Login</Link>
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

export default ResetPassword;
