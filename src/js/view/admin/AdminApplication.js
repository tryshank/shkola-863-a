import React, { PropTypes } from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminCoursesListViewWrapper from './AdminCoursesListView';
import AdminCourseItemEditorView from './AdminCourseItemEditorView';
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
    console.log('actualCourseId = ', actualCourseId);
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminCourseDeleteDialogWrapper />
            <div className="col-md-3">
              <AdminCoursesListViewWrapper activeCourseId={actualCourseId} />
            </div>
            <div className="col-md-9">
              <AdminCourseItemEditorView activeCourseId={actualCourseId} />
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
