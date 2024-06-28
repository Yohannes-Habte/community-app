import { useEffect, useState } from "react";
import "./ServiceRequest.scss";
import PrayerRequest from "../../servicesRequestForms/PrayerRequest";
import SacramentRequest from "../../servicesRequestForms/SacramentRequest";
import SpiritualService from "../../servicesRequestForms/SpiritualService";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";

const ServiceRequest = () => {
  const [active, setActive] = useState(1);
  const [serviceInfos, setServiceInfos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/data/services`);
        setServiceInfos(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="user-service-request-container">
      <h1 className="user-service-request-title"> {serviceInfos?.title} </h1>

      <p className="service-paragraph">{serviceInfos?.desc}</p>

      <ul className="user-service-request-tabs">
        <li
          onClick={() => setActive(1)}
          className={
            active === 1
              ? "active-user-service-request-tab"
              : "passive-user-service-request-tab"
          }
        >
          Sacrament Services
        </li>

        <li
          onClick={() => setActive(2)}
          className={
            active === 2
              ? "active-user-service-request-tab"
              : "passive-user-service-request-tab"
          }
        >
          Prayer Request
        </li>
        <li
          onClick={() => setActive(3)}
          className={
            active === 3
              ? "active-user-service-request-tab"
              : "passive-user-service-request-tab"
          }
        >
          Spiritual Development
        </li>
      </ul>

      {active === 1 && <SacramentRequest data={serviceInfos} />}
      {active === 2 && <PrayerRequest data={serviceInfos} />}
      {active === 3 && <SpiritualService data={serviceInfos} />}
    </section>
  );
};

export default ServiceRequest;
