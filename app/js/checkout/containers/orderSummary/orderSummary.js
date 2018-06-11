import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderSummary from '../../components/orderSummary/orderSummary';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

import { EDIT_STATE } from '../../constants';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const buddyUpgrade = data.devices.buddyUpgrade;
  const orderId = data.orderId;
  const editState = state.get('editState').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const forms = state.get('form').toJS();
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !(device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  const notification = state.get('notification');
  const ispuSelected = data.selectedShippingType && data.selectedShippingType.type === 'ISPU';

  const termsCompleted = ((forms.agreementForm && !forms.agreementForm.syncErrors) || data.standaloneAccessories);
  const shippingCompleted = ((!data.checkoutStates.showDeliveryMethod || (forms.chooseShippingMethod && forms.chooseShippingMethod.values && forms.chooseShippingMethod.values.shippingRadio)) &&
    (ispuSelected || (
      !data.checkoutStates.poBoxShippingAddress &&
      !data.checkoutStates.shippingAddressValidationError
    )) &&
    !data.checkoutStates.shippingAddressChangeRequired &&
    !data.checkoutStates.shippingAddressRequired &&
    !data.checkoutStates.shippingMethodRequired &&
    !data.checkoutStates.contactInfoRequired &&
    !editState[EDIT_STATE.SHIPPING]);
  const paymentCompleted = (!data.checkoutStates.paymentRequired && !editState[EDIT_STATE.PAYMENT]);
  const devicesCompleted = (npanxxErrorIndex < 0 && !editState[EDIT_STATE.DEVICE]);
  const checkoutEnabled = (termsCompleted && shippingCompleted && paymentCompleted && devicesCompleted);

  const getTextUpdatesForm = (forms.getTextUpdatesForm && forms.getTextUpdatesForm.values) ? forms.getTextUpdatesForm.values : null;
  return {
    cqContent,
    ...asyncCallStatus,
    editState,
    billingInfo: data.billingInfo,
    checkoutEnabled,
    devices: data.devices,
    plans: data.plans,
    taxes: data.taxes,
    shipping: data.selectedShippingType,
    dueMonthly: data.totalDueMonthlyPlanAndDevice,
    dueToday: data.dueToday,
    isBTA: data.billingInfo.selectedPaymentMode.toLowerCase() === 'bta',
    cartDetailURL: data.cartDetailURL,
    accessories: data.dueTodayView.accessories,
    accessoriesBundle: data.dueTodayView.accessoriesBundle,
    standaloneAccessories: data.standaloneAccessories,
    submitOrderURL: data.submitOrderURL,
    ...getTextUpdatesForm,
    tradeInDetails: data.transformedTradeInPromoDetails,
    subtotalDueToday: data.subtotalDueToday,
    totalUpgradeFee: data.totalUpgradeFee,
    totalOrderTax: data.totalOrderTax,
    flow: data.flow,
    comboOrder: data.comboOrder,
    cpcOrder: data.cpcOrder,
    depositAmount: data.depositAmount,
    showPlanCost: !data.itemOnJaxPlan,
    showGiftCards: data.giftCardsEnabled && data.giftCardsUsed > 0,
    giftCardList: data.billingInfo.giftCardList,
    buddyUpgrade,
    orderId,
    showDeliveryMethod: data.checkoutStates.showDeliveryMethod,
    displayUpgradeFee: data.displayUpgradeFee,
    termsCompleted,
    shippingCompleted,
    paymentCompleted,
    devicesCompleted,
    notification,
    checkoutStates: data.checkoutStates,
    addressInfo: data.shippingInfo.addressInfo,
    ispuSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
