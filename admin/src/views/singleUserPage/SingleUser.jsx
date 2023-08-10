import React from 'react'
import "./SingleUser.scss"
import Menu from '../../components/menu/Menu';
import SingleItem from '../../components/singleItem/SingleItem';

const SingleUser = () => {
  return (
    <main className="user-page">
      <Menu />
      <div className="user-container">
        <SingleItem />
      </div>
    </main>
  );
}

export default SingleUser