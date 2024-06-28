import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineEye } from "react-icons/hi";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./UserLoginPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
} from "../../redux/reducers/userReducer";
import ButtonLoader from "../../utiles/loader/buttonLoader/ButtonLoader";
import { validEmail, validPassword } from "../../utiles/validation/validate";
import { API } from "../../utiles/securitiy/secreteKey";

const UserLoginPage = () => {
  // Global state variables
  const { loginLoading, error, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // If a user is logged in, they cannot access the login page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });
  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function to update login user data
  const updateUserLoginData = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "showPassword":
        setShowPassword(false);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const resetVariables = () => {
    setEmail("");
    setPassword("");
  };

  // Login and Submit Function
  const submitLoginUser = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
    }

    if (!password) {
      toast.error("Please enter password!");
    }

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
      const { data } = await axios.post(`http://localhost:8000/api/v1/auth/login`, loginUser);

      dispatch(userLoginSuccess(data.user));
      toast.success(data.message);
      resetVariables();
      navigate("/user/profile");
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

        <fieldset className="login-fieldset">
          <legend className="login-legend">User Login </legend>
          <form onSubmit={submitLoginUser} className="login-form">
            {/* Email input container */}
            <div className="input-container">
              <MdEmail className="icon" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={updateUserLoginData}
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
                onChange={updateUserLoginData}
                //onBlur={checkPasswordFormat}
                placeholder="Enter Password"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Password
              </label>
              <span className="input-highlight"></span>
              <span onClick={displayPassword} className="password-display">
                {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
              </span>
            </div>

            {/* Log in checkbox and forgot password */}
            <div className="login-checkbox-forgot-password">
              <div className="login-checkbox-keep-signed-in">
                <input
                  type="checkbox"
                  name="login"
                  className="login-checkbox"
                />
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
              Don't have an account?
              <NavLink className="sign-up" to="/signup">
                Sign Up
              </NavLink>
            </p>
          </form>
        </fieldset>
      </section>
    </main>
  );
};

export default UserLoginPage;
