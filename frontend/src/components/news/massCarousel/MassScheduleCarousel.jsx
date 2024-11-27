import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MassScheduleCarousel.scss";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "blue",
        zIndex: 10000,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      <FaArrowAltCircleLeft />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        right: "12px", 
        top: "50%",
        transform: "translateY(-50%)",
        color: "blue",
        zIndex: 10,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      <FaArrowAltCircleRight />
    </button>
  );
};

const MassScheduleCarousel = ({ data }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="mass-schedule-carousel-wrapper">
      <Carousel
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all 500ms ease"
        transitionDuration={3000}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item carousel-item-padding-40-px" // Added class here
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {data}
      </Carousel>
    </section>
  );
};

export default MassScheduleCarousel;
