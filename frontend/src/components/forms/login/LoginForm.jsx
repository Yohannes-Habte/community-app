import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { validEmail, validPassword } from "../../../utile/validation/validate";
import { toast } from "react-toastify";
import axios from "axios";
import {
  clearError,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
} from "../../../redux/reducers/user/memberReducer";
import { API } from "../../../utile/security/secreteKey";


const initialState = {
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};
const LoginForm = () => {
  const navigate = useNavigate();

  // Global state variables
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.member);

  // Local state variables
  const [formData, setFormData] = useState(initialState);
  const { email, password, showPassword, rememberMe } = formData;

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  // Clear errors when the component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetHandler = () => {
    setFormData({
      email: "",
      password: "",
      showPassword: false,
      rememberMe: false,
    });
  };

  // change handler
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (!validPassword(password)) {
      return toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    try {
      dispatch(loginUserRequest());

      // The body
      const loginUser = {
        email: email,
        password: password,
        rememberMe: rememberMe,
      };
      const res = await axios.post(`${API}/auth/login`, loginUser, {
        withCredentials: true,
      });

      dispatch(loginUserSuccess(res.data.user));
      toast.success(res.data.message);

      // Set token in cookies
      const token = res.data?.token;

      Cookies.set("token", token, {
        expires: rememberMe ? 30 : 1,
        secure: true,
        sameSite: "strict",
      });

      resetHandler();
      navigate("/");

      /**
      const tokenExpiry = rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

      // Save user data and expiration time to local storage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", tokenExpiry);
       */
    } catch (err) {
      console.log(err);
      dispatch(loginUserFailure(err.response.data.message));
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
        />
        <label htmlFor="" className="input-label">
          Email Address
        </label>
        <span className="input-highlight"></span>
      </div>

      {/* Password input container */}
      <div className="input-container">
        <RiLockPasswordFill className="icon" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={changeHandler}
          //onBlur={checkPasswordFormat}
          placeholder="Enter Password"
          className="input-field"
        />
        <label htmlFor="" className="input-label">
          Password
        </label>
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
          Forgot your password?{" "}
        </Link>
      </div>

      {/* Button for log in form */}
      <button className="login-button" disabled={loading}>
        {loading ? <ButtonLoader isLoading={loading} size={30} /> : "Log In"}
      </button>

      {/* Do not have an account, Sign Up */}
      <p className="have-no-account">
        {"Don't have an account?"}
        <Link className="sign-up" to="/signup">
          Sign Up
        </Link>
      </p>
      {error ? <p className="error-message"> {error} </p> : null}
    </form>
  );
};

export default LoginForm;
