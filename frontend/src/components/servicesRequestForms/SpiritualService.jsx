import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./Form.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postSpiritualRequestFailure, postSpiritualRequestStart, postSpiritualRequestSuccess } from "../../redux/reducers/spiritualReducer";
import {
  API,
  cloud_URL,
  cloud_name,
  upload_preset,
} from "../../utiles/securitiy/secreteKey";
import ButtonLoader from "../../utiles/loader/buttonLoader/ButtonLoader";

const SpiritualService = ({ data }) => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.spiritual);
  const dispatch = useDispatch();

  // Local state variables
  const [spiritualInfo, setSpiritualInfo] = useState({});
  const [files, setFiles] = useState("");

  // Handle change fuction
  const handleChange = (e) => {
    setSpiritualInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Login and Submit Function
  const handleSpiritualSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(postSpiritualRequestStart());
      // Image validation
      const userFile = new FormData();
      userFile.append("file", files);
      userFile.append("cloud_name", cloud_name);
      userFile.append("upload_preset", upload_preset);

      // Save image to cloudinary
      const response = await axios.post(cloud_URL, userFile);
      const { url } = response.data;

      // The body
      const newSpiritual = {
        name: spiritualInfo.name,
        date: spiritualInfo.date,
        phone: spiritualInfo.phone,
        userStatus: url,
      };

      const { data } = await axios.post(
        `${API}/spirituals/${currentUser._id}/new`,
        newSpiritual
      );
      dispatch(postSpiritualRequestSuccess(data.prayer));
      toast.success(data.message);
      event.target.reset();
    } catch (err) {
      dispatch(postSpiritualRequestFailure(err.response.data.message));
    }
  };

  return (
    <section className="service-form-container">
      <h1 className="service-form-title"> Spiritual Development Request </h1>

      {error ? <p className="error-message"> {error} </p> : null}

      <form onSubmit={handleSpiritualSubmit} action="" className="form">
        {data?.spiritualAdvice.map((input) => {
          return (
            <div key={input.id} className="input-container">
              <input
                type={input.type}
                name={input.name}
                id={input.id}
                onChange={handleChange}
                placeholder={input.placeholder}
                className="input-field"
              />
              <label className="input-label" htmlFor={input.id}>
                {input.label}
              </label>
              <span className="input-highlight"></span>
            </div>
          );
        })}

        {/* Photos input */}
        <div className="file-container">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFiles(e.target.files[0])}
            className="file-field"
          />

          <label htmlFor="file" className="file-label">
            Germany Religious Recognition Document{" "}
            <FaCloudUploadAlt className="icon" />{" "}
          </label>
        </div>
        <button className="service-request-btn" disabled={loading}>
          {loading ? (
            <span className="loading">
              <ButtonLoader /> Loading...
            </span>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </section>
  );
};

export default SpiritualService;
