import React from 'react';
import './Header.css';

function Header(props) {
  return (
    <header className="header">
    	<div className="header-wrapper">
        <div className="header-details">
          <div className="header-title">The Mini Jessie</div>
          <div className="header-date">February 24, 2022</div>
          <div className="header-author">
            <span>By Kali De Cambra</span>
          </div>
        </div>
        <div className="placeholder"></div>
      </div>
    </header>
  );
}

export default Header;
