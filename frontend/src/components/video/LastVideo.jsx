import { useEffect, useState } from "react";
import "./LastVideo.scss";
import axios from "axios";
import { API } from "../../utiles/securitiy/secreteKey";
import { RiPlayCircleFill } from "react-icons/ri";
import ButtonLoader from "../../utiles/loader/buttonLoader/ButtonLoader";

const LastVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);

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
    <>
      {loading ? (
        <ButtonLoader isLoading={loading} />
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
              poster={videoFile?.thumbnailUrl || ""}
            >
              <source src={videoFile?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="video-description">{videoFile?.description}</p>
        </section>
      ) : (
        <h2>No video found.</h2>
      )}
    </>
  );
};

export default LastVideo;
