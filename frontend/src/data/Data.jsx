import { MdLocationPin } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import BishopsPhoto from "../assets/Bishops.jpg";
import Bishops4 from "../assets/bishop-4.jpg";
import youTube from "../assets/ሓውኻ-ኣበይ-ኣሎ.mp4";

import Logo from "../assets/logo.png";
import DivineMercy from "../assets/divineMercy.png";
import Church from "../assets/church.jpg";

import Pope from "../assets/pope.png";
import Menghesteab from "../assets/menghesteab.png";
import Kidane from "../assets/kidane.png";
import Fikremariam from "../assets/fikremariam.png";
import Thomas from "../assets/thomas.png"
import Stefan from "../assets/stefan.png";

//====================================================================
// Header images
//====================================================================
export const headerImages = {
  logo: Logo,
  church: Church,
  divineMercy: DivineMercy,
};

//====================================================================
// Bishops
//====================================================================
export const shepherds = [
  {
    id: 1,
    photo: Pope,
    title: "Pope",
    solute: "His holiness",
    name: "Pope Francis",
    link: "https://www.vatican.va/content/vatican/en.html",
  },
  {
    id: 2,
    photo: Menghesteab,
    title: "Archbishop",
    name: "Menghesteab Tesf...",
    eparchy: "Eparchy of Asmara",
    link: "https://en.wikipedia.org/wiki/Menghesteab_Tesfamariam",
  },

  {
    id: 3,
    photo: Kidane,
    title: "Bishop",
    name: "Kidane Yebio",
    eparchy: "Eparchy of Keren",
    link: "http://www.eparchyofkeren.com/",
  },

  {
    id: 4,
    photo: Fikremariam,
    title: "Bishop",
    name: "Fikremariam Hagos ",
    eparchy: "Eparchy of Seganeiti",
    link: "https://en.wikipedia.org/wiki/Fikremariam_Hagos_Tsalim",
  },

  {
    id: 5,
    photo: Thomas,
    title: "Bishop",
    name: "Thomas Osman",
    eparchy: "Eparchy of Barentu",
    link: "https://de.wikipedia.org/wiki/Thomas_Osman",
  },

  {
    id: 6,
    photo: Stefan,
    title: "Archbishop",
    name: "Stefan Heße",
    eparchy: "Eparchy of Hamburg",
    link: "https://www.erzbistum-hamburg.de/Erzbischof_Erzbischof-Dr.-Stefan-Hesse",
  },
];

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
    heading: "Call Us",
    link: <a href="tel:+4917581005650"> +491768686868</a>,
  },
  {
    image: <MdEmail className="contact-icon" />,
    heading: "Email Us",
    link: <a href="mailto:uelandrae@gmail.com"> Email </a>,
  },
];
