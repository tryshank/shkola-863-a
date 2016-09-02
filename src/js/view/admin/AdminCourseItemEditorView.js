import React, { Component } from 'react';
import * as Redux from '../common/Redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import * as AdminCourseDeleteDialogView  from './AdminCourseDeleteDialogView';

const style = {
  display: 'block',
  margin: '3px',
  width: 'auto',
};

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

  componentDidMount() {
    console.log('admin editor mount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
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
    console.log(this.props.actions.deleteCourse(this.props.activeCourse._id));
    // TODO: remove course from list and update activeCourseId
  };

  dialogHandleClose = () => {
    this.props.actions.closeDeleteDialog();
  };

  saveClick = () => {
    console.log('saveCourse ', this.props.actions.saveCourse(this.state.activeCourse));
  };

  deleteClick = () => {
    console.log('delete');
    this.props.actions.openDeleteDialog(
      {
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
      }
    );
  }

  render() {
    return (
      <Paper
        rounded={false}
        style={editor}
      >
        <div>
          <TextField value={this.state.activeCourse.title || ''}
                     id="txtTitle"
                     onChange={this.txtFieldChange}
                     fullWidth={true}
                     floatingLabelText="Title"
                     floatingLabelFixed={true}
          />
          <TextField value={this.state.activeCourse.content || ''}
                     id="txtContent"
                     onChange={this.txtFieldChange}
                     fullWidth={true}
                     floatingLabelText="Content"
                     floatingLabelFixed={true}
                     rows={3}
                     rowsMax={6}
                     multiLine={true}
          />
          <TextField value={this.state.activeCourse.image || ''}
                     id="txtImage"
                     onChange={this.txtFieldChange}
                     fullWidth={true}
                     floatingLabelText="Image file name"
                     floatingLabelFixed={true}
          />
          <TextField value={this.state.activeCourse.client || ''}
                     id="txtClient"
                     onChange={this.txtFieldChange}
                     fullWidth={true}
                     floatingLabelText="Client"
                     floatingLabelFixed={true}
          />
          <TextField value={this.state.activeCourse.date || ''}
                     id="txtDate"
                     onChange={this.txtFieldChange}
                     fullWidth={true}
                     floatingLabelText="Date"
                     floatingLabelFixed={true}
          />
          <TextField value={this.state.activeCourse.service || ''}
                     id="txtService"
                     onChange={this.txtFieldChange}
                     fullWidth={true}
                     floatingLabelText="Service"
                     floatingLabelFixed={true}
          />
          <TextField value={this.state.activeCourse.link || ''}
                     id="txtLink"
                     onChange={this.txtFieldChange}
                     fullWidth={true}
                     floatingLabelText="Link"
                     floatingLabelFixed={true}
          />
        </div>
        <div>
          <RaisedButton label="Save"
                        primary
                        onTouchTap={() => this.saveClick()}
          />
          <RaisedButton label="Delete"
                        secondary
                        style={{ margin: 12 }}
                        onTouchTap={() => this.deleteClick()}
          />
        </div>
      </Paper>
    );
  }
}


const mapStateToProps = (state) => {
  console.log('editor map2props ',state);
  return ({
    activeCourseId: state.activeCourseId,
    activeCourse: state.activeCourseId ? state.coursesData.filter(courseItem =>
      courseItem._id === state.activeCourseId)[0] : initialState.activeCourse,
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      openDeleteDialog: bindActionCreators(Redux.openDeleteDialog, dispatch),
      closeDeleteDialog: bindActionCreators(Redux.closeDeleteDialog, dispatch),
      saveCourse: bindActionCreators(Redux.saveCourse, dispatch),
      deleteCourse: bindActionCreators(Redux.deleteCourse, dispatch),
    },
  };
};

const AdminCourseItemEditorViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCourseItemEditorView);

export default AdminCourseItemEditorViewWrapper;
