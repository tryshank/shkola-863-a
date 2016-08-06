import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import HeaderView from './view/HeaderView';
import AboutView from './view/AboutView';
import ContactView from './view/ContactsView';
import FooterView from './view/FooterView';
import NavigationView from './view/NavigationView';
import CoursesView from './view/CoursesView';
import CourseModalView from './view/CourseModalView';
import HowToFindView from './view/HowToFindView';
import Classie from 'classie';

require('font-awesome/less/font-awesome.less');
require('../less/variables.less');
require('../less/freelancer.less');

const initialCenter = { lng: 27.537461, lat: 53.891295 };
const zoom = 17;
const marker = [{
  position: initialCenter,
  key: 'Imaguru',
  defaultAnimation: 2,
}];

(() => {
  const docElem = document.documentElement;
  const header = document.querySelector('.navbar-fixed-top');
  const changeHeaderOn = 300;
  let didScroll = false;

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  function scrollPage() {
    const sy = scrollY();
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

  console.log('z');
  //init();
})();


class App extends Component {

  componentWillMount() {
    this.setState({
      coursesData: [],
    });
  }

  componentDidMount() {
    console.log('fetch data');
    fetch('http://localhost:3000/courses-json/').then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          this.setState({
            coursesData: json,
          });
        });
      } else {
        console.log('Network response was not ok.');
      }
    })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation: ' & error.message);
      });
  }

  render() {
    const coursesModalViews = this.state.coursesData.map(data =>
      <CourseModalView
        key={data.id}
        context={data}
      />
    );

    return (<div>
      <NavigationView />
      <HeaderView />
      <CoursesView
        items={this.state.coursesData}
      />
      <AboutView />
      <HowToFindView
        markers={marker} zoom={zoom} initialCenter={initialCenter}
      />
      <ContactView />
      <FooterView />
      {/* Scroll to Top Button (Only visible on small and extra-small screen sizes) */}
      <div className="scroll-top page-scroll visible-xs visible-sm">
        <a
          className="btn btn-primary"
          href="#page-top"
        >
          <i className="fa fa-chevron-up"></i>
        </a>
      </div>
      {coursesModalViews}
    </div>);
  }
}

{/*
 <Router history={browserHistory}>
 <Route
 path="/"
 component={GoogleMapView}
 >
 {/*
 <Route path="about" component={AboutView}/>
 <Route path="contact" component={ContactView}/>
 <Route path="courses" component={CoursesView}/>
 * //}
 </Route>
 </Router>
 */}


ReactDOM.render((
  <App />
), document.getElementById('root'));
