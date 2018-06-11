import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions';
import accessoriesGuestConfirmation from '../components/index';

const getTotalAccessories = (accessories, accessoriesBundle) => {
  let totalAccessories = [];
  if (accessories) { totalAccessories = totalAccessories.concat(accessories); }
  if (accessoriesBundle) { totalAccessories = totalAccessories.concat(accessoriesBundle); }
  return totalAccessories;
};

const getLastFour = (cardNumber) => {
  let lastFour = cardNumber.match(/\d/g);
  lastFour = lastFour.join('');
  return lastFour;
};

function mapStateToProps(state) {
  const pageContent = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const addressInfo = pageContent.shippingInfo.addressInfo;
  const creditCardInfo = pageContent.billingInfo.creditCardInfo;
  const accessories = pageContent.accessories;
  const accessoriesBundle = pageContent.accessoriesBundle;

  return {
    pageContent,
    cqContent,
    asyncCallStatus,
    addressInfo,
    billingAddress: pageContent.billingInfo.billingAddress,
    creditCardInfo,
    accessories,
    accessoriesBundle,
    selectedShippingType: pageContent.selectedShippingType,
    dueToday: pageContent.totalDueToday,
    subTotal: pageContent.subTotalDueToday,
    tax: pageContent.stateSalesTax,
    firstName: addressInfo.firstName,
    orderNumber: pageContent.orderId,
    totalAccessories: getTotalAccessories(accessories, accessoriesBundle),
    shippingPrice: pageContent.selectedShippingType.price,
    shippingState: addressInfo.state,
    lastFour: getLastFour(creditCardInfo.creditCardNumber),
    giftCardAmount: pageContent.totalGiftCardAmount,
    totalDiscount: pageContent.totalDiscount,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(accessoriesGuestConfirmation);
