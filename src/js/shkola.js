import React, {Component} from "react"
import ReactDOM from "react-dom"
import { Router, Route, Link, browserHistory } from 'react-router'

import HeaderView from "./view/HeaderView";
import AboutView from "./view/AboutView";
import ContactView from "./view/ContactsView";
import FooterView from "./view/FooterView";
import NavigationView from "./view/NavigationView";
import CoursesView from "./view/CoursesView";
import CourseItemView from "./view/CoursesView";
import CourseModalView from "./view/CourseModalView";
import Classie from "classie";

require('font-awesome/less/font-awesome.less');
require('../less/variables.less');
require('../less/freelancer.less');
require('../js/cbpAnimatedHeader.js');

var cbpAnimatedHeader = (function () {

    var docElem = document.documentElement,
        header = document.querySelector('.navbar-fixed-top'),
        didScroll = false,
        changeHeaderOn = 300;

    function init() {
        window.addEventListener('scroll', function (event) {
            if (!didScroll) {
                didScroll = true;
                setTimeout(scrollPage, 250);
            }
        }, false);
    }

    function scrollPage() {
        var sy = scrollY();
        var header = document.querySelector('.navbar-fixed-top');
        if (sy >= changeHeaderOn) {
            Classie.add(header, 'navbar-shrink');
        }
        else {
            Classie.remove(header, 'navbar-shrink');
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();


class App extends Component {
    

    componentWillMount() {
        this.setState({
            coursesData: []
        });
    }

    componentDidMount() {
        console.log('fetch data');
        fetch('http://localhost:3000/courses-json/').then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    this.setState({
                        coursesData: json
                    });
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
            .catch(function (error) {
                console.error('There has been a problem with your fetch operation: ' + error.message);
            });
    }


    render() {

        const coursesModalViews = this.state.coursesData.map(data => 
            <CourseModalView key={data.id} context={data}/>
        );

        return (<div>

            <NavigationView />
            <HeaderView />
            <CourseItemView items={this.state.coursesData} />
            <AboutView />
            <ContactView />
            <FooterView />

            {/* Scroll to Top Button (Only visible on small and extra-small screen sizes) */}
            <div className="scroll-top page-scroll visible-xs visible-sm">
                <a className="btn btn-primary" href="#page-top">
                    <i className="fa fa-chevron-up"></i>
                </a>
            </div>

            {coursesModalViews}
            
        </div>);

    }
}


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            {/* 
            <Route path="about" component={AboutView}/>
            <Route path="contact" component={ContactView}/>
            <Route path="courses" component={CoursesView}/>
             */}
        </Route>
    </Router>
), document.getElementById('root'));