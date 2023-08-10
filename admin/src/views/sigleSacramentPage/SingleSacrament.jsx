import React from 'react'
import "./SigleSacrament.scss"
import Menu from '../../components/menu/Menu';
import SingleItem from '../../components/singleItem/SingleItem';

const SingleSacrament = () => {
  return (
    <main className="product-page">
      <Menu />
      <div className="product-container">
        <SingleItem />
      </div>
    </main>
  );
}

export default SingleSacrament