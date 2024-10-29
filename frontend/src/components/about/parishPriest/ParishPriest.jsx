import { useEffect, useState } from "react";
import "./ParishPriest.scss";
import axios from "axios";
import { API } from "../../../utile/security/secreteKey";

const ParishPriest = () => {
  const [priest, setPriest] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/data/home/parish-priest`);
        setPriest(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <article className="parish-priest-wrapper" aria-labelledby="priest-title">
      <h2 id="priest-title" className="parish-priest-title">
        {priest?.title}
      </h2>
      <div className="image-description-container">
        <figure className="image-container" aria-labelledby="priest-name">
          <img
            className="priest-image"
            src={priest?.image}
            alt="Fr. Siyum Zera Ghiorgis, a parish priest"
            role="img"
          />
          <figcaption id="priest-name" className="priest-name">
            Fr. Siyum Zera Ghiorgis
          </figcaption>
        </figure>

        <div className="priest-description">
          <p className="description">{priest?.paragraph1}</p>
          <p className="description description2">{priest?.paragraph2}</p>
        </div>
      </div>
    </article>
  );
};

export default ParishPriest;
