import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const FetchData = (url) => {
  // Global State variables for fetching array data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // ==============================================
  // Global useEffect to display data on the browser
  // ==============================================
  useEffect(() => {
    const fetchDataFromBackend = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchDataFromBackend();
  }, [url]);

  return { data, loading, error };
};

export default FetchData;
