import React from 'react';
import AdminMainView from './AdminMainView';
import * as Redux from './Redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AdminMainViewWrapper extends React.Component {

  componentDidMount() {
    console.log('AdminMainViewWrapper mount');
    this.props.actions.getCoursesDispatcher();
  }

  render = () =>
    <AdminMainView />;

}

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
