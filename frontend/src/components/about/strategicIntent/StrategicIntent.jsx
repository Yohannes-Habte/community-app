import { useEffect, useState } from "react";
import "./StrategicIntent.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utile/security/secreteKey";

const StrategicIntent = () => {
  // Local variables
  const [aboutInfos, setAboutInfos] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/data/about`);
        setAboutInfos(data.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p> Loading... </p>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <section>
          <h1 className="about-page-title"> {aboutInfos?.title} </h1>
          <article className="strategic-intent-wrapper">
            <section className="strategic-intent">
              <h2 className="strategic-intent-subtitle"> Mission </h2>
              <p className="mission-statement"> {aboutInfos?.mission} </p>
            </section>

            <section className="strategic-intent">
              <h2 className="strategic-intent-subtitle"> Vision </h2>
              <p className="vision-statement"> {aboutInfos?.vision} </p>
            </section>

            <section className="strategic-intent">
              <h2 className="strategic-intent-subtitle"> Values</h2>
              {aboutInfos?.values.map((value) => {
                return (
                  <section key={value.id} className="core-value">
                    <h3 className="value-title"> {value.name} </h3>
                    <p className="value-description"> {value.desc}</p>
                  </section>
                );
              })}
            </section>
          </article>
        </section>
      )}
    </>
  );
};

export default StrategicIntent;
