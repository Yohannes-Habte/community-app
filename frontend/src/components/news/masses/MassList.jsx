import { useState, useEffect } from "react";
import axios from "axios";
import "./MassList.scss";
import { toast } from "react-toastify";
import MassCard from "../massCard/MassCard";
import { API } from "../../../utile/security/secreteKey";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import Alert from "@mui/material/Alert";

const MassList = () => {
  const [massData, setMassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API) {
          throw new Error(
            "API key is missing. Please check your configuration."
          );
        }

        const { data } = await axios.get(`${API}/masses`);
        setMassData(data.result);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "An error occurred while fetching  data.";
        setError(err);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mass-list-container">
      <h2 className="mass-list-title">Scheduled Mass Services</h2>
      <div className="mass-list-wrapper">
        {loading ? (
          <PageLoader isLoading={loading} message="Loading..." size={90} />
        ) : error ? (
          <Alert severity="error">{`Error loading data: ${error.message}`}</Alert>
        ) : massData.length === 0 ? (
          <Alert severity="info">No Masses scheduled at the moment.</Alert>
        ) : (
          massData.map((mass) => <MassCard key={mass._id} mass={mass} />)
        )}
      </div>
    </section>
  );
};

export default MassList;
