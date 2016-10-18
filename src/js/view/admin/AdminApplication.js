import React, { PropTypes } from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminCoursesListViewWrapper from './AdminCoursesListView';
import AdminCourseItemEditorView from './AdminCourseItemEditorView';
import AdminSettingsView from './AdminSettingsView';
import AdminCourseDeleteDialogWrapper from './AdminCourseDeleteDialogView';

class AdminApplication extends React.Component {

  componentDidMount() {
    console.log('getCoursesDispatcher');
    this.props.actions.getCoursesDispatcher();
    console.log('getImagesDispatcher');
    this.props.actions.getImagesDispatcher();
    console.log('getSettingsMail');
    this.props.actions.getSettingsMail();
  }

  render() {
    const { params } = this.props;
    const { course } = params;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminCourseDeleteDialogWrapper />
            <div className="col-md-3">
              <AdminCoursesListViewWrapper activeCourseId={course} />
            </div>
            <div className="col-md-9">
              {/*
              <AdminCourseItemEditorView activeCourseId={course} />
              */}
              <AdminSettingsView />
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
    getSettingsMail: React.PropTypes.func,
  }),
  params: PropTypes.object.isRequired,
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
      getSettingsMail: bindActionCreators(ActionCreators.getSettingsMail, dispatch),
    },
  });

const AdminMainWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminApplication);

export default AdminMainWrapper;
