import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../components/index';
import * as actionCreators from '../actions';

import * as NotificationActions from '../../common/NotificationBar/actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const forms = state.get('form').toJS();
  const editState = state.get('editState').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  // const forms = state.get('form').toJS();
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !(device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }

  const oneClickCheckout = (
    forms.chooseShippingMethod && forms.chooseShippingMethod.values && forms.chooseShippingMethod.values.shippingRadio &&
    !data.checkoutStates.paymentRequired &&
    !data.checkoutStates.shippingAddressChangeRequired &&
    !data.checkoutStates.shippingAddressRequired &&
    !data.checkoutStates.shippingMethodRequired &&
    npanxxErrorIndex < 0 &&
    !data.flipIspuToShipping
  );

  return {
    cqContent,
    ...asyncCallStatus,
    editState,
    billingInfo: data.billingInfo,
    standaloneAccessories: data.standaloneAccessories,
    paymentRequired: data.checkoutStates.paymentRequired,
    shippingAddressRequired: data.checkoutStates.shippingAddressRequired,
    shippingAddressChangeRequired: data.checkoutStates.shippingAddressChangeRequired,
    npanxxError: npanxxErrorIndex >= 0,
    npanxxErrorIndex,
    oneClickCheckout,
    cartDetailURL: data.cartDetailURL,
    showPaymentSection: data.checkoutStates.showPaymentSection,
    masterpassError: data.billingInfo.masterpassError,
    flipIspuToShipping: data.flipIspuToShipping ? data.flipIspuToShipping : false,
    checkoutStates: data.checkoutStates,
    eppAccessoryPolicyModal: data.eppAccessoryTermsAndConditionDisplay,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
