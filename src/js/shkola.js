import React from 'react';
import ReactDOM from 'react-dom';
import SiteApplication from './view/site/SiteApplication';
import Classie from 'classie';
import { Provider } from 'react-redux';
import * as Redux from './redux/Redux';
import { Router, Route, browserHistory } from 'react-router';
import auth from './utils/auth/auth';
import $scripts from 'scriptjs';

require('../less/variables.less');
require('../less/freelancer.less');
require('bootstrap-less');
require('font-awesome/less/font-awesome.less');
require('../less/shkola.less');
require('../less/admin.less');
require('./freelancer');

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

function requireAuth(nextState, replace, next) {
  auth.ensureAuthenticated()
    .then((res) => {
      if (res.status === 401) {
        replace({
          pathname: '/admin/login',
          state: { nextPathname: nextState.location.pathname },
        });
      }
      next();
    });
}


export const loadScript = (uri) =>
  new Promise((res) => {
    $scripts(uri, () => {
      res();
    });
  });

export const loadModule = (path, subModules = []) =>
  (location, callback) =>
    new Promise(res => {
      require.ensure([], require => {
        callback(null, require(path).default);
        res();
      });
    });

export const loadRoute = (path, { scripts = [], subModules = [] } = {}) =>
  (location, callback) =>
    Promise.all(
      scripts.map(uri => loadScript(uri))
    ).then(
      () => loadModule(path, subModules)(location, callback)
    );


ReactDOM.render((
  <Provider store={Redux.store}>
    <Router history={browserHistory}>
      <Route
        path="/admin/login"
        getComponent={loadRoute('./view/admin/LoginView.js')}
      />
      <Route
        path="/admin"
        getComponent={loadRoute('./view/admin/AdminApplication.js')}
        onEnter={requireAuth}
      >
        <Route
          path="course(/:courseId)"
          getComponent={
            loadRoute(
              './view/admin/courses/AdminCoursesView.js',
              { scripts: ['//cdn.tinymce.com/4/tinymce.min.js'] }
            )
          }
          onEnter={requireAuth}
        />
        <Route
          path="settings"
          getComponent={loadRoute('./view/admin/AdminSettingsView.js')}
          onEnter={requireAuth}
        />
      </Route>
      <Route path="/(:course)" component={SiteApplication} />
    </Router>
  </Provider>
), document.getElementById('root'));
