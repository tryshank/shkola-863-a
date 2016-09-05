import React from 'react';
import * as Redux from '../common/Redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AdminCoursesListView extends React.Component {

  courseClick(id) {
    this.props.actions.onCourseListItemClick(id);
  }

  addCourseClick = () => {
    this.props.actions.onNewCourseClick();
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div style={{ marginTop: '10px' }}>
              <RaisedButton label="Add new course" primary onTouchTap={this.addCourseClick} />
            </div>
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
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

AdminCoursesListView.propTypes = {
  actions: React.PropTypes.shape({
    coursesData: React.PropTypes.func,
    getCoursesDispatcher: React.PropTypes.func,
    onCourseListItemClick: React.PropTypes.func,
    onNewCourseClick: React.PropTypes.func,
  }),
  coursesData: React.PropTypes.array,
};

const mapStateToProps = (state) =>
  ({ coursesData: state.coursesData });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      onCourseListItemClick: bindActionCreators(Redux.setActiveCourseIdAction, dispatch),
      onNewCourseClick: bindActionCreators(Redux.addCourseAction, dispatch),
    },
  });


const AdminCoursesListViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesListView);

export default AdminCoursesListViewWrapper;
