// frontend/src/components/SubscribeForm.js
import { useState } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import "./Subscribe.scss";

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
    <section className="subscription-form-container">
      <figure className="subscription-image">
        <img src={`./assets/subscribe.jpg`} alt="Subscribe" />
      </figure>
      <form className="subscription-form" onSubmit={handleSubmit}>
        <h3>Subscribe Now</h3>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};

export default Subscribe;
