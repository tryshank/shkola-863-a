import React from 'react';
import * as Redux from '../common/Redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';

class AdminCoursesListView extends React.Component {

  componentDidMount() {
    console.log('AdminCoursesListView componentDidMount');
  }

  courseClick(id, index) {
    console.log(id, index);
    this.props.actions.onCourseListItemClick(id);
  }

  render() {
    return (
      <List>
        {
          this.props.coursesData.map(course =>
            <ListItem
              key={course._id}
              primaryText={course.title}
              onTouchTap={() => this.courseClick(course._id)}
            />)
        }
      </List>
  );
  }
}

AdminCoursesListView.propTypes = {
  coursesData: React.PropTypes.array.isRequired,
  getCoursesDispatcher: React.PropTypes.func,
  onCourseListItemClick: React.PropTypes.func,
};


const mapStateToProps = (state) =>
  ({ coursesData: state.coursesData });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      onCourseListItemClick: bindActionCreators(Redux.setActiveCourseIdAction, dispatch),
    },
  };
};

const AdminCoursesListViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesListView);

export default AdminCoursesListViewWrapper;
