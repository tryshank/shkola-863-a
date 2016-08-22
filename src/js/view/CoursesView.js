import React from 'react';
import * as Redux from './Redux';
import { connect } from 'react-redux';

const CourseItemView = ({ courseItem }) =>
  <div className="col-sm-4 course-item">
    <a
      href={`#${courseItem.divId}`}
      className="course-link"
      data-toggle="modal"
    >
      <div className="caption">
        <div className="caption-content">
          <i className="fa fa-search-plus fa-3x"/>
        </div>
      </div>
      <img
        src={`src/img/courses/${courseItem.image}`}
        className="img-responsive"
        alt=""
      />
    </a>
  </div>;

CourseItemView.propTypes = {
  courseItem: React.PropTypes.object.isRequired,
};


class CoursesView extends React.Component {

  componentDidMount() {
    console.log('CoursesView componentDidMount');
    this.props.getCoursesDispatcher();
  }

  render() {
    return (
      <section id="courses">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Courses</h2>
              <hr
                className="star-primary"
              />
            </div>
          </div>
          <div className="row"> {
            this.props.coursesData.map((itemData) =>
              <CourseItemView
                key={itemData.divId}
                courseItem={itemData}
              />)
          }
          </div>
        </div>
      </section>
    );
  }
}

CoursesView.propTypes = {
  coursesData: React.PropTypes.array.isRequired,
  getCoursesDispatcher: React.PropTypes.func,
};

const mapStateToProps = (state) =>
  ({ coursesData: state.coursesData });

const mapDispatchToProps = (dispatch) =>
  ({ getCoursesDispatcher: () => dispatch(Redux.getCoursesAction()) });

const CoursesViewWrapper = connect(mapStateToProps, mapDispatchToProps)(CoursesView);

export default CoursesViewWrapper;
