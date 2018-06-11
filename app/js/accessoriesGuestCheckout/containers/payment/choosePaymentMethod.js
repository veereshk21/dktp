import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChoosePaymentMethod from '../../components/payment/choosePaymentMethod';
import * as actionCreators from '../../actions';
import * as notificationActions from '../../../common/NotificationBar/actions';

const getGiftCards = (giftCardsLimit, formData, dueToday) => {
  const giftCardList = [];
  let giftCardAppliedValue = 0;
  for (let index = 1; giftCardsLimit >= index; index++) {
    if (formData[`giftCardCheckbox_${index}`] && formData[`giftCardNumber_${index}`] && formData[`giftCardPin_${index}`] && formData[`amountToApply_${index}`]) {
      giftCardAppliedValue += parseFloat(formData[`amountToApply_${index}`]);
      giftCardList.push({
        giftCard: formData[`giftCardNumber_${index}`],
        pin: formData[`giftCardPin_${index}`],
        amountApplied: parseFloat(formData[`amountToApply_${index}`]),
        isEncrypted: formData[`isEncrypted_${index}`],
        lastDigits: formData[`lastDigits_${index}`],
      });
    }
  }
  return {
    giftCardList,
    giftCardTotalExceedsDueToday: giftCardAppliedValue > dueToday,
  };
};


function mapStateToProps(state) {
  // Getting Data from store
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const forms = state.get('form').toJS();
  const giftCardForm = (forms.giftCardsForm && forms.giftCardsForm.values ? forms.giftCardsForm.values : {});
  const editState = state.get('editState').toJS();

  return {
    cqContent,
    stepsCompleted: data.stepsCompleted,
    selectedShippingType: data.selectedShippingType,
    dueToday: data.dueToday,
    ...asyncCallStatus,
    authInfo: data.authInfo,
    billingInfo: data.billingInfo,
    pieEnabled: data.pieEnabled,
    editState,
    forms,
    masterpassConfigInfo: data.masterpassConfigInfo,
    ...getGiftCards(data.giftCardsLimit, giftCardForm, data.dueToday),
    states: data.states,
    shippingAddress: data.shippingInfo.addressInfo,
    billingAddress: forms && forms.billingAddress && forms.billingAddress.values,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...notificationActions, ...actionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMethod);
