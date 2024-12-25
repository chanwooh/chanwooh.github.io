import React from 'react';
import './Header.css';

function Header(props) {
  return (
    <header className="header">
    	<div className="header-wrapper">
        <div className="header-details">
          <div className="header-title">The Crossword</div>
          <div className="header-date">May 7, 2023</div>
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
