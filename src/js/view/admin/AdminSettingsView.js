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
  email: {
    adminEmail: '',
  },
};

class AdminSettingsView extends Component {

  constructor(props) {
    // TODO: make state globally
    super(props);
    this.state = {
      state: null,
      email: initial.email,
      initial,
    };
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.getSettingsMail();
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      ...this.state,
      email: nextProps.email,
      initial: {
        ...this.state.initial,
        email: nextProps.initial.email,
      },
    };
  }

  saveClick = () => {
    this.props.actions.saveSettings(this.state.email, this.state.initial);
  };

  resetClick = () => {
    this.setState({
      ...this.state,
      email: this.state.initial.email,
    });
  };

  txtFieldChange = (event) => {
    event.stopPropagation();
    this.setState({
      ...this.state, email: {
        ...this.state.email, [event.target.id.substr(3, 1).toLocaleLowerCase() +
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
              value={this.state.email.adminEmail}
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
    getSettingsMail: React.PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state, ownProps) =>
  ({
    state: state.adminSettings ? state.adminSettings.state : Constants.EMPTY,
    email: state.adminSettings ? state.adminSettings.email : initial.email,
    initial: state.adminSettings ? state.adminSettings.initial : initial,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      saveSettings: bindActionCreators(ActionCreators.saveSettings, dispatch),
      getSettingsMail: bindActionCreators(ActionCreators.getSettingsMail, dispatch),
    },
  });

const AdminSettingsViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminSettingsView);

export default withRouter(AdminSettingsViewWrapper);
