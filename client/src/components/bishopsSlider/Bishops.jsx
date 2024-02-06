import React, { useEffect, useState } from 'react';
import './Bishops.scss';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
// Import images
import Francis from '../../assets/Pope-Francis.jpg';
import Stefan from '../../assets/Stefan.jpg';
import Menghesteab from '../../assets/MenghesteabTesfamariam.jpg';
import Kidane from '../../assets/kidane.jpg';
import Thomas from '../../assets/Thomas-Osman.jpg';
import Fikremariam from '../../assets/Fikremariam.jpg';
import Siyum from '../../assets/Fr.Siyum.jpg';

export const shepherds = [
  {
    photo: Francis,
    title: 'Pope of the Catholic Church',
    name: 'Pope Francis',
    eparchy: '',
    link: (
      <p className="link">
        For more information{' '}
        <a
          className="anchor"
          href="https://www.vatican.va/content/vatican/en.html"
        >
          Click Here
        </a>
      </p>
    ),
  },

  {
    photo: Stefan,
    title: 'Archbishop',
    name: 'Stefan Heße',
    eparchy: 'Diocese of Hamburg',
    link: (
      <p className="link">
        For more information{' '}
        <a
          className="anchor"
          href="https://www.erzbistum-hamburg.de/Erzbischof_Erzbischof-Dr.-Stefan-Hesse"
        >
          Click Here
        </a>
      </p>
    ),
  },

  {
    photo: Menghesteab,
    title: 'Archbishop',
    name: 'Menghesteab Tesfamariam',
    eparchy: 'Eparchy of Asmara',
    link: (
      <p className="link">
        For more information{' '}
        <a
          className="anchor"
          href="https://en.wikipedia.org/wiki/Menghesteab_Tesfamariam"
        >
          Click Here
        </a>
      </p>
    ),
  },

  {
    photo: Kidane,
    title: 'Bishop',
    name: 'Kidane Yebio',
    eparchy: 'Eparchy of Keren',
    link: (
      <p className="link">
        For more information{' '}
        <a className="anchor" href="http://www.eparchyofkeren.com/">
          Click Here
        </a>
      </p>
    ),
  },

  {
    photo: Thomas,
    title: 'Bishop',
    name: 'Thomas Osman',
    eparchy: 'Eparchy of Barentu',
    link: (
      <p className="link">
        For more information{' '}
        <a className="anchor" href="https://de.wikipedia.org/wiki/Thomas_Osman">
          Click Here
        </a>
      </p>
    ),
  },

  {
    photo: Fikremariam,
    title: 'Bishop',
    name: 'Fikremariam Hagos',
    eparchy: 'Eparchy of  Segheneity',
    link: (
      <p className="link">
        For more information{' '}
        <a
          className="anchor"
          href="https://en.wikipedia.org/wiki/Fikremariam_Hagos_Tsalim"
        >
          Click Here
        </a>
      </p>
    ),
  },

  {
    photo: Siyum,
    title: 'Priest',
    name: 'Parish priest',
    eparchy: 'Eritrean Roman Catholic Church in Hamburg',
    link: <button>More...</button>,
  },
];

const Bishops = () => {
  // local state variables
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide length
  const slideLength = shepherds.length;
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000;

  // Next slider
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  // Previous slider
  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  // Set current slide to zero
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide, intervalTime, autoScroll]);

  return (
    <div className="shepherds">
      <FiArrowLeftCircle className="arrow prev" onClick={previousSlide} />
      <FiArrowRightCircle className="arrow next" onClick={nextSlide} />

      {shepherds.map((shepherd, index) => {
        const { photo, title, name, eparchy, link } = shepherd;
        return (
          <div
            key={index}
            className={index === currentSlide ? 'slide current' : 'slide'}
          >
            {index === currentSlide && (
              <>
                <figure className="image-container">
                  <img className="photo" src={photo} alt={shepherd.name} />
                </figure>
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2 className="sub-title">
                    {title} {name}
                  </h2>
                  <p className="eparchy"> {eparchy} </p>
                  {link}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Bishops;
