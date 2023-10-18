import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <div className="navigation-buttons">
          <Link to="/list">
            <button>ListView</button>
          </Link>
          <Link to="/gallery">
            <button>GalleryView</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;