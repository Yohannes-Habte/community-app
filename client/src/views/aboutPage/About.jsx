import React, { useEffect, useState } from 'react';
import { aboutPage } from '../../data/Data';
import './About.scss';
import axios from 'axios';
const About = () => {
  // Local variables
  const [staff, setStaff] = useState([]);
  const [toggle, setToggle] = useState(0);

  // Function to manage tabs
  const tabsToggle = (index) => {
    setToggle(index);
  };

  // Display staff members in the browser
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/committees'
        );
        setStaff(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStaff();
  }, []);

  return (
    <main className="about-page">
      <section className="about-container">
        <h1 className="about-title"> {aboutPage.title} </h1>

        <div className="tabs-content">
          {/* Tabs or menue  */}
          <div className="blog-tabs">
            <div
              onClick={() => tabsToggle(0)}
              className={toggle === 0 ? 'tabs active-tabs' : 'tabs'}
            >
              Mission
            </div>

            <div
              onClick={() => tabsToggle(1)}
              className={toggle === 1 ? 'tabs active-tabs' : 'tabs'}
            >
              Vision
            </div>

            <div
              onClick={() => tabsToggle(2)}
              className={toggle === 2 ? 'tabs active-tabs' : 'tabs'}
            >
              Values
            </div>

            <div
              onClick={() => tabsToggle(3)}
              className={toggle === 3 ? 'tabs active-tabs' : 'tabs'}
            >
              Staff
            </div>
          </div>

          {/* Contents or results when you click the tabs */}
          <div className="contents">
            {/* Holy Savior Mission */}
            <div
              onClick={() => tabsToggle(0)}
              className={toggle === 0 ? 'content active-content' : 'content'}
            >
              {aboutPage.mission}
            </div>

            {/* Holy Savior Vision */}
            <div
              onClick={() => tabsToggle(1)}
              className={toggle === 1 ? 'content active-content' : 'content'}
            >
              {aboutPage.vision}
            </div>

            {/* Holy Savior Values */}
            <div
              onClick={() => tabsToggle(2)}
              className={toggle === 2 ? 'content active-content' : 'content'}
            >
              <section className="values">
                {aboutPage.values.map((value) => {
                  return (
                    <article className="value">
                      <h4 className="subtitle"> {value.value} </h4>
                      <p className="description"> {value.desc} </p>
                    </article>
                  );
                })}
              </section>
            </div>

            {/* Council of the Holy Redeemer Parish */}
            <div
              onClick={() => tabsToggle(3)}
              className={toggle === 3 ? 'content active-content' : 'content'}
            >
              <section className="members">
                {staff.map((member) => {
                  return (
                    <div className="member-info">
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
        </div>
      </section>
    </main>
  );
};

export default About;
