import { useState } from "react";
import axios from "axios";
import { RiVideoFill, RiFileTextFill, RiFileUploadFill } from "react-icons/ri";
import "./VideoUpload.scss";
import {
  API,
  cloud_name,
  upload_preset,
} from "../../../utiles/securitiy/secreteKey";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  // Allowed video types
  const allowedTypes = ["video/mp4", "video/avi", "video/mkv", "video/webm"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if the file type is valid
    if (file) {
      if (allowedTypes.includes(file.type)) {
        setVideoFile(file);
        setError(""); // Clear any previous error messages
      } else {
        setError(
          "Invalid file type. Please upload an MP4, AVI, MKV, or WEBM video."
        );
        setVideoFile(null); // Clear the video file
      }
    }
  };

  // Get the MIME type of the video file

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
        return ""; // Return empty if the format is unsupported
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a valid video to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("cloud_name", cloud_name);
    formData.append("upload_preset", upload_preset);

    // Move cloud_URL initialization here, before the axios call
    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`;

    try {
      setUploading(true);
      // Save video to cloudinary
      const response = await axios.post(cloud_URL, formData);
      const videoUrl = response.data.secure_url;
      setVideoUrl(videoUrl);

      // Save video details to the database
      await axios.post(
        `${API}/videos/new`,
        {
          title,
          description,
          videoUrl,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="video-upload-container">
      <h2 className="video-upload-title"> Video Content Upload Form</h2>
      <form onSubmit={handleSubmit} className="video-upload-form">
        <div className="input-container">
          <label className="input-label">Title:</label>
          <RiFileTextFill className="icon" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the video title here..."
            className="input-field"
          />
        </div>

        <div className="input-container">
          <label className="input-label">Description:</label>
          <RiVideoFill className="icon" />
          <textarea
            value={description}
            cols={30}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your video description here..."
            className="input-field"
          ></textarea>
        </div>

        <div className="input-container">
          <label className="input-label">Upload Video:</label>
          <RiFileUploadFill className="icon" />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="input-field"
          />
        </div>

        {/* Display error message if the file type is invalid */}
        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="video-submit-btn"
          disabled={uploading || !!error}
        >
          {uploading ? "Uploading..." : "Upload Video"}
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
