// frontend/src/components/SubscribeForm.js
import { useState } from "react";
import axios from "axios";
import "./Subscribe.scss";
import { API } from "../../../utile/security/secreteKey";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/subscribers/new`, {
        email,
      });
      setMessage(res.data.msg);
      setEmail("");
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <form className="subscription-form" onSubmit={handleSubmit}>
      <h3 className="subscription-title">Subscribe Now</h3>
      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input-field"
        />
      </div>

      <button type="submit" className="subscription-btn">Subscribe</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Subscribe;
