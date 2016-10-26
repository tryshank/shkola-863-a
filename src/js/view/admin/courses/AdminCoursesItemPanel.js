import React, { Component } from 'react';
import AdminCoursesEditorView from './AdminCoursesItemEditorView';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const editor = {
  display: 'block',
  margin: '3px',
  padding: '3px 20px',
  width: 'auto',
};

const initialState = {
  activeCourseId: null,
};


class AdminCoursesItemPanel extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      ...this.state,
      activeCourseId: nextProps.activeCourseId,
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper rounded={false} style={editor}>
          {this.state.activeCourseId ?
            <div>
              <AdminCoursesEditorView activeCourseId={this.state.activeCourseId} />
            </div>
          :
            <div style={{ textAlign: 'center' }}>
              <TextField
                value="Please select course in left menu"
                id="txtSelectCourse"
                fullWidth
                style={{ textAlign: 'center', cursor: 'none', fontSize: '32px' }}
                underlineShow={false}
                disabled
              />
            </div>
          }
        </Paper>
      </MuiThemeProvider>
    );
  }
}


AdminCoursesItemPanel.propTypes = {
  activeCourseId: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) =>
  ({
    activeCourseId: ownProps.activeCourseId ? ownProps.activeCourseId : state.activeCourseId,
  });

const AdminCoursesItemPanelWrapper =
  connect(mapStateToProps)(AdminCoursesItemPanel);

export default withRouter(AdminCoursesItemPanelWrapper);
