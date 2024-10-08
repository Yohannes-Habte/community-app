import "./HomePage.scss";
import Bishops from "../../components/bishopsSlider/Bishops";
import PopularServices from "../../components/services/popularServices/PopularServices";
import BraveBishops from "../../components/braveBishops/BraveBishops";
import LatestEvent from "../../components/latestEvent/LatestEvent";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { useEffect, useState } from "react";
import { API } from "../../utiles/securitiy/secreteKey";
import axios from "axios";
import { RiPlayCircleFill } from "react-icons/ri";

const HomePage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);

  console.log("video =", videoFile);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/videos/last/video`);

        if (data.success) {
          setVideoFile(data.result);
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch the video.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handlePlayClick = () => {
    const video = document.getElementById("featuredVideo");
    video.play();
    setPlaying(true);
  };

  return (
    <main className="home-page">
      <Header />
      <section className="home-page-container">
        <h1 className="title"> Eritrean Roman Catholic Church in Hamburg </h1>
        <Bishops />

        {loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <h2>{error}</h2>
        ) : videoFile ? (
          <section className="video-preview-container">
            <h3 className="video-preview-title"> {videoFile.title} </h3>

            <div className="video-wrapper">
              {!playing && (
                <div className="video-overlay" onClick={handlePlayClick}>
                  <RiPlayCircleFill className="play-button" />
                </div>
              )}
              <video
                id="featuredVideo"
                width="100%"
                controls
                className="video"
                poster={videoFile.thumbnailUrl || ""}
              >
                <source src={videoFile.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <p>{videoFile.description}</p>
          </section>
        ) : (
          <h2>No video found.</h2>
        )}

        <PopularServices />
        <BraveBishops />
        <LatestEvent />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
