import React from 'react';
import AdminMainView from './AdminMainView';
import * as Redux from '../common/Redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AdminMainViewWrapper extends React.Component {

  componentDidMount() {
    this.props.actions.getCoursesDispatcher();
  }

  render = () =>
    <AdminMainView />;

}

AdminMainViewWrapper.propTypes = {
  actions: React.PropTypes.shape({
    getCoursesDispatcher: React.PropTypes.func,
  }),
};

const mapStateToProps = (state) =>
  ({ coursesData: state.coursesData });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getCoursesDispatcher: bindActionCreators(Redux.getCoursesAction, dispatch),
    },
  };
};

const AdminMainWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminMainViewWrapper);

export default AdminMainWrapper;
