import { useEffect } from "react";
import "./DashboardSummary.scss";
import ParishionersBarChart from "../charts/ParishionersBarChart";
import EventsLineChart from "../charts/EventsLineChart";
import SpiritualsLineChart from "../charts/SpiritualsLineChart";
import PrayersLineChart from "../charts/PrayersLineChart";
import SacramentsLineChart from "../charts/SacramentsLineChart";
import DonationPieChart from "../charts/DonationPieChart";
import { CircularProgressbar } from "react-circular-progressbar";
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

  const { loading, error } = useSelector((state) => state.service);

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
        const { data } = await axios.get(`${API}/members/size/total`);
        dispatch(countUsersSuccess(data.counts));
      } catch (error) {
        dispatch(countUsersFailure(error.response.data.message));
      }
    };

    totalNumberOfParishioners();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="priest-dashboard-summary">
      <h2 className="priest-dashboard-summary-title"> Dashboard Summary</h2>

      <section className="parishioners-pariciaption-wrapper">
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
            <p className="box-count"> Counts: {"sacraments"} </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <PrayersLineChart />
          <aside className="box-text">
            <h4 className="box-title">Prayers</h4>
            <p className="box-count"> Counts: {"prayers"} </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <SpiritualsLineChart />
          <aside className="box-text">
            <h4 className="box-title">Spiritual Development</h4>
            <p className="box-count"> Counts: {"spirituals"} </p>
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

        <div className="box">
          <DonationPieChart />
          <aside className="box-text">
            <h4 className="box-title"> Members Contribution </h4>
            <p className="box-count"> Counts </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <figure style={{ width: 300, height: 300, margin: "auto" }}>
            <CircularProgressbar value={80} text="80%" strokeWidth={6} />
          </figure>

          <aside className="box-text">
            <h4 className="box-title"> Members Contribution </h4>
            <p className="box-count"> Counts </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default DashboardSummary;
