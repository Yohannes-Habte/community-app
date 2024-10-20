import { useState, useEffect } from "react";
import "./UserChangePassword.scss";
import { AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineEye } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { validPassword } from "../../../utile/validation/validate";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import {
  changeUserPasswordFailure,
  changeUserPasswordRequest,
  changeUserPasswordSuccess,
} from "../../../redux/reducers/user/memberReducer";
import { API } from "../../../utile/security/secreteKey";

const UserChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.member);

  // Local state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Display password strength message in real-time
  useEffect(() => {
    if (newPassword) {
      setPasswordStrength(validPassword(newPassword) ? "Strong" : "Weak");
    }
  }, [newPassword]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };

  // Reset form fields
  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordStrength("");
  };

  // Password change handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmNewPassword) {
      return toast.error("Passwords do not match!");
    }
    if (!validPassword(oldPassword)) {
      return toast.error("Invalid old password!");
    }
    if (!validPassword(newPassword)) {
      return toast.error(
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character."
      );
    }

    try {
      dispatch(changeUserPasswordRequest());
      const response = await axios.put(
        `${API}/auth/change-password/${currentUser._id}`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );

      dispatch(changeUserPasswordSuccess(response.data));
      toast.success("Password updated successfully!");
      resetForm();
      navigate("/login");
    } catch (err) {
      dispatch(
        changeUserPasswordFailure(
          err?.response?.data?.message || "Error occurred"
        )
      );
      if (err?.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error(err?.response?.data?.message || "Error changing password");
      }
    }
  };

  return (
    <section className="user-change-password-container">
      <h2 className="user-change-password-title">Change Password</h2>

      {error && <p className="error-message"> {error} </p>}

      <form onSubmit={handleSubmit} className="user-change-password-form">
        <div className="input-container">
          <RiLockPasswordFill className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
            placeholder="Enter Old Password"
            aria-label="Old Password"
            className="input-field"
          />
          <label htmlFor="oldPassword" className="input-label">
            Old Password
          </label>
          <span onClick={togglePasswordVisibility} className="password-display">
            {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
          </span>
        </div>

        <div className="input-container">
          <RiLockPasswordFill className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={newPassword}
            onChange={handleInputChange}
            placeholder="Enter New Password"
            aria-label="New Password"
            className="input-field"
          />
          <label htmlFor="newPassword" className="input-label">
            New Password
          </label>
          <span className="password-strength">{passwordStrength}</span>
          <span onClick={togglePasswordVisibility} className="password-display">
            {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
          </span>
        </div>

        <div className="input-container">
          <RiLockPasswordFill className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleInputChange}
            placeholder="Confirm New Password"
            aria-label="Confirm New Password"
            className="input-field"
          />
          <label htmlFor="confirmNewPassword" className="input-label">
            Confirm New Password
          </label>
          <span onClick={togglePasswordVisibility} className="password-display">
            {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
          </span>
        </div>

        <div className="reset-password-wrapper">
          <button
            aria-live="Reset Password"
            className="user-change-password-btn"
            disabled={loading}
          >
            {loading ? <ButtonLoader isLoading={loading} /> : "Reset Password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserChangePassword;
