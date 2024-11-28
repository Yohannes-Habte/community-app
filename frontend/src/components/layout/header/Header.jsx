import "./Header.scss";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utile/security/secreteKey";


const Header = () => {
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/data/header`);
        setImages(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <header className="header">
      <h1 className="header-title">
        Eritrean Roman Catholic Church in Hamburg (ERCCH)
      </h1>

      <figure className="logo-container">
        <img src={images?.logo} alt="Logo" className="logo" />

        <img src={images?.divineMercy} alt="Logo" className="divine-mercy" />
      </figure>

      <Navbar />
    </header>
  );
};

export default Header;
