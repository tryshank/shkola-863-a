import React, { PropTypes } from 'react';
import * as Redux from '../common/Redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminCoursesListViewWrapper from './AdminCoursesListView';
import AdminCourseItemEditorView from './AdminCourseItemEditorView';
import AdminCourseDeleteDialogWrapper from './AdminCourseDeleteDialogView';
import injectTapEventPlugin from 'react-tap-event-plugin';

class AdminApplication extends React.Component {

  componentWillMount() {
    injectTapEventPlugin();
  }

  componentDidMount() {
    this.props.actions.getCoursesDispatcher('server');
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
              <AdminCourseItemEditorView activeCourseId={course} />
            </div>
          </div>
        </div>
      </div>);
  }
}

AdminApplication.propTypes = {
  actions: React.PropTypes.shape({
    getCoursesDispatcher: React.PropTypes.func,
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
      getCoursesDispatcher: bindActionCreators(Redux.getCoursesAction, dispatch),
    },
  });

const AdminMainWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminApplication);

export default AdminMainWrapper;