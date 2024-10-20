import { useEffect, useState } from "react";
import "./Bishops.scss";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import FetchData from "../../utile/globalFunctions/GlobalClientFunction";
import { API } from "../../utile/security/secreteKey";

const Bishops = () => {
  const { data } = FetchData(`${API}/data/home/shepherds`);
  // local state variables
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlide = true;

  // Slide length, interval time
  const slideLength = data.length;
  let slideInterval;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  // Set current slide to zero
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoSlide) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide, intervalTime, autoSlide]);

  return (
    <div className="shepherds">
      <FiArrowLeftCircle className="arrow prev" onClick={previousSlide} />
      <FiArrowRightCircle className="arrow next" onClick={nextSlide} />

      {data &&
        data.map((shepherd, index) => {
          const { photo, title, name, eparchy, link } = shepherd;
          return (
            <div
              key={index}
              className={
                index === currentSlide
                  ? "slide-show current-slide"
                  : "slide-show"
              }
            >
              {index === currentSlide && (
                <>
                  <figure className="bishop-image-container">
                    <img className="photo" src={photo} alt={shepherd.name} />
                  </figure>

                  {/* Shepherd Information */}
                  <aside className="shepherd-info">
                    <span className="span1"></span>
                    <span className="span2"></span>
                    <span className="span3"></span>
                    <span className="span4"></span>
                    <h2 className="shepherd-title">
                      {title} {name}
                    </h2>
                    <p className="eparchy"> {eparchy} </p>
                    <a href={link} target="_blank">
                      Click Here
                    </a>
                  </aside>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Bishops;
