import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

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
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchDataFromBackend();
  }, [url]);

  // ==============================================
  // Global Function to refetch data
  // ==============================================
  const reFetching = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  // ==============================================
  // Global Function to delete data
  // ==============================================

  const deleteData = async () => {
    setLoading(true);
    try {
      await axios.delete(url);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetching, deleteData };
};

export default FetchData;
