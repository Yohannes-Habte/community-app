import MassForm from "../../forms/mass/MassForm";
import "./Masses.scss";

const Masses = () => {
  return (
    <section className="masses-container">
      <h2 className="masses-title">Monthly Mass Creation Form</h2>

      <MassForm />
    </section>
  );
};

export default Masses;
