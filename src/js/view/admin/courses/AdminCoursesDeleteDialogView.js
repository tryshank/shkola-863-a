import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { store } from '../../../redux/Redux';
import FlatButton from 'material-ui/FlatButton';
import { ACTION_CLOSE_DIALOG } from '../../../redux/constants/ActionTypes';
import { DIALOG_CLOSE_ACTION } from '../../../redux/constants/Constants';

class AdminCourseDeleteDialog extends React.Component {

  state = {
    open: false,
    actions: [],
    text: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.dialogState.open) {
      const actions = [];
      nextProps.dialogState.actions.forEach(item => {
        if (item.action && item.action === DIALOG_CLOSE_ACTION) {
          actions.push(
            <FlatButton
              label={item.label}
              primary={item.primary}
              secondary={item.secondary}
              onTouchTap={this.handleClose}
            />);
        } else {
          actions.push(item);
        }
      });
      this.state = {
        ...nextProps.dialogState,
        actions,
      };
    } else {
      this.state = nextProps.dialogState;
    }
  }

  handleClose = () => {
    store.dispatch({ type: ACTION_CLOSE_DIALOG, payload: { open: false } });
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
