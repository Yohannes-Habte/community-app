import React from 'react';
import './TopBox.scss';
import { topDealUsers } from '../../data/Data';

const TopBox = () => {
  return (
    <section className="first-top-box">
      <h3 className="title"> Top Deals </h3>
      <div className="list-items">
        {topDealUsers.map((user) => {
          return (
            <div key={user.id} className="list-item">
              <div className="user">
                <img className="image" src={user.img} alt={user.username} />
                <div className="name-email">
                  <span className="name"> {user.username} </span>
                  <span className="email"> {user.email} </span>
                </div>
              </div>
              <span className="amount"> ${user.amount} </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopBox;
