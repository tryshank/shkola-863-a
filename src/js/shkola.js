import React from 'react';
import ReactDOM from 'react-dom';
import SiteApplication from './view/site/SiteApplication';
import AdminMainWrapper from './view/admin/AdminMainWrapper';
// import Classie from 'classie';
import { Provider } from 'react-redux';
import * as Redux from './view/common/Redux';
import { Router, Route, browserHistory } from 'react-router';
require('../less/variables.less');
require('../less/freelancer.less');
require('bootstrap-less');
require('font-awesome/less/font-awesome.less');
require('../less/shkola.less');
require('../less/admin.less');
require('./freelancer');
require('./jqBootstrapValidation');
require('./contact_me');

//

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
        <HowToFindView />
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
        <CoursesModalViewWrapper />
      </div>
    );
  }
}


ReactDOM.render((
  <Provider store={Redux.store}>
    <Router history={browserHistory}>
      <Route path="/admin" component={AdminMainWrapper} />
      <Route path="/(:course)" component={SiteApplication} />
    </Router>
  </Provider>
), document.getElementById('root'));
