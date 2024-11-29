import dotenv from "dotenv";

dotenv.config();

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.BACKEND_URL
    : process.env.RENDER_URL;
//====================================================================
// Header images
//====================================================================
export const headerImages = {
  logo: `${BASE_URL}/logo.jpg`,
  church: `/assets/church.jpg`,
  divineMercy: `${BASE_URL}/divineMercy.png`,
};

//====================================================================
// Bishops
//====================================================================
export const shepherds = [
  {
    id: 1,
    photo: `${BASE_URL}/Pope-Francis.jpg`,
    title: "Pope",
    solute: "His holiness",
    name: "Pope Francis",
    link: "https://www.vatican.va/content/vatican/en.html",
  },
  {
    id: 2,
    photo: `${BASE_URL}/MenghesteabTesfamariam.jpg`,
    title: "Archbishop",
    name: "Menghesteab Tesf...",
    eparchy: "Eparchy of Asmara",
    link: "https://en.wikipedia.org/wiki/Menghesteab_Tesfamariam",
  },

  {
    id: 3,
    photo: `${BASE_URL}/kidane.jpg`,
    title: "Bishop",
    name: "Kidane Yebio",
    eparchy: "Eparchy of Keren",
    link: "http://www.eparchyofkeren.com/",
  },

  {
    id: 4,
    photo: `${BASE_URL}/Fikremariam.jpg`,
    title: "Bishop",
    name: "Fikremariam Hagos ",
    eparchy: "Eparchy of Seganeiti",
    link: "https://en.wikipedia.org/wiki/Fikremariam_Hagos_Tsalim",
  },

  {
    id: 5,
    photo: `${BASE_URL}/Thomas-Osman.jpg`,
    title: "Bishop",
    name: "Thomas Osman",
    eparchy: "Eparchy of Barentu",
    link: "https://de.wikipedia.org/wiki/Thomas_Osman",
  },

  {
    id: 6,
    photo: `${BASE_URL}/Stefan.jpg`,
    title: "Archbishop",
    name: "Stefan Heße",
    eparchy: "Eparchy of Hamburg",
    link: "https://www.erzbistum-hamburg.de/Erzbischof_Erzbischof-Dr.-Stefan-Hesse",
  },
];

//====================================================================
// Hawka abey alo
//====================================================================

export const hawkaAbeyAllo = [
  {
    id: 1,
    image: `${BASE_URL}Biships.jpg`,
    link: "https://amber-myrilla-1.tiiny.site/",
  },
  {
    id: 2,
    image: `${BASE_URL}/bishop-4.jpg`,
    link: `/assets/ሓውኻ-ኣበይ-ኣሎ.mp4`,
  },
];

//====================================================================
// Parish Priest
//====================================================================

export const parishPriest = {
  title: "Parish Priest",
  image: `${BASE_URL}/Fr.Siyum.jpg`,
  paragraph1: `
Since 2018, Father Siyum Kifle Zeragiorgis has faithfully served the Eritrean Roman Catholic communities in Hamburg and its surrounding regions with unwavering dedication and pastoral care. Through his deep commitment to the Gospel of Jesus Christ, he continually inspires parishioners with messages of hope, love, and spiritual renewal. Father Siyum also places a strong emphasis on delivering high-quality social services and supporting the emotional and spiritual well-being of individuals, families, and the wider community.`,

  paragraph2: `
While the parishioners hold Father Siyum's leadership in high regard, challenges related to time constraints and geographical distance have hindered the development of closer relationships and the desired level of spiritual growth.`,
};

//====================================================================
// Home Page Photos
//====================================================================

export const aboutPageData = {
  title: "We Represent Jesus In Everything We Do!",
  mission:
    "The Parish of the Eritrean Roman Catholic Church in Hamburg, rooted in the Word and Sacraments, is committed to fostering spiritual growth, prayer, formation, education, and social service. Through embracing the rich diversity of cultures within our community, we work together to fulfill the mission of Christ, continuing His work of love, justice, and compassion in the world today.",
  vision: `Our vision is to proclaim the hope of Jesus Christ by establishing a vibrant, Christ-centered church that is multicultural and multigenerational. We seek to transform society through creative expression, while empowering individuals to become dynamic leaders who inspire others and live purposefully in service of God's kingdom.`,

  teamDesc:
    "At Holy Saviour, we love to see people thrive in their God given gifts & abilities. We have strategically positioned people to see the best that they have to offer and to ultimately build the Kingdom of God with excellence and passion. ",

  values: [
    {
      id: 1,
      name: "Love",
      desc: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres (1 Corinthians 13:4-7). Therefore, love your enemies and pray for those who persecute you (Matthew 5:44).",
    },
    {
      id: 2,
      name: "Truth",
      desc: "Jesus says, “If you abide in my word, you are truly my disciples, and you will know the truth, and the truth will set you free (John 8:31-32 ).",
    },
    {
      id: 3,
      name: "Respect",
      desc: "Respect and honor should be shown to everyone (1 Peter 2:17). So in everything, do to others what you would have them do to you, for this sums up the Law and the Prophets (Matthew 7:12).",
    },
    {
      id: 4,
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
      type: "date",
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
      type: "date",
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
      type: "date",
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
