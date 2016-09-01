import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';

class AdminCourseDeleteDialog extends React.Component {
  state = {
    open: false,
    actions: [],
    text: '',
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps dialog ', nextProps);
    this.state = nextProps.dialogState;
  }

  render() {
    return (
      <div>
        <Dialog
          actions={this.state.actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.state.actions.length ? this.state.actions[this.state.actions.length--] : null}
        >
          {this.state.text}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  ({
    dialogState: state.dialogState,
  });

const AdminCourseDeleteDialogWrapper =
  connect(mapStateToProps)(AdminCourseDeleteDialog);

export default AdminCourseDeleteDialogWrapper;
