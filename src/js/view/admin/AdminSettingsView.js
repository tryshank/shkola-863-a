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
}

class AdminSettingsView extends Component {

  constructor(props) {
    // TODO: make state globally after merge pull #28
    console.log('constructor');
    super(props);
    this.state = {
      state: null,
      mail: initial.mail,
      initial,
    };
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps nextProps', nextProps);
    switch (nextProps.state) {
      case Constants.SUCCESS:
        {
          this.state = {
            ...this.state,
            state: Constants.EMPTY,
            initial: {
              ...this.state.initial,
              mail: this.state.mail,
            },
          };
        }
        break;
      case Constants.EMPTY:
        {
          this.state = {
            ...this.state,
            mail: nextProps.mail,
            initial: {
              ...this.state.initial,
              mail: nextProps.mail,
            },
          };
        }
        break;
      case Constants.FAILED:
        {
          this.state = {
            ...this.state,
            state: Constants.EMPTY,
          };
        }
        break;
      default:
        break;
    }
    console.log('componentWillReceiveProps state', this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate nextProps', nextProps);
    console.log('componentWillUpdate nextState', nextState);
  }

  saveClick = () => {
    console.log('save');
    this.props.actions.saveSettings(this.state.mail);
  };

  resetClick = () => {
    this.setState({
      ...this.state,
      mail: this.state.initial.mail,
    });
    console.log('resetClick ', this.state);
  };

  txtFieldChange = (event) => {
    console.log('txtFieldChange ', event);
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
    console.log('render state ', this.state);
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

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps state ', state);
  console.log('mapStateToProps ownProps ', ownProps);
  let mail;
  if (state.adminSettings && state.adminSettings.state === Constants.SUCCESS) {
    mail = this.state.mail;
  } else {
    mail = state.adminSettings ? state.adminSettings.mail : initial.mail;
  }
  return ({
    state: state.adminSettings ? state.adminSettings.state : Constants.EMPTY,
    mail,
    initial: state.adminSettings ? { mail: state.adminSettings.mail } : initial,
  });
};

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      saveSettings: bindActionCreators(ActionCreators.saveSettings, dispatch),
    },
  });

const AdminSettingsViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminSettingsView);

export default withRouter(AdminSettingsViewWrapper);
