import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Courses from 'material-ui/svg-icons/communication/import-contacts';
import Tutors from 'material-ui/svg-icons/social/people';
import Settings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const style = {
  margin: 12,
  color: '#8AA62F',
};


const AdminApplication = props => {
  const { pathname } = props.location;
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <MuiThemeProvider>
            <div>
              <div>
                <RaisedButton
                  label={pathname.indexOf('course') >= 0 ? '> Courses <' : 'Courses'}
                  primary
                  icon={<Courses />}
                  style={style}
                  containerElement={<Link to={'/admin/course/'} />}
                />
                <RaisedButton
                  label="Tutors"
                  primary
                  icon={<Tutors />}
                  style={style}
                  disabled
                />
                <RaisedButton
                  label={pathname.indexOf('settings') >= 0 ? '> Settings <' : 'Settings'}
                  icon={<Settings />}
                  style={style}
                  backgroundColor="#1A237E"
                  labelColor="#ffffff"
                  containerElement={<Link to={'/admin/settings/'} />}
                />
              </div>
              <div>
                <Divider />
              </div>
            </div>
          </MuiThemeProvider>
        </div>
        <div className="row">
          {props.children}
        </div>
      </div>
    </div>);
};

AdminApplication.propTypes = {
  children: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};

export default AdminApplication;


/*

 import React, { PropTypes } from 'react';
 import * as ActionCreators from '../../redux/actions/ActionCreators';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import AdminCoursesListViewWrapper from './AdminCoursesListView';
 import AdminCoursesItemPanel from './AdminCoursesItemPanel';
 import AdminCourseDeleteDialogWrapper from './AdminCourseDeleteDialogView';

 class AdminApplication extends React.Component {

 componentDidMount() {
 this.props.actions.getCoursesDispatcher();
 this.props.actions.getImagesDispatcher();
 }

 render() {
 const { params } = this.props;
 const { courseId } = params;
 const actualCourse = (this.props.coursesData.find(courseItem => courseItem._id === courseId));
 const actualCourseId = actualCourse ? actualCourse._id : null;
 console.log('AdminApplication actualCourseId = ', actualCourseId);
 return (
 <div>
 <div className="container-fluid">
 <div className="row">
 <AdminCourseDeleteDialogWrapper />
 <div className="col-md-3">
 <AdminCoursesListViewWrapper activeCourseId={actualCourseId} />
 </div>
 <div className="col-md-9">
 <AdminCoursesItemPanel activeCourseId={actualCourseId} />
 </div>
 </div>
 </div>
 </div>);
 }
 }

 AdminApplication.propTypes = {
 actions: React.PropTypes.shape({
 getCoursesDispatcher: React.PropTypes.func,
 getImagesDispatcher: React.PropTypes.func,
 }),
 params: PropTypes.object.isRequired,
 coursesData: React.PropTypes.array,
 };

 const mapStateToProps = (state, ownProps) =>
 ({
 coursesData: state.coursesData,
 });

 const mapDispatchToProps = (dispatch) =>
 ({
 actions: {
 getCoursesDispatcher: bindActionCreators(ActionCreators.getCoursesAction, dispatch),
 getImagesDispatcher: bindActionCreators(ActionCreators.getImagesAction, dispatch),
 },
 });

 const AdminMainWrapper =
 connect(mapStateToProps, mapDispatchToProps)(AdminApplication);

 export default AdminMainWrapper;



 */