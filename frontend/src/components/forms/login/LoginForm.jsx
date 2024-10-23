import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  clearError,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
} from "../../../redux/reducers/user/memberReducer";
import { API } from "../../../utile/security/secreteKey";
import { validEmail, validPassword } from "../../../utile/validation/validate";

const initialState = {
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.member);

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { email, password, showPassword, rememberMe } = formData;

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetHandler = () => {
    setFormData(initialState);
    setErrors({});
  };

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const formErrors = {};

    // Email validation
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!validEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      formErrors.password = "Password is required.";
    } else if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long.";
    } else if (!validPassword(password)) {
      formErrors.password = "Please enter a valid password.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      dispatch(loginUserRequest());
      const loginUser = { email, password, rememberMe };
      const res = await axios.post(`${API}/auth/login`, loginUser, {
        withCredentials: true,
      });

      dispatch(loginUserSuccess(res.data.user));
      toast.success(res.data.message);

      const token = res.data?.token;
      Cookies.set("token", token, {
        expires: rememberMe ? 30 : 1,
        secure: true, // This should be true if served over HTTPS
        sameSite: "strict",
      });

      resetHandler();
      navigate("/");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      dispatch(loginUserFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Email input container */}
      <div className="input-container">
        <MdEmail className="icon" />
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          placeholder="Enter Email"
          className="input-field"
          aria-label="Email Address"
        />
        <label htmlFor="email" className="input-label">
          Email Address
        </label>
        <span className="input-highlight"></span>
        {errors.email && <p className="input-error-message">{errors.email}</p>}
      </div>

      {/* Password input container */}
      <div className="input-container">
        <RiLockPasswordFill className="icon" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={changeHandler}
          placeholder="Enter Password"
          className="input-field"
          aria-label="Password"
        />
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <span className="input-highlight"></span>
        {errors.password && (
          <p className="input-error-message">{errors.password}</p>
        )}
      </div>

      {/* Show or hide Password input container */}
      <div className="show-password-container">
        <input
          type="checkbox"
          id="showPassword"
          name="showPassword"
          checked={showPassword}
          onChange={changeHandler}
          className="show-password-checkbox"
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>

      {/* Log in remember me and forgot password */}
      <div className="login-checkbox-forgot-password">
        <div className="login-checkbox-keep-signed-in">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={changeHandler}
            className="login-checkbox"
          />
          <span>Keep me signed in</span>
        </div>
        <Link className="forgot-password" to={"/forgot-password"}>
          Forgot your password?
        </Link>
      </div>

      {/* Button for log in form */}
      <button className="login-button" disabled={loading}>
        {loading ? <ButtonLoader isLoading={loading} message="" /> : "Log In"}
      </button>

      {/* Do not have an account, Sign Up */}
      <p className="have-no-account">
        {"Don't have an account?"}
        <Link className="sign-up" to="/signup">
          Sign Up
        </Link>
      </p>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default LoginForm;
