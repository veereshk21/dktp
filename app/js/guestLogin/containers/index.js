import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions';
import GuestLogin from '../components/index';

function mapStateToProps(state) {
  const loginURL = state.get('loginURL');
  const goToURL = state.get('goToURL');
  const wasGuestcheckout = state.get('wasGuestcheckout');
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const formData = state.toJS().form.guestLoginForm;
  const userNameField = formData && formData.values && formData.values.userName;
  const passwordField = formData && formData.values && formData.values.password;
  const rememberMeField = formData && formData.values && formData.values.rememberMe;
  const ctadisabled = (userNameField && passwordField) || false;

  return {
    goToURL,
    loginURL,
    wasGuestcheckout,
    cqContent,
    ...asyncCallStatus,
    userNameField,
    passwordField,
    ctadisabled,
    rememberMeField,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLogin);
