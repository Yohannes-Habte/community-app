import React from 'react';

const ChurchCommittee = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section>
      <h1>
        Church Committee Members in <strong> {year} </strong>{' '}
      </h1>
    </section>
  );
};

export default ChurchCommittee;
