import React from 'react';

const AllChurchServices = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section>
      <h1>
        Church Services for the Year <strong> {year} </strong>{' '}
      </h1>
    </section>
  );
};

export default AllChurchServices;
