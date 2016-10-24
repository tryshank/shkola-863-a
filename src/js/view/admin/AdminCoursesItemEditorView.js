import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import TinyMCE from '../../utils/TinyMCE';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import { EDITOR_STATE_NEW_COURSE } from '../../redux/reducers/ActiveCourseId';

const checkbox = {
  marginTop: 8,
  marginBottom: 8,
};

const initialState = {
  activeCourseId: null,
  activeCourseImage: null,
  imagesFiles: [],
  activeCourse: {
    _id: null,
    title: '',
    image: '',
    content: '',
    client: '',
    date: '',
    service: '',
    link: '',
    visible: false,
  },
  html: '',
  htmlError: '',
};


class AdminCoursesItemEditorView extends Component {

  constructor(props) {
    super(props);
    console.log(Boolean(initialState.activeCourse));
    console.log(Boolean(props.activeCourse));
    this.state = {
      ...initialState,
      activeCourseId: props.activeCourseId ? props.activeCourseId : initialState.activeCourseId,
      activeCourseImage: props.activeCourseImage ?
        props.activeCourseImage : initialState.activeCourseImage,
      imagesFiles: props.imagesFiles ? props.imagesFiles : initialState.imagesFiles,
      activeCourse: props.activeCourse._id ? props.activeCourse : initialState.activeCourse,
    };
    this.txtFieldChange = this.txtFieldChange.bind(this);
    console.log('AdminCoursesItemEditorView constructor props ', props);
    console.log('AdminCoursesItemEditorView constructor state ', this.state);
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
    console.log('AdminCoursesItemEditorView componentWillReceiveProps state ', this.state);
  }

  txtFieldChange = (event) => {
    event.stopPropagation();
    this.setState({
      ...this.state, activeCourse: {
        ...this.state.activeCourse, [event.target.id.substr(3).toLowerCase()]: event.target.value,
      },
    });
  };

  handleContentChange = (event) => {
    this.setState({
      ...this.state, activeCourse: {
        ...this.state.activeCourse, content: event.target.getContent({ format: 'raw' }),
      },
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
    this.setState({
      ...this.state, activeCourse: {
        ...this.state.activeCourse, image: value,
      },
    });
  };

  checkVisible = (e, checked) => {
    this.setState({
      ...this.state,
      activeCourse: {
        ...this.state.activeCourse, visible: checked,
      },
    });
  };

  render() {
    console.log('AdminCoursesItemEditorView render state ', this.state);
    return (
      <MuiThemeProvider>
        <div>
          <Checkbox
            label="Show course in courses list on the client page"
            style={checkbox}
            onCheck={this.checkVisible}
            checked={(this.state.activeCourseId && this.state.activeCourse) ?
          this.state.activeCourse.visible : false}
          />
          <TextField
            value={this.state.activeCourseId ? this.state.activeCourse.title : ''}
            id="txtTitle"
            onChange={this.txtFieldChange}
            fullWidth
            floatingLabelText="Title"
            floatingLabelFixed
          />
          <TextField
            value={''}
            id="txtContent"
            fullWidth
            floatingLabelText="Content"
            floatingLabelFixed
            underlineShow={false}
            rows={0}
            style={{ paddingBottom: '20px', padding: '0', margin: '0' }}
            inputStyle={{ cursor: 'default', visibility: 'hidden' }}
          />
          <TinyMCE
            content={(this.state.activeCourseId && this.state.activeCourse) ?
            this.state.activeCourse.content : ''}
            config={{
              plugins: 'autolink link image lists preview textcolor',
              menubar: false,
              toolbar1: 'undo redo | cut copy paste | fontselect fontsizeselect ' +
              '| forecolor | bold italic strikethrough | alignleft aligncenter alignright ' +
              'alignjustify alignnone',
              toolbar2: 'indent outdent | bullist numlist | subscript superscript | link ' +
              'unlink | image | hr | removeformat ',
            }}
            onChange={this.handleContentChange}
          />
          <div>
            <Divider />
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <div>
                <SelectField
                  value={this.state.activeCourseId ? this.state.activeCourse.image : ''}
                  onChange={this.handleImageFileNameChanged}
                  maxHeight={200}
                  floatingLabelText="Image file name"
                  floatingLabelFixed
                  fullWidth
                >
                  {
                    this.state.imagesFiles.length ?
                      this.state.imagesFiles.map(item =>
                        <MenuItem
                          value={item}
                          key={item}
                          primaryText={item}
                        />)
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
              {this.state.activeCourseId && this.state.activeCourse.image ?
                <img
                  src={this.state.activeCourse.image ?
                `/image/${this.state.activeCourse.image}` : ''}
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
            value={this.state.activeCourseId ? this.state.activeCourse.client : ''}
            id="txtClient"
            onChange={this.txtFieldChange}
            fullWidth
            floatingLabelText="Client"
            floatingLabelFixed
          />
          <TextField
            value={this.state.activeCourseId ? this.state.activeCourse.date : ''}
            id="txtDate"
            onChange={this.txtFieldChange}
            fullWidth
            floatingLabelText="Date"
            floatingLabelFixed
          />
          <TextField
            value={this.state.activeCourseId ? this.state.activeCourse.service : ''}
            id="txtService"
            onChange={this.txtFieldChange}
            fullWidth
            floatingLabelText="Service"
            floatingLabelFixed
          />
          <TextField
            value={this.state.activeCourseId ? this.state.activeCourse.link : ''}
            id="txtLink"
            onChange={this.txtFieldChange}
            fullWidth
            floatingLabelText="Link"
            floatingLabelFixed
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

AdminCoursesItemEditorView.propTypes = {
  actions: React.PropTypes.shape({
    imageUpload: React.PropTypes.func.isRequired,
  }),
  activeCourseId: React.PropTypes.string,
  activeCourse: React.PropTypes.object,
  activeCourseImage: React.PropTypes.string,
  imagesFiles: React.PropTypes.array,
  // router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  console.log('AdminCoursesItemEditorView mapStateToProps state ', state);
  console.log('AdminCoursesItemEditorView mapStateToProps ownProps ', ownProps);
  const activeCourseId = ownProps.activeCourseId || state.activeCourseId;
  return ({
    activeCourseId: ownProps.activeCourseId ? ownProps.activeCourseId : state.activeCourseId,
    activeCourseImage: state.activeCourseImage,
    imagesFiles: state.imagesFiles,
    activeCourse: activeCourseId && activeCourseId !== EDITOR_STATE_NEW_COURSE ?
      state.coursesData.find(courseItem => courseItem._id === activeCourseId)
      : initialState.activeCourse,
  });
};

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      openDeleteDialog: bindActionCreators(ActionCreators.openDeleteDialogAction, dispatch),
      closeDeleteDialog: bindActionCreators(ActionCreators.closeDeleteDialogAction, dispatch),
      createCourse: bindActionCreators(ActionCreators.createCourseAction, dispatch),
      saveCourse: bindActionCreators(ActionCreators.saveCourseAction, dispatch),
      deleteCourse: bindActionCreators(ActionCreators.deleteCourseAction, dispatch),
      imageUpload: bindActionCreators(ActionCreators.imageUploadAction, dispatch),
    },
  });

const AdminCoursesItemEditorViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesItemEditorView);

export default AdminCoursesItemEditorViewWrapper;
