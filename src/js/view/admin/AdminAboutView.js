import React, { Component } from 'react';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import Paper from 'material-ui/Paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as Constants from '../../redux/constants/Constants';

const editor = {
  display: 'block',
  margin: '3px',
  padding: '3px 20px',
  width: 'auto',
};

const initial = {
  adminAbout: {
    adminAboutLeft: ' ',
    adminAboutRight: ' ',
  },
};

class AdminAboutView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      adminAbout: initial.adminAbout,
      initial,
    };
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAboutText();
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      ...this.state,
      adminAbout: nextProps.adminAbout,
      initial: {
        ...this.state.initial,
        adminAbout: nextProps.initial.adminAbout,
      },
    };
  }

  saveClick = () => {
    this.props.actions.saveAbout(this.state.adminAbout, this.state.initial);
  };

  resetClick = () => {
    this.setState({
      ...this.state,
      adminAbout: initial.adminAbout,
    });
  };

  txtFieldChange = (event) => {
    event.stopPropagation();
    this.setState({
      ...this.state, adminAbout: {
        ...this.state.adminAbout, [event.target.id.substr(3, 1).toLocaleLowerCase() +
        event.target.id.substr(4)]:
        event.target.value,
      },
    });
  };

  render() {
    // TODO: change TextFields to TinyMCE
    return (
      <MuiThemeProvider>
        <Paper
          rounded={false}
          style={editor}
        >
          <div>
            <TextField
              value={(
                this.state.adminAbout.adminAboutLeft.length > 0) ?
                this.state.adminAbout.adminAboutLeft : ' '}
              id="txtAdminAboutLeft"
              onChange={this.txtFieldChange}
              multiLine
              fullWidth
              floatingLabelText="Left about"
              floatingLabelFixed
            />
            <TextField
              value={(
                this.state.adminAbout.adminAboutRight.length > 0) ?
                this.state.adminAbout.adminAboutRight : ' '}
              id="txtAdminAboutRight"
              onChange={this.txtFieldChange}
              multiLine
              fullWidth
              floatingLabelText="Right about"
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
        </ Paper>
      </ MuiThemeProvider>
    );
  }

}

AdminAboutView.propTypes = {
  actions: React.PropTypes.shape({
    saveAbout: React.PropTypes.func,
    getAboutText: React.PropTypes.func,
  }),
  adminAbout: React.PropTypes.object,
};

const mapStateToProps = (state, ownProps) =>
  ({
    state: state.adminAbout ? state.adminAbout.state : Constants.EMPTY,
    adminAbout: state.adminAbout ? state.adminAbout.about : initial.about,
    initial: state.adminAbout ? state.adminAbout.initial : initial,
  });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      saveAbout: bindActionCreators(ActionCreators.saveAbout, dispatch),
      getAboutText: bindActionCreators(ActionCreators.getAboutText, dispatch),
    },
  });

const AdminAboutViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminAboutView);

export default withRouter(AdminAboutViewWrapper);
