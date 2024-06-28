import React from "react";
import Siyum from "../../assets/Fr.Siyum.jpg";
import { landingPageEritreanBishops } from "../../data/Data";
import "./HomePage.scss";
import Bishops from "../../components/bishopsSlider/Bishops";
import Header from "../../components/user/layout/header/Header";

const HomePage = () => {
  return (
    <main className="home-page">
      <Header />
      {/* Pope Francis and Archbishop Menghesteab */}
      <section className="home-page-container">
        <h1 className="title"> Eritrean Roman Catholic Church in Hamburg </h1>
        <Bishops />

        {/* The parish priest */}
        <article className="parish-priest">
          <h2 className="sub-title">Parish Priest</h2>
          <div className="image-paragraph-container">
            <figure className="image-container">
              <img className="image" src={Siyum} alt="Abba Siyum" />
            </figure>

            <div className="paragraphs">
              <p className="paragraph">
                Since 2018, Father Siyum Kifle Zeragiorgis has been serving the
                Eritrean Roman Catholic communities in Hamburg and the
                surrounding area with unparalleled dedication and love. He
                inspires Parishioners with the Gospel of Jesus Christ, hope and
                love. The priest focuses on providing effective and quality
                social services and the emotional well-being of individuals,
                families and communities.
              </p>

              <p className="paragraph">
                The parishioners are delighted with the priest's shepherd.
                However, due to time constraints and geographical distance, the
                relationships and spiritual growth are not as expected.
              </p>
            </div>
          </div>
        </article>

        {/* Eritrean bishops */}
        <article className="eritrean-bishops">
          <h2 className="sub-title"> Brave Shepherds </h2>
          <figure className="image-container">
            {landingPageEritreanBishops.map((shepherd) => (
              <figure key={shepherd.id}>
                <a href={shepherd.link} target="blank">
                  <img className="image" src={shepherd.image} alt="Shepherds" />
                </a>
              </figure>
            ))}
          </figure>
        </article>
      </section>
    </main>
  );
};

export default HomePage;
