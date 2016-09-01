import React, { Component } from 'react';
import List, { ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AdminCoursesListViewWrapper from './AdminCoursesListView';
import AdminCourseItemEditorView from './AdminCourseItemEditorView';
import AdminCourseDeleteDialogWrapper from './AdminCourseDeleteDialogView';

const add = {
  margin: '5px 5px auto auto',
};


class AdminMainView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('admin mount');
  }

  render() {
    console.log('admin render');
    return (
      <MuiThemeProvider>
        <div>
          <div className="container-fluid">
            <div className="row">
              <AdminCourseDeleteDialogWrapper />
              <div className="col-md-3">
                <div style={{ marginTop: '10px' }}>
                  <RaisedButton label="Add new course" primary />
                </div>
                <AdminCoursesListViewWrapper />
              </div>
              <div className="col-md-9">
                <AdminCourseItemEditorView />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AdminMainView;
