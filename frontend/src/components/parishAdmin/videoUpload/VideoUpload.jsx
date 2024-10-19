import { useState } from "react";
import axios from "axios";
import { RiVideoFill, RiFileTextFill, RiFileUploadFill } from "react-icons/ri";
import "./VideoUpload.scss";
import {
  API,
  cloud_name,
  upload_preset,
} from "../../../utiles/securitiy/secreteKey";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { toast } from "react-toastify";

const initialState = {
  videoFile: null,
  title: "",
  description: "",
  loading: false,
  videoUrl: null,
};

const initialErrors = {
  title: "",
  description: "",
  videoFile: "",
  general: "",
};

// Helper function to determine the MIME type based on the video URL
const getVideoMimeType = (url) => {
  const extension = url.split(".").pop().toLowerCase();
  switch (extension) {
    case "mp4":
      return "video/mp4";
    case "avi":
      return "video/x-msvideo";
    case "mkv":
      return "video/x-matroska";
    case "webm":
      return "video/webm";
    default:
      return "video/mp4"; // Default MIME type
  }
};

const VideoUpload = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const { videoFile, title, description, loading, videoUrl } = formData;

  // Allowed video types
  const allowedTypes = ["video/mp4", "video/avi", "video/mkv", "video/webm"];

  // Handler for file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if the file type is valid
      if (allowedTypes.includes(file.type)) {
        setFormData((prevState) => ({
          ...prevState,
          videoFile: file,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          videoFile: "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          videoFile:
            "Invalid file type. Please upload an MP4, AVI, MKV, or WEBM video.",
        }));
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form inputs before submitting
  const validateInputs = () => {
    const newErrors = { ...initialErrors };
    let hasError = false;

    if (!title.trim()) {
      newErrors.title = "Title is required.";
      hasError = true;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      hasError = true;
    }
    if (!videoFile) {
      newErrors.videoFile = "Please select a valid video to upload.";
      hasError = true;
    }

    setErrors(newErrors);
    return hasError;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("file", videoFile);
    formDataToSend.append("cloud_name", cloud_name);
    formDataToSend.append("upload_preset", upload_preset);

    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`;

    try {
      setFormData((prevState) => ({ ...prevState, loading: true }));
      setErrors(initialErrors);

      // Upload video to Cloudinary
      const response = await axios.post(cloud_URL, formDataToSend);
      const videoUrl = response.data.secure_url;

      // Save video details to the database
      const { data } = await axios.post(
        `${API}/videos/new`,
        { title, description, videoUrl },
        { withCredentials: true }
      );

      toast.success(data.message);

      setFormData((prevState) => ({
        ...prevState,
        videoUrl,
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while uploading the video. Please try again.";

      toast.error(errorMessage);

      setErrors((prevErrors) => ({
        ...prevErrors,
        general:
          "An error occurred while uploading the video. Please try again.",
      }));
    } finally {
      setFormData((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <section className="video-upload-container">
      <h2 className="video-upload-title">Video Content Upload Form</h2>

      <form onSubmit={handleSubmit} className="video-upload-form">
        <div className="input-container">
          <label htmlFor="title" className="input-label">
            Title:
          </label>
          <RiFileTextFill className="icon" />
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter the video title here..."
            className="input-field"
            aria-label="Video Title"
            required
          />
          {errors.title && <p className="input-error">{errors.title}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="description" className="input-label">
            Description:
          </label>
          <RiVideoFill className="icon" />
          <textarea
            name="description"
            value={description}
            cols={30}
            rows={5}
            onChange={handleChange}
            placeholder="Enter your video description here..."
            className="input-field"
            aria-label="Video Description"
            required
          ></textarea>
          {errors.description && (
            <p className="input-error">{errors.description}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="videoFile" className="input-label">
            Upload Video:
          </label>
          <RiFileUploadFill className="icon" />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="input-field"
            aria-label="Upload Video"
            required
          />
          {errors.videoFile && (
            <p className="input-error">{errors.videoFile}</p>
          )}
        </div>

        {errors.general && <p className="error-message">{errors.general}</p>}

        <button
          type="submit"
          className="video-submit-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <ButtonLoader
              isLoading={loading}
              message="Uploading..."
              size={24}
            />
          ) : (
            "Upload Video"
          )}
        </button>
      </form>

      {videoUrl && (
        <section className="video-preview">
          <h3 className="video-preview-title">Uploaded Video:</h3>
          <video width="400" controls>
            <source src={videoUrl} type={getVideoMimeType(videoUrl)} />
            Your browser does not support the video tag.
          </video>
        </section>
      )}
    </section>
  );
};

export default VideoUpload;
