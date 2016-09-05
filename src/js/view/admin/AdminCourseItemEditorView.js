import React, { Component } from 'react';
import * as Redux from '../common/Redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const editor = {
  display: 'block',
  margin: '3px',
  padding: '3px 20px',
  width: 'auto',
};

const initialState = {
  activeCourseId: null,
  activeCourse: {
    _id: null,
    title: null,
    image: null,
    content: null,
    client: null,
    date: null,
    service: null,
    link: null,
  },
};

class AdminCourseItemEditorView extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      ...this.state, activeCourse: nextProps.activeCourse, activeCourseId: nextProps.activeCourseId,
    };
  }

  txtFieldChange = (event) => {
    event.stopPropagation();
    this.setState({
      ...this.state, activeCourse: {
        ...this.state.activeCourse, [event.target.id.substr(3).toLowerCase()]: event.target.value,
      },
    });
  };

  dialogHandleDeleteConfirm = () => {
    this.props.actions.closeDeleteDialog();
    this.props.actions.deleteCourse(this.props.activeCourse._id);
  };

  dialogHandleClose = () => {
    this.props.actions.closeDeleteDialog();
  };

  saveClick = () => {
    if (this.props.activeCourseId) {
      this.props.actions.saveCourse(this.state.activeCourse);
    } else {
      this.props.actions.createCourse(this.state.activeCourse);
    }
  };

  deleteClick = () => {
    this.props.actions.openDeleteDialog({
      text: 'Are you sure delete selected course?',
      actions: [
        <FlatButton
          label="Confirm"
          secondary
          onTouchTap={this.dialogHandleDeleteConfirm}
        />,
        <FlatButton
          label="Discard"
          primary
          onTouchTap={this.dialogHandleClose}
        />],
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <Paper
          rounded={false}
          style={editor}
        >
          <div>
            <TextField
              value={this.state.activeCourse.title || ''}
              id="txtTitle"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Title"
              floatingLabelFixed
            />
            <TextField
              value={this.state.activeCourse.content || ''}
              id="txtContent"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Content"
              floatingLabelFixed
              rows={3}
              rowsMax={6}
              multiLine
            />
            <TextField
              value={this.state.activeCourse.image || ''}
              id="txtImage"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Image file name"
              floatingLabelFixed
            />
            <TextField
              value={this.state.activeCourse.client || ''}
              id="txtClient"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Client"
              floatingLabelFixed
            />
            <TextField
              value={this.state.activeCourse.date || ''}
              id="txtDate"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Date"
              floatingLabelFixed
            />
            <TextField
              value={this.state.activeCourse.service || ''}
              id="txtService"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Service"
              floatingLabelFixed
            />
            <TextField
              value={this.state.activeCourse.link || ''}
              id="txtLink"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Link"
              floatingLabelFixed
            />
          </div>
          <div>
            <RaisedButton
              label={this.state.activeCourseId ? 'Save' : 'Add'}
              primary
              onTouchTap={() => this.saveClick()}
            />
            <RaisedButton
              label={this.state.activeCourseId ? 'Delete' : 'Cancel'}
              secondary
              style={{ margin: 12 }}
              onTouchTap={() => this.deleteClick()}
            />
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}


AdminCourseItemEditorView.propTypes = {
  actions: React.PropTypes.shape({
    openDeleteDialog: React.PropTypes.func.isRequired,
    closeDeleteDialog: React.PropTypes.func.isRequired,
    createCourse: React.PropTypes.func.isRequired,
    saveCourse: React.PropTypes.func.isRequired,
    deleteCourse: React.PropTypes.func.isRequired,
  }),
  activeCourseId: React.PropTypes.string,
  activeCourse: React.PropTypes.object,
};

const mapStateToProps = (state) =>
  ({
    activeCourseId: state.activeCourseId,
    activeCourse: state.activeCourseId ? state.coursesData.filter(courseItem =>
      courseItem._id === state.activeCourseId)[0] : initialState.activeCourse,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      openDeleteDialog: bindActionCreators(Redux.openDeleteDialogAction, dispatch),
      closeDeleteDialog: bindActionCreators(Redux.closeDeleteDialogAction, dispatch),
      createCourse: bindActionCreators(Redux.createCourseAction, dispatch),
      saveCourse: bindActionCreators(Redux.saveCourseAction, dispatch),
      deleteCourse: bindActionCreators(Redux.deleteCourseAction, dispatch),
    },
  });

const AdminCourseItemEditorViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCourseItemEditorView);

export default AdminCourseItemEditorViewWrapper;
