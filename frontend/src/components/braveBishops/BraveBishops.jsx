import { BishopsMessage } from "../../data/Data";
import "./BraveBishops.scss";

const BraveBishops = () => {
  return (
    <section className="eritrean-bishops">
      <h2 className="eritrean-bishops-title"> Brave Shepherds </h2>
      <figure className="image-container">
        {BishopsMessage &&
          BishopsMessage?.map((shepherd) => (
            <figure key={shepherd.id}>
              <a href={shepherd.link} target="blank">
                <img className="image" src={shepherd.image} alt="Shepherds" />
              </a>
            </figure>
          ))}
      </figure>
    </section>
  );
};

export default BraveBishops;
