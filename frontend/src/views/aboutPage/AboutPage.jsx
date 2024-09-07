import { useEffect, useState } from "react";
import "./AboutPage.scss";
import axios from "axios";
import Header from "../../components/user/layout/header/Header";
import { API } from "../../utiles/securitiy/secreteKey";
const AboutPage = () => {
  // Local variables
  const [staff, setStaff] = useState([]);
  const [aboutInfos, setAboutInfos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/data/about`);
        setAboutInfos(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Display staff members in the browser
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await axios.get(`${API}/committees`);
        setStaff(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStaff();
  }, []);

  return (
    <main className="about-page">
      <Header />
      <section className="about-page-container">
        <h1 className="about-title"> {aboutInfos?.title} </h1>

        <article className="strategic-intent">
          <h2 className="sub-title"> Mission </h2>
          We, the Parish of Eritrean Roman Catholic Church in Hamburg, through
          the Word and Eucharist, prayer, formation and education, social
          ministries and advocacy, embrace diverse cultures throughout the
          diocese so that together, as the Catholic Church, we may continue the
          mission of Christ in the world today.
          <p className="paragraph"> {aboutInfos?.mission} </p>
        </article>

        <article className="strategic-intent">
          <h2 className="sub-title"> Vision </h2>
          <p className="paragraph"> {aboutInfos?.vision} </p>
        </article>

        <article className="strategic-intent">
          <h2 className="sub-title">Values</h2>
          {aboutInfos?.values.map((value) => {
            return (
              <section key={value.id} className="value">
                <h3 className="value-title"> {value.name}</h3>
                <p className="description"> {value.desc}</p>
              </section>
            );
          })}
        </article>

        <article className="staff-members">
          <h2 className="sub-title"> Staff Members </h2>
          <div className="staff-container">
            {staff &&
              staff.map((member) => {
                return (
                  <section key={member._id} className="member-info">
                    <figure className="photo-container ">
                      <img
                        className="photo"
                        src={member.image}
                        alt={member.name}
                      />
                    </figure>
                    <h3 className="staff-title"> {member.title} </h3>
                    <p className="staff"> {member.fullName} </p>
                    <p className="staff"> {member.email} </p>
                    <p className="staff"> {member.phone} </p>
                    <p className="staff"> {member.year} </p>
                    <p></p>
                  </section>
                );
              })}
          </div>
        </article>
      </section>
    </main>
  );
};

export default AboutPage;
