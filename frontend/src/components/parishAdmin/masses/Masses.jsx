import MassForm from "../../forms/mass/MassForm";
import "./Masses.scss";

const Masses = () => {
  return (
    <section className="masses-container">
      <h2 className="masses-title">Create Monthly Mass</h2>

      <MassForm />
    </section>
  );
};

export default Masses;
