import { useEffect } from "react";
import "./DashboardSummary.scss";
import ParishionersBarChart from "../charts/ParishionersBarChart";
import EventsLineChart from "../charts/EventsLineChart";
import SpiritualsLineChart from "../charts/SpiritualsLineChart";
import PrayersLineChart from "../charts/PrayersLineChart";
import SacramentsLineChart from "../charts/SacramentsLineChart";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import {
  countUsersFailure,
  countUsersStart,
  countUsersSuccess,
} from "../../../redux/reducers/userReducer";
import {
  clearAllErrors,
  fetchAllServices,
} from "../../../redux/actions/service/serviceAction";

const DashboardSummary = () => {
  // Global state variables
  const { count } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchAllServices());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Total number of parishioners
  useEffect(() => {
    const totalNumberOfParishioners = async () => {
      try {
        dispatch(countUsersStart());
        const { data } = await axios.get(`${API}/members/count/total`);
        dispatch(countUsersSuccess(data.counts));
      } catch (error) {
        dispatch(countUsersFailure(error.response.data.message));
      }
    };

    totalNumberOfParishioners();
  }, []);


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <section className="priest-dashboard-summary">
      <h2 className="priest-dashboard-summary-title"> Dashboard Summary</h2>

      <section className="parishioners-participation-wrapper">
        <ParishionersBarChart />

        <aside className="box-text">
          <h4 className="box-title"> Parishioners </h4>
          <h4 className="box-count"> Counts: {count} </h4>
          <p className="box-link">Link to</p>
        </aside>
      </section>

      <article className="summary-wrapper">
        <div className="box">
          <SacramentsLineChart />

          <aside className="box-text">
            <h4 className="box-title">Sacraments</h4>
            <p className="box-count">
              Counts:{" "}
              {
                services.filter(
                  (service) => service.serviceCategory.category === "Sacraments"
                ).length
              }
            </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <PrayersLineChart />
          <aside className="box-text">
            <h4 className="box-title">Soul Prayer Service</h4>
            <p className="box-count">
              {" "}
              Counts:{" "}
              {
                services.filter(
                  (service) =>
                    service.serviceCategory.category === "Spiritual development"
                ).length
              }{" "}
            </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <SpiritualsLineChart />
          <aside className="box-text">
            <h4 className="box-title">Spiritual Development</h4>
            <p className="box-count">
              {" "}
              Counts:{" "}
              {
                services.filter(
                  (service) =>
                    service.serviceCategory.category === "Soul prayer"
                ).length
              }
            </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <EventsLineChart />
          <aside className="box-text">
            <h4 className="box-title"> Church Events </h4>
            <p className="box-count"> Counts </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default DashboardSummary;
