import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AdminCoursesEditorView from './AdminCoursesItemEditorView';
import AdminCoursesItemEditorButtonsView from './AdminCoursesItemEditorButtonsView';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { EDITOR_STATE_NEW_COURSE } from '../../redux/reducers/ActiveCourseId';

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
    console.log('AdminCoursesItemPanel constructor ', props);
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    console.log('AdminCoursesItemPanel componentWillReceiveProps ', nextProps);
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
              <AdminCoursesItemEditorButtonsView activeCourseId={this.state.activeCourseId} />
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

const mapStateToProps = (state, ownProps) => {
  const activeCourseId = ownProps.activeCourseId || state.activeCourseId;
  return ({
    activeCourseId: ownProps.activeCourseId ? ownProps.activeCourseId : state.activeCourseId,
  });
};

const mapDispatchToProps = (dispatch) =>
  ({
  });

const AdminCoursesItemPanelWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesItemPanel);

export default withRouter(AdminCoursesItemPanelWrapper);
