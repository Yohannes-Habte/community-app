import { useEffect, useState } from "react";
import "./UpdateCommitteeMember.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utile/security/secreteKey";
import axios from "axios";
import {
  updateCommitteeFailure,
  updateCommitteeStart,
  updateCommitteeSuccess,
} from "../../../redux/reducers/committee/committeeReducer";
import { FaUserAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MdCloudUpload, MdLocationPin } from "react-icons/md";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { useParams } from "react-router-dom";

const UpdateCommitteeMember = () => {
  const { id } = useParams();
  const { loading, currentCommittee } = useSelector((state) => state.committee);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: currentCommittee?.fullName || "",
    title: currentCommittee?.title || "",
    phone: currentCommittee?.phone || "",
    image: currentCommittee?.image || null,
  });

  console.log("Committee Data:", formData);

  useEffect(() => {
    const fetchCommitteeMember = async () => {
      try {
        const { data } = await axios.get(`${API}/committees/${id}`, {
          withCredentials: true,
        });

        if (data?.result) {
          setFormData({
            fullName: data.result.fullName,
            title: data?.result?.title || "",
            phone: data?.result?.phone || "",
            image: data?.result?.image || "",
          });
        } else {
          toast.error("Committee member data not found.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to fetch committee member data.";
        toast.error(errorMessage);
      }
    };

    fetchCommitteeMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      title: "",
      phone: "",
      image: null,
    });
  };
  const { fullName, title, phone, image } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateCommitteeStart());

      // Image validation (max size 2MB, file type)
      if (image.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(image.type)) {
        toast.error("Image must be of type JPG or PNG");
        return;
      }

      // Upload Image to Cloudinary
      const imageUploadForm = new FormData();
      imageUploadForm.append("file", image);
      imageUploadForm.append("cloud_name", cloud_name);
      imageUploadForm.append("upload_preset", upload_preset);

      const { data: uploadResponse } = await axios.post(
        cloud_URL,
        imageUploadForm
      );
      const { url } = uploadResponse;

      // Construct new committee member data
      const updateCommitteeProfile = {
        fullName,
        title,
        phone,
        image: url,
      };

      // Submit to the API
      const { data } = await axios.put(
        `${API}/committees/${id}`,
        updateCommitteeProfile,
        { withCredentials: true }
      );

      dispatch(updateCommitteeSuccess(data.committee));
      toast.success(data.message);

      resetForm();
    } catch (err) {
      dispatch(
        updateCommitteeFailure(
          err.response?.data?.message || "Failed to add committee member"
        )
      );
      toast.error("Failed to add committee member");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-committee-member-form">
      {/* Full Name */}
      <div className="input-container">
        <FaUserAlt className="input-icon" />
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          placeholder="Enter Full Name"
          className={`input-field`}
          aria-label="Full Name"
        />
        <label className="input-label">Full Name</label>
      </div>

      {/* Title */}
      <div className="input-container">
        <RiAdminFill className="input-icon" />
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Enter Title"
          className={`input-field`}
          aria-label="Title / Role"
        />
        <label className="input-label">Title / Role</label>
      </div>

      {/* Phone */}
      <div className="input-container">
        <MdLocationPin className="input-icon" />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          className={`input-field`}
          aria-label="Phone Number"
        />
        <label className="input-label">Phone Number</label>
      </div>

      {/* Image Upload */}
      <div className="input-container">
        <MdCloudUpload className="input-icon" />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className={`input-field`}
          aria-label="Upload Photo"
        />
        <label className="input-label">Upload Photo</label>
      </div>

      <button
        className="add-committee-btn"
        disabled={loading}
        aria-label="Add Committee Member"
      >
        {loading ? (
          <ButtonLoader isLoading={loading} size={24} />
        ) : (
          "Add Committee Member"
        )}
      </button>
    </form>
  );
};

export default UpdateCommitteeMember;
