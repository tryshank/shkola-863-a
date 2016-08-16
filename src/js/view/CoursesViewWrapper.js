import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as WebAPI from './WebAPI';
import CoursesView from './CoursesView';

class CoursesWrapper extends Component {

  componentDidMount() {
    console.log('CoursesWrapper componentDidMount');
  }

  render() {
    return (<CoursesView
      items={this.props.coursesData} getCoursesDispatcher={this.props.getCoursesDispatcher}
    />);
  }

}

CoursesWrapper.propTypes = {
  getCoursesDispatcher: React.PropTypes.func,
  coursesData: React.PropTypes.array,
};

const mapStateToProps = (state) =>
  ({ coursesData: state.coursesData });

const mapDispatchToProps = (dispatch) => {
  return {
    getCoursesDispatcher: () => {
      console.log('getCourses dispatch');
      dispatch(WebAPI.requestCoursesAction());
    },
  };
};

const CoursesViewWrapper = connect(mapStateToProps, mapDispatchToProps)(CoursesWrapper);

export default CoursesViewWrapper;
