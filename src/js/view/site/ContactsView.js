import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../redux/actions/ActionCreators';
import { bindActionCreators } from 'redux';
import * as Contacts from '../../redux/constants/Constants';
import Localization from '../common/Localization';

const emailCheckRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;
const locale = Localization.contactMe;

class ContactsView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      errorFields: [],
      submitStatus: Contacts.EMPTY,
      disableSubmit: false,
      submitState: null,
      timestamp: Math.floor(Date.now() / 1000),
    };
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitStatus) {
      if (nextProps.submitStatus === Contacts.SUCCESS) {
        this.state = {
          ...this.state,
          name: '',
          email: '',
          phone: '',
          message: '',
          disableSubmit: false,
          submitStatus: Contacts.SUCCESS,
          timestamp: Math.floor(Date.now() / 1000),
        };
      } else {
        this.state = {
          ...this.state,
          disableSubmit: false,
          submitStatus: Contacts.FAILED,
        };
      }
    }
  }

  onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let errorFields = ['name', 'email', 'phone', 'message'];
    errorFields = errorFields.filter(f => !this.state[f]);
    const { email, phone, message } = this.state;
    let name = this.state.name;

    if (name.indexOf(' ') >= 0) {
      name = name.split(' ').slice(0, -1).join(' ');
    }
    if (!(emailCheckRegex.test(email))) {
      if (errorFields.indexOf('email') === -1) {
        errorFields.push('email');
      }
    }
    if (errorFields.length === 0) {
      // disable submit button and submit form
      this.setState({
        ...this.state,
        disableSubmit: true,
      });
      this.props.actions.submitForm({ name, email, phone, message });
    } else {
      this.setState({
        ...this.state,
        errorFields,
        submitStatus: Contacts.EMPTY,
      });
    }
  };

  txtFieldChange = (event) => {
    event.stopPropagation();
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>{locale.title}</h2>
              <hr
                className="star-primary"
              />
            </div>
          </div>
          <div className="row">
            <div key={this.state.timestamp} className="col-lg-8 col-lg-offset-2">
              <form
                name="sentMessage"
                id="contactForm"
                noValidate
                onSubmit={this.onSubmit}
              >
                <div className="row control-group">
                  <div className="form-group col-xs-12 floating-label-form-group controls">
                    <label>Name</label>
                    <input
                      type="text"
                      value={this.state.name}
                      className="form-control"
                      placeholder={locale.name}
                      id="name"
                      required
                      data-validation-required-message="Please enter your name."
                      onChange={this.txtFieldChange}
                    />
                    <p className="help-block text-danger">
                      {this.state.errorFields.find(f => f === 'name') ?
                        <ul role="alert"><li>{locale.hintName}</li></ul> : null}
                    </p>
                  </div>
                </div>
                <div className="row control-group">
                  <div className="form-group col-xs-12 floating-label-form-group controls">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={this.state.email}
                      className="form-control"
                      placeholder={locale.email}
                      id="email"
                      required
                      data-validation-required-message="Please enter your valid email address."
                      onChange={this.txtFieldChange}
                    />
                    <p className="help-block text-danger">
                      {this.state.errorFields.find(f => f === 'email') ?
                        <ul role="alert"><li>{locale.email}</li></ul> : null}
                    </p>
                  </div>
                </div>
                <div className="row control-group">
                  <div className="form-group col-xs-12 floating-label-form-group controls">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={this.state.phone}
                      className="form-control"
                      placeholder={locale.phone}
                      id="phone"
                      required
                      data-validation-required-message="Please enter your phone number."
                      onChange={this.txtFieldChange}
                    />
                    <p className="help-block text-danger">
                      {this.state.errorFields.find(f => f === 'phone') ?
                        <ul role="alert"><li>{locale.hintPhone}</li></ul> : null}
                    </p>
                  </div>
                </div>
                <div className="row control-group">
                  <div className="form-group col-xs-12 floating-label-form-group controls">
                    <label>Message</label>
                    <textarea
                      rows="5"
                      className="form-control"
                      placeholder={locale.message}
                      id="message"
                      value={this.state.message}
                      required
                      data-validation-required-message="Please enter a message."
                      onChange={this.txtFieldChange}
                    ></textarea>
                    <p className="help-block text-danger">
                      {this.state.errorFields.find(f => f === 'message') ?
                        <ul role="alert"><li>{locale.hintMessage}</li></ul> : null}
                    </p>
                  </div>
                </div>
                <br />
                <div id="success">
                  {this.state.submitStatus ?
                    <div
                      className={`alert alert-${this.state.submitStatus === Contacts.SUCCESS ?
                      'success' : 'danger'}`}
                    >
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-hidden="true"
                      >
                      &times;</button>
                      <strong>
                        {this.state.submitStatus === Contacts.SUCCESS ?
                          'Your message has been sent.' :
                          `Sorry ${this.state.name}, it seems that my mail server is not responding.
                           Please try again later!`
                        }
                      </strong>
                    </div>
                  : null}
                </div>
                <div className="row">
                  <div className="form-group col-xs-12">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      disabled={this.state.disableSubmit}
                    >
                      {locale.send}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>);
  }
}

ContactsView.propTypes = {
  actions: React.PropTypes.shape({
    submitForm: React.PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state, ownProps) =>
  ({ submitStatus: state.contactFormState });

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      submitForm: bindActionCreators(ActionCreators.submitContactsForm, dispatch),
    },
  });


const ContactsViewWrapper =
  connect(mapStateToProps, mapDispatchToProps)(ContactsView);

export default ContactsViewWrapper;
