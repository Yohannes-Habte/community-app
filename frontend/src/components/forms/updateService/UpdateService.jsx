import { PiChurchFill } from "react-icons/pi";
import "./UpdateService.scss";
import { useState } from "react";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateService = () => {
  const { id } = useParams();
  const [serviceStatus, setServiceStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updatedService = {
        serviceStatus: serviceStatus,
      };

      const { data } = await axios.put(
        `${API}/services/${id}`,
        updatedService,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      e.target.reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="" className="service-update-form">
      {/* Service Update */}
      <div className="input-container">
        <PiChurchFill className="icon" />
        <select
          name="serviceStatus"
          id="serviceStatus"
          value={serviceStatus}
          onChange={(e) => setServiceStatus(e.target.value)}
          className="input-field"
        >
          <option value="default">Pending</option>
          <option value="completed">completed</option>
          <option value="cancelled"> cancelled </option>
        </select>

        <span className="input-highlight"></span>
      </div>

      <button className="service-update-btn" disabled={loading}>
        {loading ? (
          <span className="loading">
            <ButtonLoader /> Loading...
          </span>
        ) : (
          <span>Update</span>
        )}
      </button>
    </form>
  );
};

export default UpdateService;
