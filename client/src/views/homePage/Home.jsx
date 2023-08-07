import React from 'react';
import {
  landingPageEritreanBishops,
  landingPageFiveBishops,
  popeFrancis,
} from '../../data/Data';

import './Home.scss';

const Home = () => {
  return (
    <main className="home-page">
      {/* Pope Francis and Archbishop Menghesteab */}
      <section className="pope-container">
        <h1 className="title"> Eritrean Roman Catholic Church in Hamburg </h1>
        <figure className="pope-francis">
          <img
            className="photo"
            src={popeFrancis.image}
            alt={popeFrancis.name}
          />
          <div>
            <p> {popeFrancis.solute} </p>
            <p className="name"> {popeFrancis.name} </p>
          </div>
        </figure>
      </section>

      {/* The five Bishops */}

      <section className="five-bishops">
        <h2 className="sub-title"> Our Shepherds </h2>
        <figure className="bishops-photos">
          {landingPageFiveBishops.map((bishop) => {
            return (
              <div className="bishop-details">
                <a href={bishop.link} target="blank">
                  <img className="b-image" src={bishop.photo} alt="Bishops" />
                </a>
                <span className="b-title"> {bishop.title} </span>
                <span className="b-name"> {bishop.name} </span>
                <p className="b-eparchy"> {bishop.eparchy} </p>
              </div>
            );
          })}
        </figure>
      </section>

      {/* Eritrean bishops */}
      <section className="eritrean-bishops">
        <h2 className="sub-title"> Brave Shepherds </h2>
        <figure className="image-container">
          {landingPageEritreanBishops.map((shepherd) => (
            <a href={shepherd.link} target="blank">
              <img className="image" src={shepherd.image} alt="Shepherds" />
            </a>
          ))}
        </figure>
      </section>
    </main>
  );
};

export default Home;
