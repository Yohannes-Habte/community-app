
import { MdLocationPin,  } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

// Photos
import Francis from "../assets/Pope-Francis.jpg";
import MenghesteabTesfamariam from "../assets/MenghesteabTesfamariam.jpg";
import Kidane from "../assets/kidane.jpg";
import Fikremariam from "../assets/Fikremariam.jpg";
import Stefan from "../assets/Stefan.jpg";
import ThomasOsman from "../assets/Thomas-Osman.jpg";
import Bishops from "../assets/Biships.jpg";
import HawkaAbeyAllo from "../assets/bishop-4.jpg";

// Video
import youTube from "../assets/ሓውኻ-ኣበይ-ኣሎ.mp4";

//====================================================================
// Home Page Photos
//====================================================================
export const popeFrancis = {
  image: Francis,
  title: "Pope",
  solute: "His holiness",
  name: "Pope Francis",
};

export const landingPageFiveBishops = [
  {
    id: 1,
    photo: MenghesteabTesfamariam,
    title: "Archbishop",
    name: "Menghesteab Tesf...",
    eparchy: "Eparchy of Asmara",
    link: "https://en.wikipedia.org/wiki/Menghesteab_Tesfamariam",
  },

  {
    id: 2,
    photo: Kidane,
    title: "Bishop",
    name: "Kidane Yebio",
    eparchy: "Eparchy of Keren",
    link: "http://www.eparchyofkeren.com/",
  },

  {
    id: 3,
    photo: Fikremariam,
    title: "Bishop",
    name: "Fikremariam Hagos ",
    eparchy: "Eparchy of Seganeiti",
    link: "https://en.wikipedia.org/wiki/Fikremariam_Hagos_Tsalim",
  },

  {
    id: 4,
    photo: ThomasOsman,
    title: "Bishop",
    name: "Thomas Osman",
    eparchy: "Eparchy of Barentu",
    link: "https://de.wikipedia.org/wiki/Thomas_Osman",
  },

  {
    id: 5,
    photo: Stefan,
    title: "Archbishop",
    name: "Stefan Heße",
    eparchy: "Eparchy of Hamburg",
    link: "https://www.erzbistum-hamburg.de/Erzbischof_Erzbischof-Dr.-Stefan-Hesse",
  },
];

export const landingPageEritreanBishops = [
  {
    id: 1,
    image: Bishops,
    link: "https://amber-myrilla-1.tiiny.site/",
  },
  {
    id: 2,
    image: HawkaAbeyAllo,
    link: youTube,
  },
];

//====================================================================
// Home Page Photos
//====================================================================

export const aboutPage = {
  title: "We Represent Jesus In Everything We Do!",
  mission:
    "Inspired by the Gospel of Jesus Christ, we seek to bring joy to those we serve by enabling growth, healing, and hope. By delivering effective and high quality social services, Holy Saviour helps to build the social and emotional wellbeing of individuals, families and communities.",
  vision: `To make the hope of Jesus known by building a large, Christ-centered, multicultural, multigenerational church, transforming culture through creativity and empowering ordinary people to lead others and live dynamically for the cause of God's kingdom.`,

  teamDesc:
    "At Holy Saviour, we love to see people thrive in their God given gifts & abilities. We have strategically positioned people to see the best that they have to offer and to ultimately build the Kingdom of God with excellence and passion. ",

  values: [
    {
      name: "Love",
      desc: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres (1 Corinthians 13:4-7). Therefore, love your enemies and pray for those who persecute you (Matthew 5:44).",
    },
    {
      name: "Truth",
      desc: "Jesus says, “If you abide in my word, you are truly my disciples, and you will know the truth, and the truth will set you free (John 8:31-32 ).",
    },
    {
      name: "Respect",
      desc: "Respect and honor should be shown to everyone (1 Peter 2:17). So in everything, do to others what you would have them do to you, for this sums up the Law and the Prophets (Matthew 7:12).",
    },
    {
      name: "Equity ",
      desc: "There is neither Jew nor Greek, there is neither slave nor free, there is no male and female, for you are all one in Christ Jesus (Galatians 3:28).",
    },
  ],
};

//====================================================================
// Service Page Data
//====================================================================

export const serviceData = {
  title: "What are you looking for?",
  desc: "Jesus asked the women “What are you looking for?” In this spirit, Holy Saviour will serve parishioners in all sacramental services, in prayer on special occasions and in spiritual development. If you would like to use at least one of these services, please complete the form below.",

  // Sacraments
  sacraments: [
    {
      type: "text",
      id: "name",
      name: "name",
      label: "Sacrament Type",
      placeholder: "Enter Sacrament Service",
    },

    {
      type: "text",
      id: "date",
      name: "date",
      label: "Preferred date of Sacrament Service",
      placeholder: "Enter Service Date",
    },

    {
      type: "text",
      id: "phone",
      name: "phone",
      label: "Telephone",
      placeholder: " Enter Telephone Number",
    },
  ],

  // Request for prayer
  prayerRequest: [
    {
      type: "text",
      id: "name",
      name: "name",
      label: "Prayer Request",
      placeholder: "Enter Prayer Service Name",
    },

    {
      type: "text",
      id: "date",
      name: "date",
      label: "Preferred date of prayer service",
      placeholder: "Enter Service Date",
    },

    {
      type: "text",
      id: "phone",
      name: "phone",
      label: "Telephone",
      placeholder: " Enter Telephone Number",
    },
  ],

  // Spiritual Development Service
  spiritualAdvice: [
    {
      type: "text",
      id: "name",
      name: "name",
      label: "Spiritual Development Service",
      placeholder: "Enter Spiritual Development Service",
    },

    {
      type: "text",
      id: "date",
      name: "date",
      label: "Preferred date of Spiritual Development Service",
      placeholder: "Enter Spiritual Service Date",
    },

    {
      type: "text",
      id: "phone",
      name: "phone",
      label: "Telephone",
      placeholder: " Enter Telephone Number",
    },
  ],
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
