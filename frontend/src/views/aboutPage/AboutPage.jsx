import { useEffect, useState } from "react";
import "./AboutPage.scss";
import axios from "axios";
import Header from "../../components/user/layout/header/Header";
import { API } from "../../utiles/securitiy/secreteKey";
const AboutPage = () => {
  // Local variables
  const [staff, setStaff] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [aboutInfos, setAboutInfos] = useState(null);

  // Function to manage tabs using index number
  const tabsToggle = (index) => {
    setToggle(index);
  };

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
        setStaff(data);
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
            {staff.map((member) => {
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

        <article className="tabs-content">
          {/* Contents or results when you click the tabs */}
          <div className="contents">
            {/* Holy Savior Mission */}
            <div
              onClick={() => tabsToggle(0)}
              className={toggle === 0 ? "content active-content" : "content"}
            >
              {aboutInfos?.mission}
            </div>

            {/* Holy Savior Vision */}
            <div
              onClick={() => tabsToggle(1)}
              className={toggle === 1 ? "content active-content" : "content"}
            >
              {aboutInfos?.vision}
            </div>

            {/* Holy Savior Values */}
            <div
              onClick={() => tabsToggle(2)}
              className={toggle === 2 ? "content active-content" : "content"}
            >
              <section className="values">
                {aboutInfos?.values.map((value, index) => {
                  return (
                    <article key={index} className="value">
                      <h4 className="subtitle"> {value.name} </h4>
                      <p className="description"> {value.desc} </p>
                    </article>
                  );
                })}
              </section>
            </div>

            {/* Council of the Holy Redeemer Parish */}
            <div
              onClick={() => tabsToggle(3)}
              className={toggle === 3 ? "content active-content" : "content"}
            >
              <section className="members">
                {staff.map((member) => {
                  return (
                    <div key={member._id} className="member-info">
                      <figure className="photo-container">
                        <img
                          className="photo"
                          src={member.image}
                          alt={member.firstName}
                        />
                      </figure>

                      <article className="contact-details">
                        <h2 className="staff-member-title"> {member.title} </h2>
                        <p className="staff-member-info"> {member.fullName} </p>
                        <p className="staff-member-info"> {member.phone} </p>
                        <p className="staff-member-info"> {member.email} </p>
                      </article>
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default AboutPage;
