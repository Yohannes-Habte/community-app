import React from 'react';

const AllChurchEvents = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section>
      <h1>
        Church Events for the Year <strong> {year} </strong>
      </h1>
    </section>
  );
};

export default AllChurchEvents;
