import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./UserLoginPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginStart,
  userLoginSuccess,
} from "../../redux/reducers/userReducer";
import ButtonLoader from "../../utiles/loader/buttonLoader/ButtonLoader";
import { validEmail, validPassword } from "../../utiles/validation/validate";
import { API } from "../../utiles/securitiy/secreteKey";

const initialState = {
  email: "",
  password: "",
  showPassword: false,
};
const UserLoginPage = () => {
  // Global state variables
  const { loginLoading, error, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Local state variables
  const [formData, setFormData] = useState(initialState);
  const { email, password, showPassword } = formData;

  // change handler
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // If a user is logged in, they cannot access the login page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  // Reset all state variables for the login form
  const resetHandler = () => {
    setFormData({ email: "", password: "", showPassword: false });
  };

  // Login and Submit Function
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (!validPassword(password)) {
      return toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    try {
      dispatch(userLoginStart());
      // The body
      const loginUser = {
        email: email,
        password: password,
      };
      const { data } = await axios.post(`${API}/auth/login`, loginUser);

      dispatch(userLoginSuccess(data.user));
      toast.success(data.message);
      resetHandler();
      navigate("/user/profile");
      window.location.reload();
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      // dispatch(userLoginFailure(err.response.data.message));
      console.log(err);
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

        <form onSubmit={submitHandler} className="login-form">
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
              <input type="checkbox" name="login" className="login-checkbox" />
              <span>Keep me signed in</span>
            </div>

            <Link className="forgot-password" to={"/forgot-password"}>
              Forgot your password?{" "}
            </Link>
          </div>

          {/* Button for log in form */}
          <button className="login-button" disabled={loginLoading}>
            {loginLoading ? (
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
        </form>
      </section>
    </main>
  );
};

export default UserLoginPage;
