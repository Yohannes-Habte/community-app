import { useState } from "react";
import axios from "axios";
import "./Subscribe.scss";
import { API } from "../../../utile/security/secreteKey";
import { validEmail } from "../../../utile/validation/validate";
import { toast } from "react-toastify";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper function for email validation
  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    } else if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleChange = async (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation for email
    if (!validateEmail()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${API}/subscribers/new`,
        { email },
        { withCredentials: true }
      );

      setEmail("");
      toast.success(response.data.message);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to subscribe. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="subscription-form" onSubmit={handleSubmit} noValidate>
      <h3 className="subscription-title">Subscribe Now</h3>

      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`input-field ${error ? "input-error" : ""}`}
          aria-label="Email address"
          aria-invalid={!!error}
          aria-describedby={error ? "email-error" : null}
          disabled={loading}
        />
        {error && (
          <small id="email-error" className="error-text">
            {error}
          </small>
        )}
      </div>

      <button type="submit" className="subscription-btn" disabled={loading}>
        {loading ? (
          <ButtonLoader isLoading={loading} message="Loading..." size={24} />
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
};

export default Subscribe;
