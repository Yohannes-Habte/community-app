import { useEffect } from "react";
import MassForm from "../../forms/mass/MassForm";
import "./Masses.scss";
import MassCard from "../../news/massCard/MassCard";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { Alert } from "@mui/material";
import MassScheduleCarousel from "../../news/massCarousel/MassScheduleCarousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMassErrorsAction,
  fetchAllMasses,
} from "../../../redux/actions/mass/massAction";

const Masses = () => {
  const dispatch = useDispatch();
  const { error, loading, masses } = useSelector((state) => state.mass);

  useEffect(() => {
    dispatch(fetchAllMasses());

    // error handling
    return () => dispatch(clearMassErrorsAction());
  }, [dispatch]);

  // Carousel data
  const massScheduleData = masses.map((mass) => (
    <MassCard key={mass._id} mass={mass} />
  ));
  return (
    <section className="masses-container">
      <h2 className="masses-title">Create Monthly Mass</h2>

      <MassForm />

      {loading ? (
        <PageLoader isLoading={loading} message="Loading..." size={90} />
      ) : error ? (
        <Alert security="error"> {error} </Alert>
      ) : (
        <MassScheduleCarousel data={massScheduleData} />
      )}
    </section>
  );
};

export default Masses;
