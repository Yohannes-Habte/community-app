import { MdLocationPin } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import BishopsPhoto from "../assets/Bishops.jpg";
import Bishops4 from "../assets/bishop-4.jpg";
import youTube from "../assets/ሓውኻ-ኣበይ-ኣሎ.mp4";

//====================================================================
// Hawka abey alo
//====================================================================

export const BishopsMessage = [
  {
    id: 1,
    image: BishopsPhoto,
    link: "http://eparchyofkeren.com/topics/PastoralLetterCatholicEparchsEritreaDF.pdf",
  },
  {
    id: 2,
    image: Bishops4,
    link: youTube,
  },
];

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
