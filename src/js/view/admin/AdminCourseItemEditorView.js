import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Redux from '../common/Redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const editor = {
  display: 'block',
  margin: '3px',
  padding: '3px 20px',
  width: 'auto',
};


const initialState = {
  activeCourseId: null,
  activeCourseImage: null,
  imagesFiles: [],
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
    const activeCourse = nextProps.activeCourseImage ?
      { ...nextProps.activeCourse, image: nextProps.activeCourseImage } : nextProps.activeCourse;
    this.state = {
      ...this.state,
      activeCourse,
      activeCourseId: nextProps.activeCourseId,
      imagesFiles: nextProps.imagesFiles,
    };
    console.log('componentWillReceiveProps', this.state);
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

  uploadFileNameChange = (e) => {
    e.preventDefault();
    this.props.actions.imageUpload(e.target.files[0]);
  };

  openFileDialog = () => {
    /*
       TODO: check this is best solution
       https://github.com/callemall/material-ui/issues/647
    */
    const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  };

  handleImageFileNameChanged = (event, index, value) => {
    console.log(event, index, value);
    this.setState({
      ...this.state, activeCourse: {
        ...this.state.activeCourse, image: value,
      },
    });
    // this.setState({value});
  };

  render() {
    console.log('render ', this.state);
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
            <div>
              <Divider />
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-8">
                <div>
                  <SelectField
                    value={this.state.activeCourse.image || ''}
                    onChange={this.handleImageFileNameChanged}
                    maxHeight={200}
                    floatingLabelText="Image file name"
                    floatingLabelFixed
                    fullWidth
                  >
                    {
                      this.state.imagesFiles.length ?
                        this.state.imagesFiles.map(item =>
                          <MenuItem value={item} key={item} primaryText={item} />)
                        : null
                    }
                  </SelectField>
                </div>
                <div>
                  <FlatButton
                    label="Upload image"
                    onClick={this.openFileDialog}
                    primary
                  />
                  <input
                    ref="fileUpload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={this.uploadFileNameChange}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-4">
                {this.state.activeCourse.image ?
                  <img
                    src={this.state.activeCourse.image ?
                    `server/img/${this.state.activeCourse.image}` : ''}
                    style={{ height: '100px', display: 'inline-block',
                             float: 'none', overflow: 'hide',
                             position: 'relative', left: '-20px', top: '5px' }}
                    alt="preview"
                  /> : null
                }
              </div>
            </div>
            <div style={{ fontSize: '1px' }}>&nbsp;</div>
            <div>
              <Divider />
            </div>
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
    imageUpload: React.PropTypes.func.isRequired,
  }),
  activeCourseId: React.PropTypes.string,
  activeCourse: React.PropTypes.object,
  activeCourseImage: React.PropTypes.string,
  imagesFiles: React.PropTypes.array,
};

const mapStateToProps = (state) =>
  ({
    activeCourseId: state.activeCourseId,
    activeCourseImage: state.activeCourseImage,
    imagesFiles: state.imagesFiles,
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
      imageUpload: bindActionCreators(Redux.imageUploadAction, dispatch),
    },
  });

const AdminCourseItemEditorViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCourseItemEditorView);

export default AdminCourseItemEditorViewWrapper;
