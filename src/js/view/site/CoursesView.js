import React from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const CourseItemView = ({ courseItem }) =>
  <div className="col-sm-4 course-item">
    <Link
      to={`/${courseItem._id}`}
      className="course-link"
      data-toggle="modal"
    >
      <div className="caption">
        <div className="caption-content">
          <i className="fa fa-search-plus fa-3x" />
        </div>
      </div>
      <img
        // TODO: fix images path
        src={`/image/${courseItem.image}`}
        className="img-responsive"
        alt=""
      />
    </Link>
  </div>;


CourseItemView.propTypes = {
  courseItem: React.PropTypes.object.isRequired,
};

class CoursesView extends React.Component {

  constructor(props) {
    console.log('CoursesView constructor');
    super(props);
  }

  componentDidMount() {
    console.log('CoursesView componentDidMount');
  }

  render() {
    const coursesData = this.props.coursesData.filter(courseItem => courseItem.visible);

    return (
      <section id={this.props.id}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>{this.props.title.toUpperCase()}</h2>
              <hr
                className="star-primary"
              />
            </div>
          </div>
          <div className="row"> {
            coursesData.map(itemData =>
              <CourseItemView
                key={itemData._id}
                courseItem={itemData}
                filter=""
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
  id: React.PropTypes.string,
  title: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) =>
  ({ coursesData: state.coursesData.filter(ownProps.filter) });

const mapDispatchToProps = (dispatch) =>
  ({ getCoursesDispatcher: (type) => dispatch(ActionCreators.getCoursesAction(type)) });

const CoursesViewWrapper = connect(mapStateToProps, mapDispatchToProps)(CoursesView);

export default CoursesViewWrapper;
