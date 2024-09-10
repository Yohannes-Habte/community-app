import { useEffect, useState } from "react";
import "./ParishPriest.scss";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";

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
    <article className="parish-priest">
      <h2 className="parish-priest-title"> {priest?.title} </h2>
      <div className="image-description-container">
        <figure className="image-container">
          <img className="priest-image" src={priest?.image} alt="Abba Siyum" />
          <figcaption className="priest-name"> Siyum Zera Ghiorgis </figcaption>
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
