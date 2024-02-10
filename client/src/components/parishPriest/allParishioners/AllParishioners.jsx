import React from 'react';

const AllParishioners = () => {
  const currentdate = new Date();
  const currentYear = currentdate.getFullYear();
  return (
    <section>
      <h1>
        Current Members of the Eritrean Roman Catholic Church in Hamburg in
        <strong className="year">{currentYear} </strong>
      </h1>
    </section>
  );
};

export default AllParishioners;
