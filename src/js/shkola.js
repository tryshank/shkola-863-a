import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import HeaderView from './view/site/HeaderView';
import AboutView from './view/site/AboutView';
// import ContactView from './view/site/ContactsView';
import FooterView from './view/site/FooterView';
import NavigationView from './view/site/NavigationView';
import HowToFindView from './view/site/HowToFindView';
import CoursesViewWrapper from './view/site/CoursesView';
import CoursesModalViewWrapper from './view/site/CoursesModalView';
import AdminMainWrapper from './view/admin/AdminMainWrapper';
// import Classie from 'classie';
import { Provider } from 'react-redux';
import * as Redux from './view/common/Redux';
import { Router, Route, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

require('font-awesome/less/font-awesome.less');
require('../less/variables.less');
require('../less/freelancer.less');

injectTapEventPlugin();

//

/*
(() => {
  const docElem = document.documentElement;
  const changeHeaderOn = 5;
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
*/

class App extends Component {

  componentDidMount() {
    console.log('App componentDidMount');
  }

  render() {
    console.log('App render');
    return (
      <div>
        <NavigationView />
        <CoursesViewWrapper />
        <AboutView />
        <HowToFindView />
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
        <CoursesModalViewWrapper />
      </div>
    );
  }
}


ReactDOM.render((
  <Provider store={Redux.store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="/admin" component={AdminMainWrapper} />
    </Router>
  </Provider>
), document.getElementById('root'));
