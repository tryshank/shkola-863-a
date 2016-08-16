import React from 'react';

const CourseItemView = ({ itemData }) =>
  <div className="col-sm-4 course-item">
    <a
      href={`#${itemData.divId}`}
      className="course-link"
      data-toggle="modal"
    >
      <div className="caption">
        <div className="caption-content">
          <i className="fa fa-search-plus fa-3x"/>
        </div>
      </div>
      <img
        src={`src/img/courses/${itemData.image}`}
        className="img-responsive"
        alt=""
      />
    </a>
  </div>;

CourseItemView.propTypes = {
  itemData: React.PropTypes.object.isRequired,
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
            this.props.items.map((itemData) =>
              <CourseItemView
                key={itemData.id}
                itemData={itemData}
              />)
          }
          </div>
        </div>
      </section>
    );
  }
}

CoursesView.propTypes = {
  items: React.PropTypes.array.isRequired,
  getCoursesDispatcher: React.PropTypes.func,
};

export default CoursesView;
