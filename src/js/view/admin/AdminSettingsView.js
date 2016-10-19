import React, { Component } from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as Constants from '../../redux/constants/Constants';

const editor = {
  display: 'block',
  margin: '3px',
  padding: '3px 20px',
  width: 'auto',
};

const initial = {
  mail: {
    adminEmail: '',
  },
};

class AdminSettingsView extends Component {

  constructor(props) {
    // TODO: make state globally after merge pull #28
    super(props);
    this.state = {
      state: null,
      mail: initial.mail,
      initial,
    };
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      ...this.state,
      mail: nextProps.mail,
      initial: {
        ...this.state.initial,
        mail: nextProps.initial.mail,
      },
    };
  }

  saveClick = () => {
    this.props.actions.saveSettings(this.state.mail, this.state.initial);
  };

  resetClick = () => {
    this.setState({
      ...this.state,
      mail: this.state.initial.mail,
    });
  };

  txtFieldChange = (event) => {
    event.stopPropagation();
    this.setState({
      ...this.state, mail: {
        ...this.state.mail, [event.target.id.substr(3, 1).toLocaleLowerCase() +
        event.target.id.substr(4)]:
          event.target.value,
      },
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <Paper
          rounded={false}
          style={editor}
        >
          <div>
            <TextField
              value={this.state.mail.adminEmail}
              id="txtAdminEmail"
              onChange={this.txtFieldChange}
              fullWidth
              floatingLabelText="Admin email"
              floatingLabelFixed
            />
          </div>
          <div>
            <RaisedButton
              label={'Save'}
              primary
              onTouchTap={() => this.saveClick()}
            />
            <RaisedButton
              label={'Reset'}
              secondary
              style={{ margin: 12 }}
              onTouchTap={() => this.resetClick()}
            />
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }

}

AdminSettingsView.propTypes = {
  actions: React.PropTypes.shape({
    saveSettings: React.PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state, ownProps) =>
  ({
    state: state.adminSettings ? state.adminSettings.state : Constants.EMPTY,
    mail: state.adminSettings ? state.adminSettings.mail : initial.mail,
    initial: state.adminSettings ? state.adminSettings.initial : initial,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      saveSettings: bindActionCreators(ActionCreators.saveSettings, dispatch),
    },
  });

const AdminSettingsViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminSettingsView);

export default withRouter(AdminSettingsViewWrapper);
