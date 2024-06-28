//====================================================================
// Header images
//====================================================================
export const headerImages = {
  logo: `http://localhost:8000/logo.jpg`,
  church: `/assets/church.jpg`,
  deviceMercy: "http://localhost:8000/divineMercy.png",
};

//====================================================================
// Bishops
//====================================================================
export const shepherds = [
  {
    id: 1,
    photo: `http://localhost:8000/Pope-Francis.jpg`,
    title: "Pope",
    solute: "His holiness",
    name: "Pope Francis",
    link: "https://www.vatican.va/content/vatican/en.html",
  },
  {
    id: 2,
    photo: `http://localhost:8000/MenghesteabTesfamariam.jpg`,
    title: "Archbishop",
    name: "Menghesteab Tesf...",
    eparchy: "Eparchy of Asmara",
    link: "https://en.wikipedia.org/wiki/Menghesteab_Tesfamariam",
  },

  {
    id: 3,
    photo: `http://localhost:8000/kidane.jpg`,
    title: "Bishop",
    name: "Kidane Yebio",
    eparchy: "Eparchy of Keren",
    link: "http://www.eparchyofkeren.com/",
  },

  {
    id: 4,
    photo: `http://localhost:8000/Fikremariam.jpg`,
    title: "Bishop",
    name: "Fikremariam Hagos ",
    eparchy: "Eparchy of Seganeiti",
    link: "https://en.wikipedia.org/wiki/Fikremariam_Hagos_Tsalim",
  },

  {
    id: 5,
    photo: `http://localhost:8000/Thomas-Osman.jpg`,
    title: "Bishop",
    name: "Thomas Osman",
    eparchy: "Eparchy of Barentu",
    link: "https://de.wikipedia.org/wiki/Thomas_Osman",
  },

  {
    id: 6,
    photo: `http://localhost:8000/Stefan.jpg`,
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
    image: `http://localhost:8000/Biships.jpg`,
    link: "https://amber-myrilla-1.tiiny.site/",
  },
  {
    id: 2,
    image: `http://localhost:8000/bishop-4.jpg`,
    link: `/assets/ሓውኻ-ኣበይ-ኣሎ.mp4`,
  },
];

//====================================================================
// Parish Priest
//====================================================================

export const parishPriest = {
  title: "Parish Priest",
  image: `http://localhost:8000/Fr.Siyum.jpg`,
  paragraph1: `
Since 2018, Father Siyum Kifle Zeragiorgis has been serving the Eritrean Roman Catholic communities in Hamburg and the surrounding area with unparalleled dedication and love. He inspires Parishioners with the Gospel of Jesus Christ, hope and love. The priest focuses on providing effective and quality social services and the emotional well-being of individuals, families and communities.`,

  paragraph2: `
The parishioners are delighted with the priest's shepherd. However, due to time constraints and geographical distance, the relationships and spiritual growth are not as expected.`,
};

//====================================================================
// Home Page Photos
//====================================================================

export const aboutPageData = {
  title: "We Represent Jesus In Everything We Do!",
  mission:
    "Inspired by the Gospel of Jesus Christ, we seek to bring joy to those we serve by enabling growth, healing, and hope. By delivering effective and high quality social services, Holy Saviour helps to build the social and emotional wellbeing of individuals, families and communities.",
  vision: `To make the hope of Jesus known by building a large, Christ-centered, multicultural, multigenerational church, transforming culture through creativity and empowering ordinary people to lead others and live dynamically for the cause of God's kingdom.`,

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
