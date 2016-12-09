import React from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { connect } from 'react-redux';
import Localization from '../common/Localization';


const locale = Localization.about;

const initial = {
  adminAbout: {
    adminAboutLeft: ' ',
    adminAboutRight: ' ',
  },
};

class AboutView extends React.Component {

  constructor(props) {
    console.log('CoursesView constructor');
    super(props);
  }

  componentDidMount() {
    this.props.actions.getAboutDispatcher();
  }

  render() {
    const about = this.props.adminAbout;
    const { adminAboutLeft, adminAboutRight } =
      (about !== undefined) ? about : initial.adminAbout;
    return (
      <section
        className="success"
        id="about"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>{locale.title}</h2>
              <hr
                className="star-light"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-lg-offset-2">
              <p>
                {adminAboutLeft}
              </p>
            </div>
            <div className="col-lg-4">
              <p>
                {adminAboutRight}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AboutView.propTypes = {
  actions: React.PropTypes.shape({
    getAboutDispatcher: React.PropTypes.func,
  }),
  adminAbout: React.PropTypes.object,
};

const mapStateToProps = (state) =>
  ({
    adminAbout: state.adminAbout ? state.adminAbout.about : initial.about,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      getAboutDispatcher: (type) => dispatch(ActionCreators.getAboutText(), dispatch),
    },
  });

const AboutViewWrapper = connect(mapStateToProps, mapDispatchToProps)(AboutView);

export default AboutViewWrapper;
