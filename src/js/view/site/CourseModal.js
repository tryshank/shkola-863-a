import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const CloseModal = () => (
  <Link to="/">
    <div
      className="close-modal"
      data-dismiss="modal"
    >
      <div className="lr">
        <div className="rl">
        </div>
      </div>
    </div>
  </Link>
);

const CourseModal = ({ courseItem }) => {
  console.log('courseItem', courseItem);
  if (!courseItem) {
    return <div />;
  }

  return (<Modal
    isOpen
    className="course-modal"
  >
    <div className="modal-open">
      <div
        className="courses-modal modal fade in"
        id="1" tabIndex="-1" role="dialog" aria-hidden="true"
        style={{ display: 'block' }}
      >
        <div className="modal-content">
          <CloseModal />
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2">
                <div className="modal-body">
                  <h2>{courseItem.title}</h2>
                  <hr
                    className="star-primary"
                  />
                  <img
                    // TODO: fix images path
                    src={`/image/${courseItem.image}`}
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
                    <li>Service:&nbsp;
                      <strong><a href={courseItem.link}>{courseItem.service}</a>
                      </strong>
                    </li>
                  </ul>
                  <Link to="/">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    ><i className="fa fa-times"></i> Close
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>);
};

CourseModal.propTypes = {
  courseItem: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  courseItem: state.coursesData.find(c => c._id === ownProps.course),
});

export default connect(mapStateToProps)(CourseModal);