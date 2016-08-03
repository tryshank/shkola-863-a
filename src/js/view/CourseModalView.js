import React from 'react';

const CourseModalView = ({ context }) =>
  <div
    className="course-modal modal fade"
    id={context.divId}
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
              <h2>{context.title}</h2>
              <hr
                className="star-primary"
              />
              <img
                src={`src/img/courses/${context.image}`}
                className="img-responsive img-centered"
                alt=""
              />
              <p dangerouslySetInnerHTML={{ __html: context.content }}></p>
              <ul className="list-inline item-details">
                <li>Client:
                  <strong><a href={context.link}>{context.client}</a>
                  </strong>
                </li>
                <li>Date:
                  <strong><a href={context.link}>{context.date}</a>
                  </strong>
                </li>
                <li>Service:
                  <strong><a href={context.link}>{context.service}</a>
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
  </div>;

CourseModalView.propTypes = {
  context: React.PropTypes.object.isRequired,
};

export default CourseModalView;
