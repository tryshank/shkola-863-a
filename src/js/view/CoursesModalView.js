import React from 'react';
import { connect } from 'react-redux';

const CoursesModalView = ({ coursesData }) =>
  <div> {
    coursesData.map((courseItem) =>
      <div
        key={courseItem.divId}
        className="course-modal modal fade"
        id={courseItem.divId}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-content">
          <div
            className="close-modal"
            data-dismiss="modal"
          >
            <div className="lr">
              <div className="rl">
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2">
                <div className="modal-body">
                  <h2>{courseItem.title}</h2>
                  <hr
                    className="star-primary"
                  />
                  <img
                    src={`src/img/courses/${courseItem.image}`}
                    className="img-responsive img-centered"
                    alt=""
                  />
                  <p dangerouslySetInnerHTML={{ __html: courseItem.content }}></p>
                  <ul className="list-inline item-details">
                    <li>Client:
                      <strong><a href={courseItem.link}>{courseItem.client}</a>
                      </strong>
                    </li>
                    <li>Date:
                      <strong><a href={courseItem.link}>{courseItem.date}</a>
                      </strong>
                    </li>
                    <li>Service:
                      <strong><a href={courseItem.link}>{courseItem.service}</a>
                      </strong>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  ><i className="fa fa-times"></i> Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  </div>;

CoursesModalView.propTypes = {
  coursesData: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) =>
  ({ coursesData: state.coursesData });

const CoursesModalViewWrapper = connect(mapStateToProps)(CoursesModalView);

export default CoursesModalViewWrapper;
