import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HeaderView from './view/HeaderView';
import AboutView from './view/AboutView';
import ContactView from './view/ContactsView';
import FooterView from './view/FooterView';
import NavigationView from './view/NavigationView';
import HowToFindView from './view/HowToFindView';
import CoursesViewWrapper from './view/CoursesViewWrapper';
import Classie from 'classie';
import { Provider } from 'react-redux';
import * as Redux from './view/Redux';
// import { createAction } from 'redux-actions';
// import * as WebAPI from './view/WebAPI';

require('font-awesome/less/font-awesome.less');
require('../less/variables.less');
require('../less/freelancer.less');

//

// GOOGLE MAP
const initialCenter = { lng: 27.537461, lat: 53.891295 };
const zoom = 17;
const marker = [{
  position: initialCenter,
  key: 'Imaguru',
  defaultAnimation: 2,
}];

(() => {
  const docElem = document.documentElement;
  const changeHeaderOn = 300;
  let didScroll = false;

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  function scrollPage() {
    const sy = scrollY();
    const header = document.querySelector('.navbar-fixed-top');
    if (sy >= changeHeaderOn) {
      Classie.add(header, 'navbar-shrink');
    } else {
      Classie.remove(header, 'navbar-shrink');
    }
    didScroll = false;
  }

  function init() {
    window.addEventListener('scroll', () => {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 250);
      }
    }, false);
  }

  init();
})();


class App extends Component {

  componentDidMount() {
    console.log('App componentDidMount');
  }

  render() {
    console.log('App render');
    return (
      <div>
        <NavigationView />
        <HeaderView />
        <CoursesViewWrapper />
        <AboutView />
        <HowToFindView
          markers={marker}
          zoom={zoom}
          initialCenter={initialCenter}
        />
        <ContactView />
        <FooterView />
        {/* Scroll to Top Button (Only visible on small and extra-small screen sizes) */}
        <div className="scroll-top page-scroll visible-xs visible-sm">
          <a
            className="btn btn-primary"
            href="#page-top"
          >
            <i className="fa fa-chevron-up" />
          </a>
        </div>
        {/*
        {coursesData.map(data =>
          <CourseModalView
            key={data.id}
            context={data}
          />
        )};
        */}
      </div>
    );
  }
}

ReactDOM.render((
  <Provider store={Redux.store}>
    <App />
  </Provider>
), document.getElementById('root'));

