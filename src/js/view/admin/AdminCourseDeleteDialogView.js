import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

class AdminCourseDeleteDialog extends React.Component {
  state = {
    open: false,
    actions: [],
    text: '',
  };

  componentWillReceiveProps(nextProps) {
    this.state = nextProps.dialogState;
  }

  handleClose = () => {
    this.setState = { open: false };
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Dialog
            actions={this.state.actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {this.state.text}
          </Dialog>
        </MuiThemeProvider>
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
