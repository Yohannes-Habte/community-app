import "./ContactTools.scss";
import { ContactData } from '../../../data/Data';

const ContactTools = () => {
  return (
    <section className="contact-media-wrapper">
        {ContactData.map(({ image, heading, link }, index) => {
          return (
            <article key={index} className="contact-media-items">
              <figure className="contact-media-icon-container"> {image}</figure>
              <h3 className="contact-media-header"> {heading} </h3>
              <p className="contact-media-link-to"> {link} </p>
            </article>
          );
        })}
      </section>
  );
};

export default ContactTools;
