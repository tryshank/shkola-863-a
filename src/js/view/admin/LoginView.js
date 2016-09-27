import React, { PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton, TextField } from 'material-ui';
import { setIn } from '../../utils/immutable';
import auth from '../../utils/auth/auth';

const styles = {
  margin: { marginRight: 12 },
  inputsContainer: { height: 120 },
};

const requiredFieldErrorProvider = value => (
  !value ? 'Поле абавязковае' : undefined
);

const checkProperty = (state, property, errorProvider) => {
  const error = errorProvider[state[property]];
  if (error) {
    return [false, {
      ...state,
      errors: setIn(
          state.errors,
          property,
          errorProvider(state[property])
      ),
    }];
  }
  return [true, state];
};

// export default class LoginView extends React.Component {
class LoginView extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({
      remindMode: false,
      nameOrEmail: '',
      password: '',
      errors: {},
    });
  }

  createTextField(property, label, props = {}) {
    return (
      <TextField
        {...props}
        hintText={label}
        errorText={this.state.errors[property]}
        onChange={(e) => {
          this.setState({
            [property]: e.target.value,
            errors: setIn(this.state.errors, property, ''),
          });
        }}
      />
    );
  }

  verifyProperties(...fields) {
    let valid = true;
    let nextState = { ...this.state, errors: {} };
    for (const field of fields) {
      [valid, nextState] = checkProperty(nextState, field, requiredFieldErrorProvider);
    }
    return [valid, nextState];
  }

  remind() {
    const [, nextState] = this.verifyProperties(['nameOrEmail']);
    this.setState(nextState);
  }

  enter() {
    const [, nextState] = this.verifyProperties(['nameOrEmail', 'password']);
    this.setState(nextState, this.handleSubmit);
  }

  handleSubmit() {
    const email = this.state.nameOrEmail;
    const pass = this.state.password;

    // const { location, router } = this.props;
    const { router } = this.props;

    auth.login(email, pass)
      .then(
        () => {
          console.log('location ', location);
          /*
          if (location.state && location.state.nextPathname) {
            router.replace(location.state.nextPathname);
          }
          */
          router.replace('/admin');
        },
        () => {
          router.replace('/');
        }
      );
  }

  createLoginView() {
    return (
      <div>
        <div style={styles.inputsContainer}>
          {this.createTextField('nameOrEmail', 'Імя або эмэйл')}
          <br />
          {this.createTextField('password', 'Пароль', { type: 'password' })}
        </div>
        <RaisedButton
          primary
          style={styles.margin}
          label="Увайсці"
          onClick={() => this.enter()}
        />
        <RaisedButton
          secondary
          style={styles.margin}
          label="Забыўся пароль"
          onClick={() => this.setState({ remindMode: true })}
        />
      </div>
    );
  }

  createRemindView() {
    return (
      <div>
        <div style={styles.inputsContainer}>
          {this.createTextField('nameOrEmail', 'Імя або эмэйл')}
        </div>
        <RaisedButton
          primary
          style={styles.margin}
          label="Узгадаў :)"
          onClick={() => this.setState({ remindMode: false })}
        />
        <RaisedButton
          secondary
          style={styles.margin}
          label="Адправіць"
          onClick={() => this.remind()}
        />
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Link to="/">
            <RaisedButton label="Вярнуцца" />
          </Link>
          <br />
          {this.state.remindMode ? this.createRemindView() : this.createLoginView()}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(LoginView);
