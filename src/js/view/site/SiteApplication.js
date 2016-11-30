import React, { PropTypes } from 'react';
import AboutView from './AboutView';
import FooterView from './FooterView';
import NavigationView from './NavigationView';
import HowToFindView from './HowToFindView';
import ContactView from './ContactsView';
import CoursesViewWrapper from './CoursesView';
import CourseModal from './CourseModal';
import CTCoursesViewWrapper from './CTCoursesView';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { connect } from 'react-redux';

class SiteApplication extends React.Component {

  constructor(props) {
    const { params } = props;
    const { courseId } = params;
    super(props);
    this.state = {
      ...this.state, courseId,
    };
  }

  componentDidMount() {
    this.props.getCoursesDispatcher();
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      ...this.state, courseId: nextProps.params.courseId,
    };
  }

  render() {
    return (
      <div>
        <div>
          {this.state.courseId ?
            <CourseModal courseId={this.state.courseId} /> :
            <div>
              <NavigationView />
              <CoursesViewWrapper />
              <CTCoursesViewWrapper />
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
            </div>
          }
        </div>
      </div>
    );
  }

}

SiteApplication.propTypes = {
  params: PropTypes.object.isRequired,
  getCoursesDispatcher: React.PropTypes.func,
};

const mapStateToProps = (state) =>
  ({ coursesData: state.coursesData });


const mapDispatchToProps = (dispatch) =>
  ({ getCoursesDispatcher: (type) => dispatch(ActionCreators.getCoursesAction(type))});

const SiteApplicationWrapper = connect(mapStateToProps, mapDispatchToProps)(SiteApplication);

export default SiteApplicationWrapper;
