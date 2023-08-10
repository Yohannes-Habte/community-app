import React from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import { menu } from '../../data/Data';

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => {
        return (
          <div key={item.id} className="items">
            <span className="title"> {item.title} </span>
            {item.listItems.map((listItem) => {
              return (
                <NavLink
                  className={'link-list-item'}
                  to={listItem.url}
                  key={listItem.id}
                >
                  {listItem.icon}
                  <span className="item"> {listItem.itemName} </span>
                </NavLink>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
