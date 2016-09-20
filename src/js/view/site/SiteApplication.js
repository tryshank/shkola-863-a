import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AboutView from './AboutView';
import FooterView from './FooterView';
import NavigationView from './NavigationView';
import HowToFindView from './HowToFindView';
import CoursesViewWrapper from './CoursesView';
import CourseModal from './CourseModal';

class SiteApplication extends Component {

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    const { params } = this.props;
    const { course } = params;
    return (
      <div>
        <div>
          {course ?
            <CourseModal course={course} /> :
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
            </div>
          }
        </div>
      </div>
    );
  }
}

SiteApplication.propTypes = {
  params: PropTypes.object.isRequired,
};

export default SiteApplication;
