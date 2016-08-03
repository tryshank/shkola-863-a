import React from 'react';
import { Link } from 'react-router';

const NavigationView = () =>

  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header page-scroll">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a
          className="navbar-brand"
          href="#page-top"
        >Start Bootstrap</a>
      </div>
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <ul className="nav navbar-nav navbar-right">
          <li className="hidden">
            <a href="#page-top"></a>
          </li>
          <li className="page-scroll">
            <Link to="/courses">Courses</Link>
          </li>
          <li className="page-scroll">
            <Link to="/about">About</Link>
          </li>
          <li className="page-scroll">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>;

export default NavigationView;
