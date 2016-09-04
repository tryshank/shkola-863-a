import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AdminCoursesListViewWrapper from './AdminCoursesListView';
import AdminCourseItemEditorView from './AdminCourseItemEditorView';
import AdminCourseDeleteDialogWrapper from './AdminCourseDeleteDialogView';


class AdminMainView extends React.Component {

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
