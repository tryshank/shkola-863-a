import React, { Component } from 'react';
import * as ActionCreators from '../../../redux/actions/ActionCreators';
import TinyMCE from '../../../utils/TinyMCE';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import { EDITOR_STATE_NEW_COURSE } from '../../../redux/reducers/ActiveCourseId';
import AdminCourseItemEditorImageView from './AdminCourseItemEditorImageView';
// temp:
import { DIALOG_CLOSE_ACTION } from '../../../redux/constants/Constants';


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
    this.state = {
      ...initialState,
      activeCourseId: props.activeCourseId ? props.activeCourseId : initialState.activeCourseId,
      imagesFiles: props.imagesFiles ? props.imagesFiles : initialState.imagesFiles,
      activeCourse: props.activeCourse._id ? props.activeCourse : initialState.activeCourse,
    };
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const activeCourse = nextProps.activeCourseImage ?
    { ...nextProps.activeCourse, image: nextProps.activeCourseImage } :
      nextProps.activeCourse;
    this.state = {
      ...this.state,
      activeCourse,
      activeCourseId: nextProps.activeCourseId,
      imagesFiles: nextProps.imagesFiles,
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

  handleContentChange = (event) => {
    this.setState({
      ...this.state, activeCourse: {
        ...this.state.activeCourse, content: event.target.getContent({ format: 'raw' }),
      },
    });
  };

  dialogHandleDeleteConfirm = () => {
    const { router } = this.props;
    // TODO:
    // close dialog at Dialog reducer ?
    this.props.actions.closeDeleteDialog();
    this.props.actions.deleteCourse(this.props.activeCourse._id);
    // TODO : need to be fixed and show 'select course' label
    router.replace('/admin/course');
  };

  saveClick = () => {
    if (this.props.activeCourseId !== EDITOR_STATE_NEW_COURSE) {
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
        {
          action: DIALOG_CLOSE_ACTION,
          label: 'Discard',
          primary: true,
        },
      ],
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
    return (
      <MuiThemeProvider>
        <div>
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
            <AdminCourseItemEditorImageView
              activeCourseId={this.state.activeCourseId}
              activeCourseImage={this.state.activeCourse.image}
              imagesFiles={this.state.imagesFiles}
            />
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
          <div>
            <RaisedButton
              label={this.state.activeCourseId !== EDITOR_STATE_NEW_COURSE ? 'Save' : 'Add'}
              primary
              onTouchTap={() => this.saveClick()}
            />
            <RaisedButton
              label={this.state.activeCourseId !== EDITOR_STATE_NEW_COURSE ?
                'Delete' : 'Cancel'}
              secondary
              style={{ margin: 12 }}
              onTouchTap={() => this.deleteClick()}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


AdminCoursesItemEditorView.propTypes = {
  actions: React.PropTypes.shape({
    openDeleteDialog: React.PropTypes.func.isRequired,
    closeDeleteDialog: React.PropTypes.func.isRequired,
    createCourse: React.PropTypes.func.isRequired,
    saveCourse: React.PropTypes.func.isRequired,
    deleteCourse: React.PropTypes.func.isRequired,
  }),
  activeCourseId: React.PropTypes.string,
  activeCourse: React.PropTypes.object,
  activeCourseImage: React.PropTypes.string,
  imagesFiles: React.PropTypes.array,
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
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
    },
  });

const AdminCoursesItemEditorViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesItemEditorView);

export default withRouter(AdminCoursesItemEditorViewWrapper);
