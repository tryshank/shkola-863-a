import React from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const SelectableList = MakeSelectable(List);

const styleAdd = {
  marginRight: 20,
};

const styleMove = {
  marginRight: 20,
};


class AdminCoursesListView extends React.Component {

  constructor(props) {
    // TODO:
    // awaitingServerResponse move to reducer after merging pull #27
    super(props);
    this.state = {
      activeCourse: {
        id: this.props.activeCourseId,
      },
      awaitingServerResponse: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    let prevCourse;
    let nextCourse;
    let activeCoursePosition;
    let activeCourseIndex;
    const activeCourse = nextProps.coursesData ? nextProps.coursesData.find((courseItem, index) =>
      courseItem._id === nextProps.activeCourseId) : null;
    if (activeCourse) {
      activeCourseIndex = nextProps.coursesData.indexOf(activeCourse);
      activeCoursePosition = activeCourse.ordering;
      if (activeCourseIndex > 0) {
        prevCourse = {
          id: nextProps.coursesData[activeCourseIndex - 1]._id,
          position: nextProps.coursesData[activeCourseIndex - 1].ordering,
          index: activeCourseIndex - 1,
        };
      }
      if (activeCourseIndex + 1 < nextProps.coursesData.length) {
        nextCourse = {
          id: nextProps.coursesData[activeCourseIndex + 1]._id,
          position: nextProps.coursesData[activeCourseIndex + 1].ordering,
          index: activeCourseIndex + 1,
        };
      }
    }
    this.state = {
      activeCourse: { id: nextProps.activeCourseId, position: activeCoursePosition,
        index: activeCourseIndex },
      coursesData: nextProps.coursesData,
      prevCourse,
      nextCourse,
      awaitingServerResponse: false,
    };
  }

  courseItemListClick = (event, index) => {
    this.setState({
      activeCourse: { ...this.state.activeCourse, id: index },
    });
  };

  addCourseClick = () => {
    /*
    this.setState({
      awaitingServerResponse: true,
    });
    */
    this.props.actions.onNewCourseClick();
  };

  orderCourseClick = (direction) => {
    if ((direction && this.state.prevCourse) || (!direction && this.state.nextCourse)) {
      this.setState({
        awaitingServerResponse: true,
      });
      this.props.actions.onOrderCourseClick(this.state.activeCourse, direction,
        direction ? this.state.prevCourse : this.state.nextCourse);
    }
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div style={{ margin: '10px 0px 20px 0px' }}>
              <FloatingActionButton
                onTouchTap={this.addCourseClick}
                containerElement={<Link to={'/admin'} />}
                style={styleAdd}
                /*
                  TODO: check this working after merge with pull #27
                */
                disabled={this.state.activeCourse.id === '0' || this.state.awaitingServerResponse}
              >
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton
                onTouchTap={() => this.orderCourseClick(true)}
                style={styleMove}
                disabled={!(this.state.prevCourse && this.state.prevCourse.id &&
                  !this.state.awaitingServerResponse)}
              >
                <ArrowUp />
              </FloatingActionButton>
              <FloatingActionButton
                onTouchTap={() => this.orderCourseClick(false)}
                disabled={!(this.state.nextCourse && this.state.nextCourse.id &&
                  !this.state.awaitingServerResponse)}
                style={styleMove}
              >
                <ArrowDown />
              </FloatingActionButton>
            </div>
            <SelectableList value={this.state.activeCourse.id} onChange={this.courseItemListClick} >
              {
                this.props.coursesData.map(course =>
                  <ListItem
                    value={course._id}
                    key={course._id}
                    primaryText={course.title}
                    containerElement={<Link to={`/admin/${course._id}`} />}
                  />)
              }
            </SelectableList>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}


AdminCoursesListView.propTypes = {
  actions: React.PropTypes.shape({
    onCourseListItemClick: React.PropTypes.func,
    onNewCourseClick: React.PropTypes.func,
    onOrderCourseClick: React.PropTypes.func,
  }),
  coursesData: React.PropTypes.array,
  activeCourseId: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) =>
  ({
    coursesData: state.coursesData,
    activeCourseId: ownProps.activeCourseId,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      onCourseListItemClick: bindActionCreators(ActionCreators.setActiveCourseIdAction, dispatch),
      onNewCourseClick: bindActionCreators(ActionCreators.addCourseAction, dispatch),
      onOrderCourseClick: bindActionCreators(ActionCreators.orderCourseAction, dispatch),
    },
  });

const AdminCoursesListViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesListView);

export default AdminCoursesListViewWrapper;
