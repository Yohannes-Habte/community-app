import { MdLocationPin } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import HawkaAbeyAllo from "../assets/bishop-4.jpg";
import youTube from "../assets/ሓውኻ-ኣበይ-ኣሎ.mp4";

export const hawkaAbeyAllo = {
  id: 2,
  image: HawkaAbeyAllo,
  link: youTube,
};

//====================================================================
// Contact Page Data
//====================================================================

export const ContactData = [
  {
    image: <MdLocationPin className="contact-icon" />,
    heading: "Our Church Address",
    link: <a href="#"> Bei Der Reitbahn 3, 22763 Hamburg </a>,
  },
  {
    image: <FiPhoneCall className="contact-icon" />,
    heading: "Phone Number",
    link: <a href="tel:+4917581005650"> +491768686868</a>,
  },
  {
    image: <MdEmail className="contact-icon" />,
    heading: "Email Address",
    link: <a href="mailto:uelandrae@gmail.com"> Email </a>,
  },
];
