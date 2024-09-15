import "./ContactTools.scss";
import { ContactData } from "../../../data/Data";

const ContactTools = () => {
  return (
    <section className="contact-media-wrapper">
      {ContactData.map(({ image, heading, link }, index) => {
        return (
          <article key={index} className="contact-media-items">
            <h3 className="contact-media-header">
              <span className="contact-icon"> {image} </span> {heading}
            </h3>
            <p className="contact-media-link-to"> {link} </p>
          </article>
        );
      })}
    </section>
  );
};

export default ContactTools;
