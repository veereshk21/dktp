import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderSummary from '../../components/orderSummary/orderSummary';
import * as actionCreators from '../../actions';
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

  const checkoutEnabled = (
    ((forms.agreementForm && !forms.agreementForm.syncErrors) || data.standaloneAccessories) &&
    (!data.checkoutStates.showDeliveryMethod || (forms.chooseShippingMethod && forms.chooseShippingMethod.values && forms.chooseShippingMethod.values.shippingRadio)) &&
    !data.checkoutStates.paymentRequired &&
    !data.checkoutStates.shippingAddressChangeRequired &&
    !data.checkoutStates.shippingAddressRequired &&
    !data.checkoutStates.shippingMethodRequired &&
    npanxxErrorIndex < 0 &&
    !editState[EDIT_STATE.PAYMENT] &&
    !editState[EDIT_STATE.SHIPPING] &&
    !editState[EDIT_STATE.DEVICE]
  );
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
