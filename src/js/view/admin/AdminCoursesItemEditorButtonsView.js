import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { EDITOR_STATE_NEW_COURSE } from '../../redux/reducers/ActiveCourseId';

class AdminCoursesItemEditorButtonsView extends Component {

  constructor(props) {
    super(props);
    console.log('AdminCoursesItemEditorButtonsView constructor ', props);
    this.state = {
      activeCourseId: props.activeCourseId,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('AdminCoursesItemEditorButtonsView componentWillReceiveProps ', nextProps);
  }

  dialogHandleDeleteConfirm = () => {
    const { router } = this.props;
    this.props.actions.closeDeleteDialog();
    this.props.actions.deleteCourse(this.props.activeCourse._id);
    // TODO : check it works
    router.replace('/admin/course');
  };

  dialogHandleClose = () => {
    this.props.actions.closeDeleteDialog();
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
        <FlatButton
          label="Discard"
          primary
          onTouchTap={this.dialogHandleClose}
        />],
    });
  };

  render() {
    console.log('AdminCoursesItemEditorView render state ', this.state);
    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton
            label={this.state !== EDITOR_STATE_NEW_COURSE ? 'Save' : 'Add'}
            primary
            onTouchTap={() => this.saveClick()}
          />
          <RaisedButton
            label={this.state !== EDITOR_STATE_NEW_COURSE ?
                'Delete' : 'Cancel'}
            secondary
            style={{ margin: 12 }}
            onTouchTap={() => this.deleteClick()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

AdminCoursesItemEditorButtonsView.propTypes = {
  actions: React.PropTypes.shape({
    openDeleteDialog: React.PropTypes.func.isRequired,
    closeDeleteDialog: React.PropTypes.func.isRequired,
    createCourse: React.PropTypes.func.isRequired,
    saveCourse: React.PropTypes.func.isRequired,
    deleteCourse: React.PropTypes.func.isRequired,
  }),
  router: React.PropTypes.object.isRequired,
  activeCourse: React.PropTypes.object,
  activeCourseId: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  console.log('AdminCoursesItemEditorButtonsView mapStateToProps state ', state);
  console.log('AdminCoursesItemEditorButtonsView mapStateToProps ownProps ', ownProps);
  const activeCourseId = ownProps.activeCourseId || state.activeCourseId;
  console.log('mapStateToProps activeCourseId ', activeCourseId);
  return ({
    activeCourseId: ownProps.activeCourseId ? ownProps.activeCourseId : state.activeCourseId,
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

const AdminCoursesItemEditorButtonsViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesItemEditorButtonsView);

export default withRouter(AdminCoursesItemEditorButtonsViewWrapper);
