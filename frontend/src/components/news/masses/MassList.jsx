import { useState, useEffect } from "react";
import axios from "axios";
import "./MassList.scss";

import { toast } from "react-toastify";
import MassCard from "../massCard/MassCard";
import { API } from "../../../utile/security/secreteKey";

const MassList = () => {
  const [massData, setMassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/masses`);
        setMassData(data.result);
        setLoading(false);
      } catch (err) {
        setError(err);
        toast.error(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <section className="mass-list-container">
      <h2 className="mass-list-title">Scheduled Mass Services</h2>
      <div className="mass-list-wrapper">
        {loading && <p>Loading...</p>}
        {error && <p>Error loading data: {error.message}</p>}

        {massData.length === 0 && <p>No Masses scheduled at the moment</p>}

        {massData &&
          massData.map((mass) => {
            return <MassCard key={mass._id} mass={mass} />;
          })}
      </div>
    </section>
  );
};

export default MassList;
