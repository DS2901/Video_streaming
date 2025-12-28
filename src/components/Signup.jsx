import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Developer.css";
import Toast from "./Toast";
import auth from "../services/authServices.js";

const Signup = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", variant: "info" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = useMemo(() => {
    return (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setToast({ message: "Name is required", variant: "error" });
      return;
    }

    if (!isValidEmail(email)) {
      setToast({ message: "Please enter a valid email", variant: "error" });
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
      const res = await auth.signup(name.trim(), email.trim(), password, confirmPassword);
      setToast({
        message: res?.message || "Account created. Please login.",
        variant: "success",
      });
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Please try again.";
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
                type="text"
                required
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Name</label>
            </div>

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

            <div className="input-box">
              <input
                type="password"
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
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
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>

            <div className="auth-links">
              <span className="auth-links-text">
                Already have an account? <Link to="/">Login</Link>
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

export default Signup;
