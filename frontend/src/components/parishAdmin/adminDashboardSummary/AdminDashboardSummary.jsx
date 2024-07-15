import { useEffect } from "react";
import FinancialReportChart from "../charts/FinancialReportChart";
import { useDispatch, useSelector } from "react-redux";
import { clearAllErrors, fetchAllServices } from "../../../redux/actions/service/serviceAction";

const AdminDashboardSummary = () => {

  const dispatch = useDispatch();
  
  const { services, loading, error } = useSelector((state) => state.service);
  
  useEffect(() => {
    dispatch(fetchAllServices());
    
    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <section className="priest-dashboard-summary">
      <h2 className="priest-dashboard-summary-title"> Dashboard Summary</h2>

      <article className="summary-wrapper">
        <div className="box">
          <aside className="box-text">
            <h4 className="box-title"> Parishioners </h4>
            <h4 className="box-count"> Counts: {"count"} </h4>
            <p className="box-link">Link to</p>
          </aside>
        </div>
        <div className="box">
          <aside className="box-text">
            <h4 className="box-title">Sacraments</h4>
            <p className="box-count"> Counts: {"sacraments"} </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <aside className="box-text">
            <h4 className="box-title">Prayers</h4>
            <p className="box-count"> Counts: {"prayers"} </p>
            <p className="box-link">Link to</p>
          </aside>
        </div>

        <div className="box">
          <aside className="box-text">
            <h4 className="box-title">Spiritual Development</h4>
            <p className="box-count"> Counts: {"spirituals"} </p>
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
