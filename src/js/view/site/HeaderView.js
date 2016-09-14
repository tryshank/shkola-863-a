import React from 'react';
const profileImage = require('../../../img/profile.png');

const HeaderView = () =>
  <header>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <img
            src={profileImage}
            alt=""
          />
          <div className="intro-text">
            <span className="name">Start Bootstrap</span>
            <hr
              className="star-light"
            />
            <span className="skills">Web Developer - Graphic Artist - User Experience Designer
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>;

export default HeaderView;
