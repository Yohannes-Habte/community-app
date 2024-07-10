import "./HomePage.scss";
import Bishops from "../../components/bishopsSlider/Bishops";
import Header from "../../components/user/layout/header/Header";
import FetchData from "../../utiles/globalFunctions/GlobalClientFunction";
import { API } from "../../utiles/securitiy/secreteKey";
import { useEffect, useState } from "react";
import axios from "axios";
import Subscribe from "../../components/forms/subscribe/Subscribe";

const HomePage = () => {
  const { data } = FetchData(`${API}/data/home/hawka-abey-allo`);
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
    <main className="home-page">
      <Header />
      {/* Pope Francis and Archbishop Menghesteab */}
      <section className="home-page-container">
        <h1 className="title"> Eritrean Roman Catholic Church in Hamburg </h1>
        <Bishops />

        {/* The parish priest */}
        {
          <article className="parish-priest">
            <h2 className="sub-title"> {priest?.title} </h2>
            <div className="image-paragraph-container">
              <figure className="image-container">
                <img className="image" src={priest?.image} alt="Abba Siyum" />
              </figure>

              <div className="paragraphs">
                <p className="paragraph">{priest?.paragraph1}</p>

                <p className="paragraph">{priest?.paragraph2}</p>
              </div>
            </div>
          </article>
        }

        {/* Eritrean bishops */}
        <article className="eritrean-bishops">
          <h2 className="sub-title"> Brave Shepherds </h2>
          <figure className="image-container">
            {data &&
              data?.map((shepherd) => (
                <figure key={shepherd.id}>
                  <a href={shepherd.link} target="blank">
                    <img
                      className="image"
                      src={shepherd.image}
                      alt="Shepherds"
                    />
                  </a>
                </figure>
              ))}
          </figure>
        </article>
      </section>

      <Subscribe />
    </main>
  );
};

export default HomePage;
