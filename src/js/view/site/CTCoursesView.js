import React from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Localization from '../common/Localization';

const locale = Localization.ctcourses;

const CTCourseItemView = ({ ctcourseItem }) =>
    <div className="col-sm-4 ctcourese-item">
      <Link
          to={`/${ctcourseItem._id}`}
          className="ctcourse-link"
          data-toggle="modal"
      >
        <div className="caption">
          <div className="caption-content">
            <i className="fa fa-search-plus fa-3x" />
          </div>
        </div>
        <img
            // TODO: fix images path
            src={`/image/${ctcourseItem.image}`}
            className="img-responsive"
            alt=""
        />
      </Link>
    </div>;

CTCourseItemView.propTypes = {
  ctcourseItem: React.PropTypes.object.isRequired,
};


class CTCoursesView extends React.Component {

  constructor(props) {
    console.log('CTCoursesView constructor');
    super(props);
  }

  componentDidMount() {
    console.log('CTCoursesView componentDidMount');
  }

  render() {
    const ctcoursesData = this.props.coursesData.filter(ctcourseItem => ctcourseItem.visible && ctcourseItem.isCT);
    return (
        <section id="ctcourses">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2>{locale.title.toUpperCase()}</h2>
                <hr
                    className="star-primary"
                />
              </div>
            </div>
            <div className="row"> {
              ctcoursesData.map(itemData =>
                  <CTCourseItemView
                      key={itemData._id}
                      ctcourseItem={itemData}
                  />)
            }
            </div>
          </div>
        </section>
    );
  }
}

CTCoursesView.propTypes = {
  coursesData: React.PropTypes.array.isRequired,
  getCoursesDispatcher: React.PropTypes.func,
};

const mapStateToProps = (state) =>
    ({ coursesData: state.coursesData });

const mapDispatchToProps = (dispatch) =>
    ({ getCoursesDispatcher: (type) => dispatch(ActionCreators.getCoursesAction(type)) });

const CTCoursesViewWrapper = connect(mapStateToProps, mapDispatchToProps)(CTCoursesView);

export default CTCoursesViewWrapper;
