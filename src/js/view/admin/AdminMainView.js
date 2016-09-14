import React, { Component } from 'react';
import AdminCoursesListViewWrapper from './AdminCoursesListView';
import AdminCourseItemEditorView from './AdminCourseItemEditorView';
import AdminCourseDeleteDialogWrapper from './AdminCourseDeleteDialogView';
import injectTapEventPlugin from 'react-tap-event-plugin';

class AdminMainView extends Component {

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <AdminCourseDeleteDialogWrapper />
            <div className="col-md-3">
              <AdminCoursesListViewWrapper />
            </div>
            <div className="col-md-9">
              <AdminCourseItemEditorView />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminMainView;
