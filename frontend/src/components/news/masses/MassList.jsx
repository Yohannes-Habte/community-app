import { useEffect } from "react";
import "./MassList.scss";
import MassCard from "../massCard/MassCard";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMassErrorsAction,
  fetchAllMasses,
} from "../../../redux/actions/mass/massAction";

const MassList = () => {
  const dispatch = useDispatch();
  const { error, loading, masses } = useSelector((state) => state.mass);

  useEffect(() => {
    dispatch(fetchAllMasses());

    // error handling
    return () => dispatch(clearMassErrorsAction());
  }, [dispatch]);

  return (
    <section className="mass-list-container">
      <h2 className="mass-list-title">Scheduled Mass Services</h2>
      <div className="mass-list-wrapper">
        {loading ? (
          <PageLoader isLoading={loading} message="Loading..." size={90} />
        ) : error ? (
          <Alert severity="error">{`Error loading data: ${error.message}`}</Alert>
        ) : masses.length === 0 ? (
          <Alert severity="info">No Masses scheduled at the moment.</Alert>
        ) : (
          masses.map((mass) => <MassCard key={mass._id} mass={mass} />)
        )}
      </div>
    </section>
  );
};

export default MassList;
