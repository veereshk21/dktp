import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingAddressEdit from '../../components/shipping/shippingAddress';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const { activeSMSCapableMtnList } = data.shippingInfo.contactInfo;
  const selectedPaymentMode = data.billingInfo ? data.billingInfo.selectedPaymentMode.toLowerCase() : '';

  return {
    cqContent,
    addressInfo: data.shippingInfo.addressInfo,
    asyncCallStatus,
    loginMTN: data.loginMTN,
    orderId: data.orderId,
    formEnabled: data.smsAuthenticationComplete,
    authEnabled: data.securePinEligible,
    checkoutStates: data.checkoutStates,
    activeSMSCapableMtnList,
    textUpdateNumber: (activeSMSCapableMtnList && activeSMSCapableMtnList.length > 0 ? activeSMSCapableMtnList[0] : null),
    ispuEligibleFlag: data.shippingInfo && data.shippingInfo.ispuEligibleFlag && selectedPaymentMode !== 'applepay' && (activeSMSCapableMtnList ? activeSMSCapableMtnList.length > 0 : false),
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressEdit);
