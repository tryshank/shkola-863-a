import React from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const SelectableList = MakeSelectable(List);

class AdminCoursesListView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selectedIndex: this.props.activeCourseId };
  }

  componentWillReceiveProps(nextProps) {
    this.state = { selectedIndex: nextProps.activeCourseId };
  }

  courseClick = (event, index) => {
    this.setState({
      selectedIndex: index,
    });
  };

  addCourseClick = () => {
    this.props.actions.onNewCourseClick();
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div style={{ marginTop: '10px' }}>
              <RaisedButton
                label="Add new course"
                primary
                onTouchTap={this.addCourseClick}
                containerElement={<Link to={'/admin'} />}
              />
            </div>
            <SelectableList value={this.state.selectedIndex} onChange={this.courseClick} >
              {
                this.props.coursesData.map(course =>
                  <ListItem
                    value={course._id}
                    key={course._id}
                    primaryText={course.title}
                    containerElement={<Link to={`/admin/${course._id}`} />}
                    // onTouchTap={() => this.courseClick(course._id)}
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
    coursesData: React.PropTypes.func,
    getCoursesDispatcher: React.PropTypes.func,
    onCourseListItemClick: React.PropTypes.func,
    onNewCourseClick: React.PropTypes.func,
  }),
  coursesData: React.PropTypes.array,
  activeCourseId: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) =>
  ({ coursesData: state.coursesData });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      onCourseListItemClick: bindActionCreators(ActionCreators.setActiveCourseIdAction, dispatch),
      onNewCourseClick: bindActionCreators(ActionCreators.addCourseAction, dispatch),
    },
  });

const AdminCoursesListViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCoursesListView);

export default AdminCoursesListViewWrapper;
