import React from 'react';
import './SingleMember.scss';
import Menu from '../../components/menu/Menu';
import SingleItem from '../../components/singleItem/SingleItem';

const SingleMember = () => {
  return (
    <main className="user-page">
      <Menu />
      <div className="user-container">
        <SingleItem />
      </div>
    </main>
  );
};

export default SingleMember;
