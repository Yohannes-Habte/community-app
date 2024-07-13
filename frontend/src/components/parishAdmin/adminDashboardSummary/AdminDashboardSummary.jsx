import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../utiles/securitiy/secreteKey";
import { countUsersFailure, countUsersStart, countUsersSuccess } from "../../../redux/reducers/userReducer";
import axios from "axios";
import {
  countSacramentsFailure,
  countSacramentsStart,
  countSacramentsSuccess,
} from "../../../redux/reducers/sacramentReducer";
import {
  prayersCountFailure,
  prayersCountStart,
  prayersCountSuccess,
} from "../../../redux/reducers/prayerReducer";
import {
  countSpiritualsFailure,
  countSpiritualsStart,
  countSpiritualsSuccess,
} from "../../../redux/reducers/spiritualReducer";
import FinancialReportChart from "../charts/FinancialReportChart";

const AdminDashboardSummary = () => {
  // Global state variables
  const { count } = useSelector((state) => state.user);
  const { count: sacraments } = useSelector((state) => state.sacrament);
  const { count: prayers } = useSelector((state) => state.prayer);
  const { count: spirituals } = useSelector((state) => state.spiritual);
  const dispatch = useDispatch();

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

  // Total number of sacraments
  useEffect(() => {
    const totalNumberOfSacraments = async () => {
      try {
        dispatch(countSacramentsStart());
        const { data } = await axios.get(`${API}/sacraments/size/total`);
        dispatch(countSacramentsSuccess(data.counts));
      } catch (error) {
        dispatch(countSacramentsFailure(error.response.data.message));
      }
    };

    totalNumberOfSacraments();
  }, []);

  // Total number of prayers
  useEffect(() => {
    const totalNumberOfPrayers = async () => {
      try {
        dispatch(prayersCountStart());
        const { data } = await axios.get(`${API}/prayers/size/total`);
        dispatch(prayersCountSuccess(data.counts));
      } catch (error) {
        dispatch(prayersCountFailure(error.response.data.message));
      }
    };

    totalNumberOfPrayers();
  }, []);

  // Total number of spirituals
  useEffect(() => {
    const totalNumberOfSpirituals = async () => {
      try {
        dispatch(countSpiritualsStart());
        const { data } = await axios.get(`${API}/spirituals/size/total`);
        dispatch(countSpiritualsSuccess(data.counts));
      } catch (error) {
        dispatch(countSpiritualsFailure(error.response.data.message));
      }
    };

    totalNumberOfSpirituals();
  }, []);

  return (
    <section className="priest-dashboard-summary">
      <h2 className="priest-dashboard-summary-title"> Dashboard Summary</h2>

      <article className="summary-wrapper">
        <div className="box">
          <aside className="box-text">
            <h4 className="box-title"> Parishioners </h4>
            <h4 className="box-count"> Counts: {count} </h4>
            <p className="box-link">Link to</p>
          </aside>
        </div>
        <div className="box">
          <aside className="box-text">
            <h4 className="box-title">Sacraments</h4>
            <p className="box-count"> Counts: {sacraments} </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <aside className="box-text">
            <h4 className="box-title">Prayers</h4>
            <p className="box-count"> Counts: {prayers} </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <aside className="box-text">
            <h4 className="box-title">Spiritual Development</h4>
            <p className="box-count"> Counts: {spirituals} </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <aside className="box-text">
            <h4 className="box-title"> Church Events </h4>
            <p className="box-count"> Counts </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <aside className="box-text">
            <h4 className="box-title"> Members Contribution </h4>
            <p className="box-count"> Counts </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <aside className="box-text">
            <h4 className="box-title"> Members Contribution </h4>
            <p className="box-count"> Counts </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>
      </article>

      <FinancialReportChart />
    </section>
  );
};

export default AdminDashboardSummary;
