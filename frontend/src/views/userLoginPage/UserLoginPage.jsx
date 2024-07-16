import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./UserLoginPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  postUserLoginFailure,
  postUserLoginStart,
  postUserLoginSuccess,
} from "../../redux/reducers/userReducer";
import { validEmail, validPassword } from "../../utiles/validation/validate";
import { API } from "../../utiles/securitiy/secreteKey";
import ButtonLoader from "../../utiles/loader/buttonLoader/ButtonLoader";
import axios from "axios";
import Cookies from "js-cookie"; // A popular library to handle cookies in JavaScript

const initialState = {
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};
const UserLoginPage = () => {
  const navigate = useNavigate();

  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading.login);
  const error = useSelector((state) => state.user.error.login);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialState);
  const { email, password, showPassword, rememberMe } = formData;

  // If a user is logged in, they cannot access the login page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  // Clear errors when the component mounts
  useEffect(() => {
    dispatch(clearErrors());
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
      dispatch(postUserLoginStart());

      // The body
      const loginUser = {
        email: email,
        password: password,
        rememberMe: rememberMe,
      };
      const { data } = await axios.post(`${API}/auth/login`, loginUser);

      dispatch(postUserLoginSuccess(data.user));
      toast.success(data.message);

      // Set token in cookies
      const token = data.token;
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
      dispatch(postUserLoginFailure(err.response.data.message));
    }
  };

  return (
    <main className="lagin-page">
      <Helmet>
        <title> Sign In </title>
      </Helmet>

      <section className="login-page-container">
        <h1 className="login-page-title"> Welcome To Your Account </h1>

        {error ? <p className="error-message"> {error} </p> : null}

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

          {/* Log in checkbox and forgot password */}
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
            {loading ? (
              <span className="loading">
                <ButtonLoader /> Loading...
              </span>
            ) : (
              "Log In"
            )}
          </button>

          {/* Do not have an account, Sign Up */}
          <p className="have-no-account">
            {"Don't have an account?"}
            <NavLink className="sign-up" to="/signup">
              Sign Up
            </NavLink>
          </p>
          {error ? <p className="error-message"> {error} </p> : null}
        </form>
      </section>
    </main>
  );
};

export default UserLoginPage;
