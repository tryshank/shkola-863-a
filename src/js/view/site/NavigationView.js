import React from 'react';
import Localization from '../common/Localization';

const locale = Localization.navBar;

const NavigationView = () =>

  <nav className="navbar navbar-default navbar-fixed-top navbar-custom affix">
    <div className="container">
      <div className="navbar-header page-scroll">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a
          className="navbar-brand"
          href="#page-top"
        >
          SHKOLA-A
        </a>
      </div>
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <ul className="nav navbar-nav navbar-right">
          <li className="hidden">
            <a href="#page-top"></a>
          </li>
          <li className="page-scroll active">
            <a href="#courses">{locale.courses}</a>
          </li>
          <li className="page-scroll">
            <a href="#ctcourses">{locale.ctcourses}</a>
          </li>
          <li className="page-scroll">
            <a href="#about">{locale.about}</a>
          </li>
          <li className="page-scroll">
            <a href="#howtofind">{locale.howtofind}</a>
          </li>
          <li className="page-scroll">
            <a href="#contact">{locale.contact}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>;

export default NavigationView;
