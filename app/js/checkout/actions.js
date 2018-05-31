import request from 'axios';
import { reset, change } from 'redux-form';
import { hashHistory } from './../store';
import { showErrorNotification, showInfoNotification, hideNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

import {
  API_SUCCESS_CODE,
  RESET_STATE,
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  STORE_LIST,
  MARKER_SELECTED,
  STORE_SELECTED,
  MAP_CLICKED,
  AGREEMENT_CLICKED,
  APPLE_PAY,
  PAYPAL_CMPI_LOOKUP_URL,
  FETCH_TRADE_IN_AGREEMENT,
  UPDATE_EDIT_STATE,
  EDIT_STATE,
  NOTIFICATIONS,
  CYBER_SOURCE_DATA,
} from './constants';


/* *
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => ({
  type: ASYNC_FETCH,
});
/* *
 * Action clears the loader on the page.
 * */
export const asyncFetchSucess = (data = {}) => ({
  type: ASYNC_FETCH_SUCCESS,
  data,
});

/* *
 * Action displays API error on the page.
 * */
const asyncFetchFalied = () => ({
  type: ASYNC_FETCH_FAILURE,
});
/* *
 * Action clears the loader and also data in data node.
 * */
export const invalidateAsyncFetch = () => ({
  type: ASYNC_FETCH_INVALIDATE,
});

/* *
 * Action clears the loader and also data in data node.
 * */
export const updateEditState = (section, value) => ({
  type: UPDATE_EDIT_STATE,
  data: { section, value },
});

function resetState(data) {
  return {
    type: RESET_STATE,
    data,
  };
}


/* *
 * Agreement checkbox selection
 * */

export const agreementChecked = (agreementState) => ({
  type: AGREEMENT_CLICKED,
  agreementState,
});


/* *
 * Update shipping address
 * */
function updateShippingAddressAPI(shippingAddress, url) {
  return request({
    method: 'post',
    url,
    data: shippingAddress,
  });
}

export const updateShippingAddress = (shippingAddress, OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;

  updateShippingAddressAPI(shippingAddress, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      const orderDetails = response.data.output;
      if (orderDetails.shippingInfo.shippingInfoUpdated === true) {
        if (sessionStorage.getItem('applePayEnabled') === 'true') {
          if (orderDetails.applePayEnabled === undefined || orderDetails.applePayEnabled === false) {
            /* eslint-disable no-param-reassign */
            // WE REALLY NEED TO FIX THIS!!!
            orderDetails.applePayEnabled = true;
            orderDetails.appleMerchantIdentifier = sessionStorage.getItem('appleMerchantIdentifier');
            orderDetails.applePaymentRequest = JSON.parse(sessionStorage.getItem('applePaymentRequest'));
            /* eslint-enable */
          }
        }
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(hideNotification());
        dispatch(updateEditState(EDIT_STATE.SHIPPING, false));
        dispatch(updateEditState(EDIT_STATE.PAYMENT, !!(orderDetails.checkoutStates && orderDetails.checkoutStates.paymentRequired)));
      } else {
        dispatch(showErrorNotification(OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT, NOTIFICATIONS.SHIPPING));
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SHIPPING));
    }
    dispatch(asyncFetchSucess());// action to hide loader
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

/* *
 * Update shipping type
 * */
function updateShippingInfoAPI(shippingInfo, url) {
  return request({
    method: 'post',
    url,
    data: shippingInfo,
  });
}

export const updateShippingInfo = (shippingInfo) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;
  updateShippingInfoAPI(shippingInfo, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      const orderDetails = response.data.output;
      if (sessionStorage.getItem('applePayEnabled') === 'true') {
        if (orderDetails.applePayEnabled === undefined || orderDetails.applePayEnabled === false) {
          /* eslint-disable no-param-reassign */
          // WE REALLY NEED TO FIX THIS!!!
          orderDetails.applePayEnabled = true;
          orderDetails.appleMerchantIdentifier = sessionStorage.getItem('appleMerchantIdentifier');
          orderDetails.applePaymentRequest = JSON.parse(sessionStorage.getItem('applePaymentRequest'));
          /* eslint-enable */
        }
      }
      dispatch(resetState(orderDetails));// update the page with fresh data
      dispatch(updateEditState(EDIT_STATE.SHIPPING, false));
      dispatch(updateEditState(EDIT_STATE.PAYMENT, !!(orderDetails.checkoutStates && orderDetails.checkoutStates.paymentRequired)));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SHIPPING));
    }
    dispatch(asyncFetchSucess());// action to hide loader
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
  });
};

/** PieEncription logic
 * @param creditCard: string,
 * @param cvv: number,
 * @param pieEnabled: boolean
 */
const encryptCreditCard = (creditCard, cvv, pieEnabled = false) => {
  // PIE encryption
  let encryptedResult = null;
  const creditCardInfo = {
    creditCard,
    cvv,
    isEncrypted: false,
  };

  if (!pieEnabled) {
    return creditCardInfo;
  }

  if (creditCard && window.ValidatePANChecksum && !window.ValidatePANChecksum(creditCard)) {
    // Checks if creditCard is valid? Else BAU.
    return creditCardInfo;
  }

  encryptedResult = (creditCard && window.ProtectPANandCVV) ? window.ProtectPANandCVV(creditCard, cvv) : null;

  if (encryptedResult !== null) {
    return {
      creditCard: encryptedResult[0],
      cvv: encryptedResult[1],
      isEncrypted: true,
    };
  }

  return creditCardInfo;
};

/** PieEncription logic
 * @param creditCard: string,
 * @param cvv: number,
 * @param pieEnabled: boolean
 */
const encryptGiftCard = (data, pieEnabled = false) => {
  // PIE encryption
  const suffixSTR = 'PSS';
  const giftCardInfo = { ...data };
  if (!(pieEnabled && !giftCardInfo.isEncrypted && window.ProtectString)) {
    return giftCardInfo;
  }
  try {
    const encryptedCardResult = window.ProtectString(giftCardInfo.giftCard);
    const encryptedPinResult = window.ProtectString(giftCardInfo.pin);

    if (encryptedCardResult || encryptedPinResult) {
      giftCardInfo.giftCard = encryptedCardResult[0] + ' ' + window.PIE.key_id + ' ' + window.PIE.phase + ' ' + suffixSTR;
      giftCardInfo.pin = encryptedPinResult[0] + ' ' + window.PIE.key_id + ' ' + window.PIE.phase + ' ' + suffixSTR;
      giftCardInfo.isEncrypted = true;
    } else {
      return giftCardInfo;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Catch Exception:', error);
    return giftCardInfo;
  }
  return giftCardInfo;
};


/* *
 * Add credit/debit card
 * */
const addCardAPI = (cardInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit) => {
  const { creditCard: encryptedCard, cvv: encryptedCVV, isEncrypted } = encryptCreditCard(cardInfo.card_number, cardInfo.card_cvc, pieEnabled);
  const encryptedGiftCards = [];
  giftCards.map((giftCard) => encryptedGiftCards.push(encryptGiftCard(giftCard, pieEnabled)));

  const requestParams = {
    creditCardNumber: encryptedCard,
    creditCardExpMonth: cardInfo.card_month,
    creditCardExpYear: cardInfo.card_year,
    billingZipCode: cardInfo.card_zip,
    creditCardVerificationNumber: encryptedCVV,
    creditCardType: cardInfo.cardType,
    nickname: '',
    selectedpaymentType: 'newCard',
    isEncrypted,
    cardinalInit,
  };
  if (encryptedGiftCards.length > 0) {
    requestParams.giftCards = encryptedGiftCards;
  }
  // return request({
  //   method: 'get',
  //   url: 'http://www.mocky.io/v2/5a4e974d120000e51924da4d',
  // });

  if (isPastDue) {
    return request({
      method: 'post',
      url: pastDueCheckoutURL,
      data: requestParams,
    });
  }
  return request({
    method: 'post',
    url: updatePaymentInfoURL,
    data: requestParams,
  });
};
export const handleCardinalResponseUrlApi = (data, jwt, url) => request({
  method: 'post',
  url,
  data: { cardinalJWTToken: jwt },
});
export const dispatchErrorNotification = (errMsg, section) => (dispatch) => {
  dispatch(asyncFetchSucess());
  dispatch(showErrorNotification(errMsg, section));
};

export const handle3dPaymentValidated = (data, jwt) => (dispatch, getState) => {
  const state = getState().toJS();
  const { handleCardinalResponseURL } = state.orderDetails;

  handleCardinalResponseUrlApi(data, jwt, handleCardinalResponseURL).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));
      dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const addNewCard = (cardInfo, isPastDue, pieEnabled, giftCards, cardinalInit) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL, pastDueCheckoutURL } = state.orderDetails;

  addCardAPI(cardInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(hideNotification());
      if (response.data.output.cardinal3DSecureResponse && window.Cardinal) {
        window.Cardinal.continue(
          'cca',
          {
            AcsUrl: response.data.output.acsUrl,
            Payload: response.data.output.payload,
          },
          {
            OrderDetails: {
              TransactionId: response.data.output.transId,
            },
          }
        );
      } else {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));
        dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
      }
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
        dispatch(reset('addNewCard'));
        // addPaymentMethodForm.setState({ masked_card_number: '', card_number: '', card_error: '' });
        // TO DO: CLEAR STATE
      }
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
      dispatch(reset('addNewCard'));
      // addPaymentMethodForm.setState({ masked_card_number: '', card_number: '', card_error: '' });
      // TO DO: CLEAR STATE
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
  });
};

// const updatePastDuePaymentAPI = (paymentInfo) => {


// };

/* *
 * Choose payment method
 * */
const updatePaymentInfoAPI = (paymentInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit, cvvRequired) => {
  const encryptedGiftCards = [];
  if (giftCards !== undefined) { giftCards.map((giftCard) => encryptedGiftCards.push(encryptGiftCard(giftCard, pieEnabled))); }

  let requestParams = {};
  if (paymentInfo.paymentType === 'savedcard') {
    if (cvvRequired) {
      const { cvv: encryptedCVV, isEncrypted } = encryptCreditCard(null, paymentInfo.card_cvc, pieEnabled);
      requestParams = {
        creditCardVerificationNumber: encryptedCVV,
        nickname: paymentInfo.savedCardNickName,
        selectedpaymentType: 'savedCard',
        isEncrypted,
        cardinalInit,
      };
    } else {
      requestParams = {
        nickname: paymentInfo.savedCardNickName,
        selectedpaymentType: 'savedCard',
        cardinalInit,
      };
    }
  } else {
    requestParams = {
      selectedpaymentType: 'BTA',
    };
  }
  if (encryptedGiftCards.length > 0) {
    requestParams.giftCards = encryptedGiftCards;
  }
  // return request({
  //   method: 'get',
  //   url: 'http://www.mocky.io/v2/5a4e974d120000e51924da4d',
  // });
  if (isPastDue) {
    return request({
      method: 'post',
      url: pastDueCheckoutURL,
      data: requestParams,
    });
  }
  return request({
    method: 'post',
    url: updatePaymentInfoURL,
    data: requestParams,
  });
};

export const choosePaymentMethod = (paymentInfo, isPastDue, pieEnabled, giftCards, cardinalInit, cvvRequired) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL, pastDueCheckoutURL } = state.orderDetails;
  updatePaymentInfoAPI(paymentInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit, cvvRequired).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(hideNotification());
      if (response.data.output.cardinal3DSecureResponse && window.Cardinal) {
        window.Cardinal.continue(
          'cca',
          {
            AcsUrl: response.data.output.acsUrl,
            Payload: response.data.output.payload,
          },
          {
            OrderDetails: {
              TransactionId: response.data.output.transId,
            },
          }
        );
      } else {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
      }
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
        /* setTimeout(()=>{
            dispatch(hideNotification());
          }, 5000); */
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
/* *
* Reset state after apple payment processed
* */
export const updateApplePaymentInfo = (responseJSON) => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  // eslint-disable-next-line no-param-reassign
  responseJSON.showPaymentSuccessMessage = true; // WE NEED TO FIX THIS
  dispatch(resetState(responseJSON)); // update the page with fresh data
  dispatch(asyncFetchSucess());
  dispatch(hideNotification());
  dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
};
export const showApplePayErrorInfo = (errorData) => (dispatch) => {
  if (errorData && errorData.type === 'info') {
    dispatch(showInfoNotification(errorData.message));
  } else if (errorData && errorData.type === 'error') {
    dispatch(showErrorNotification(errorData.message), NOTIFICATIONS.PAYMENT);
  }
  setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);
};

/* *
 * AAL - Submit service address
 * */

const updateServiceAddressAPI = (address, url) => {
  const { deviceId, ...serviceAddress } = address;
  const requestParams = {
    deviceServiceAddress: [
      { deviceId, serviceAddress }],
    userInfo: { userRole: 'AccountOwner' },
  };
  return request({
    method: 'post',
    url,
    data: requestParams,
  });
};

export const updateServiceAddress = (address, OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateDeviceServiceAddressURL;
  updateServiceAddressAPI(address, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (response.data.output.deviceConfigInfo.deviceAddressUpdated === true) {
        if (sessionStorage.getItem('applePayEnabled') === 'true') {
          if (response.data.output.applePayEnabled === undefined || response.data.output.applePayEnabled === false) {
            /* eslint-disable no-param-reassign */
            // WE REALLY NEED TO FIX THIS!!!
            response.data.output.applePayEnabled = true;
            response.data.output.appleMerchantIdentifier = sessionStorage.getItem('appleMerchantIdentifier');
            response.data.output.applePaymentRequest = JSON.parse(sessionStorage.getItem('applePaymentRequest'));
            /* eslint-enable */
          }
        }
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(hideNotification());
        hashHistory.push('/');
      } else {
        dispatch(showErrorNotification(OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT, NOTIFICATIONS.DEVICE));
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.DEVICE));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
  });
};


/* *
 * Fetch trade-in agreement
 * */

const tradeInAgreementReceived = (agreementText = 'Some text!') => ({
  type: FETCH_TRADE_IN_AGREEMENT,
  agreementText,
});

const fetchTradeInAgreementAPI = () =>
  /* return request({
   method: 'post',
   url: '',
   data: requestParams
   }); */

  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
export const fetchTradeInAgreement = () => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  fetchTradeInAgreementAPI().then((response) => { // eslint-disable-line consistent-return
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(tradeInAgreementReceived());
      dispatch(asyncFetchSucess());// action to hide loader
      hashHistory.push('/tradeInAgreement');
    } else {
      hashHistory.push('/genericError');
      return false;
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
  });
};

/* *
 * Submit order
 * */

export const placeOrder = (submitOrderURL, optInShippingSMS, optInMtn, optInPaperFree) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const shippingMethod = (state.form && state.form.chooseShippingMethod) ? state.form.chooseShippingMethod.values : null;
  if (shippingMethod && shippingMethod.shippingRadio === 'SDD_SAMEDAY' && (!shippingMethod.availWindows || shippingMethod.availWindows === 'title')) {
    dispatch(asyncFetchFalied());
    dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_SDD_MISSING_DELIVERYWINDOW, NOTIFICATIONS.SHIPPING));
    document.getElementById('shippingSection').scrollIntoView();
  } else {
    request({
      method: 'post',
      url: submitOrderURL,
      data: {
        optInShippingSMS,
        optInMtn,
        optInPaperFree,
      },
    }).then((response) => {
      if (typeof response.status !== 'undefined' && response.status === 500) {
        dispatch(asyncFetchFalied());
        // The message should come from CQ JSON
        dispatch(showErrorNotification(state.cqContent.error.SPINNER_ERROR_MSG, NOTIFICATIONS.SUMMARY));
      } else {
        dispatch(asyncFetchSucess());// action to hide loader
        if (response.data.statusCode === API_SUCCESS_CODE) {
          window.location = response.data.output.redirectURL;
        } else {
          dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SUMMARY));
        }
      }
    }).catch(() => {
      dispatch(hideNotification());
      dispatch(asyncFetchFalied());
      // The message should come from CQ JSON
      dispatch(showErrorNotification(state.cqContent.error.SPINNER_ERROR_MSG));
    });
  }
};

export const cancelOrder = (cancelOrderURL, orderId) => (dispatch, getState) => {
  const state = getState().toJS();
  request({
    method: 'post',
    url: cancelOrderURL,
    data: {
      orderId,
    },
  }).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(asyncFetchSucess());
      // window.location = response.data.redirectionUrl;
      window.location = window.location.origin;
    }
  }).catch(() => {
    dispatch(hideNotification());
    dispatch(asyncFetchFalied());
    // The message should come from CQ JSON
    dispatch(showErrorNotification(state.cqContent.error.SPINNER_ERROR_MSG));
  });
};

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
 * * ** ** ** ** **ISPU Actions* ** ** ** ** ** ** *
 * ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
const updateStoreList = (storeList, zipCode) => ({
  type: STORE_LIST,
  data: { storeList, zipCode },
});

const fetchStoresNearBy = (zipCode, url, range, latLng) => {
  const params = {
    zipCode,
    range,
    latitude: latLng.lat,
    longitude: latLng.lng,
  };
  return request({
    method: 'post',
    url,
    data: params,
  });
};

export const submitZipCode = (zipCode, latLng) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.storeDetailsURL;
  const range = state.form.ispu.values.ispuDistance;
  fetchStoresNearBy(zipCode, url, range, latLng).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(updateStoreList(response.data.output, zipCode));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.ISPU));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

const submitISPU_Promise = (dataParam, url) => request({
  method: 'post',
  url,
  data: dataParam,
});

export const submitISPU = (data) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;

  submitISPU_Promise(data, url).then((response) => {
    dispatch(asyncFetchSucess());

    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (sessionStorage.getItem('applePayEnabled') === 'true') {
        if (response.data.output.applePayEnabled === undefined || response.data.output.applePayEnabled === false) {
          /* eslint-disable no-param-reassign */
          // WE REALLY NEED TO FIX THIS!!!
          response.data.output.applePayEnabled = true;
          response.data.output.appleMerchantIdentifier = sessionStorage.getItem('appleMerchantIdentifier');
          response.data.output.applePaymentRequest = JSON.parse(sessionStorage.getItem('applePaymentRequest'));
          /* eslint-enable */
        }
      }
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(updateEditState(EDIT_STATE.SHIPPING, false));
      dispatch(hideNotification());
      if (response.data.output.checkoutStates.paymentRequired === true && response.data.output.selectedShippingType.type === 'ISPU' && response.data.output.billingInfo.selectedPaymentMode.toLowerCase() !== 'newcard') {
        // hashHistory.push('/choosePaymentMethod');
        dispatch(updateEditState(EDIT_STATE.PAYMENT, true));
        dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_PAYMENT_SECTION_ERROR, NOTIFICATIONS.PAYMENT));
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.ISPU));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};


export const markerClicked = (storeId, reRenderMaps) => ({
  type: MARKER_SELECTED,
  storeId,
  reRenderMaps,
});


export const storeSelected = (storeId) => ({
  type: STORE_SELECTED,
  storeId,
});


export const mapClicked = () => ({
  type: MAP_CLICKED,
});

const updatePaypalPaymentInfoAPI = () =>
  // return request.post('http://www.mocky.io/v2/596801531100000c026149f3');
  request.post(PAYPAL_CMPI_LOOKUP_URL);

export const paypalPaymentMethod = () => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  updatePaypalPaymentInfoAPI().then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    window.location.href = response.data.output;
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const applePayOption = (appleMerchantIdentifier) => (dispatch) => {
  dispatch(asyncFetch());
  if (typeof window.ApplePaySession !== 'undefined' && window.ApplePaySession) {
    const promise = window.ApplePaySession.canMakePaymentsWithActiveCard(appleMerchantIdentifier);
    promise.then((canMakePayments) => {
      dispatch(asyncFetchSucess());
      dispatch(applePayOn(canMakePayments));
      if (window.reviewOrderJSON && window.reviewOrderJSON.output) {
        const outputJSON = window.reviewOrderJSON.output;
        if (outputJSON && outputJSON.applePayEnabled === true) {
          /* eslint-disable no-param-reassign */
          // WE REALLY NEED TO FIX THIS!!!
          sessionStorage.setItem('applePayEnabled', outputJSON.applePayEnabled);
          sessionStorage.setItem('appleMerchantIdentifier', outputJSON.appleMerchantIdentifier);
          sessionStorage.setItem('applePaymentRequest', JSON.stringify(outputJSON.applePaymentRequest));
          /* eslint-enable */
        }
      }
    }).catch((error) => {
      dispatch(asyncFetchFalied());
      // eslint-disable-next-line no-console
      console.log('Catch Execption:', error);
    });
  } else {
    dispatch(asyncFetchFalied());
    dispatch(applePayOn(false));
  }
};
export const applePayOn = (canMakePayments) => ({
  type: APPLE_PAY,
  canMakePayments,
});

/* *
* Generic post API
* */
const postAPI = (data, url) => (request({
  method: 'post',
  url,
  data,
}));

const getAPI = (url, paramaters) => request.get(url, { params: paramaters });


export const checkGiftCardBalance = (data, index) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.checkGiftCardBalanceURL;
  // const url = 'http://www.mocky.io/v2/5ac26d2e3300007900873069';
  const { pieEnabled } = state.orderDetails;
  const giftCardArray = [encryptGiftCard(data, pieEnabled)];
  postAPI({ giftCards: giftCardArray }, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess({ giftCardBalanceFetched: true, index, ...response.data }));// action to hide loader
      dispatch(hideNotification());
    } else {
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
export const submitGiftCard = (data) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.submitGiftCardURL;
  const { pieEnabled } = state.orderDetails;

  const giftCardArray = [];
  for (let i = 0; data.length > i; i++) {
    giftCardArray.push(encryptGiftCard(data[i], pieEnabled));
  }
  postAPI({ giftCards: giftCardArray }, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.PAYMENT));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const showMasterpassError = () => (dispatch, getState) => {
  const { orderDetails } = getState().toJS();
  const billingInfo = { ...orderDetails.billingInfo, masterpassError: false };
  dispatch(showErrorNotification(orderDetails.billingInfo.masterpassErrorMessage, NOTIFICATIONS.PAYMENT));
  dispatch(updateEditState(EDIT_STATE.PAYMENT, true));
  dispatch(resetState({ ...orderDetails, billingInfo }));
};

export const fetchSMSDevices = () => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.fetchSMSDevicesUrl;
  getAPI(url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess({ smsDevicesFetched: true, ...response.data }));// action to hide loader
      dispatch(hideNotification());
    } else {
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const sendSMS = (sendSMSTo) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.sendSMSUrl;
  getAPI(url, { sendSMSTo }).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(asyncFetchSucess({ sentSMS: true, ...response.data.output }));// action to hide loader
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const validateAuthCode = (authCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.validateAuthCodeUrl;
  getAPI(url, { authCode }).then((response) => {
    const respData = response.data;
    dispatch(asyncFetchSucess());
    if (respData.statusCode === '00') {
      dispatch(resetState(response.data.output));
      dispatch(hideNotification());
      dispatch(asyncFetchSucess({ smsAuthenticationComplete: true }));
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const updateDeviceInfo = (data, index, section) => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  // const state = getState().toJS();
  // const url = state.orderDetails.sendSMSUrl;
  // Temporary as Integration in progress
  const url = '/od/cust/auth/checkout/validateAndPersistDeviceInfo';
  postAPI(data, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(hideNotification());
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(asyncFetchSucess({ deviceInfoUpdated: true, deviceIndex: index }));
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap), section));
      }
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), section));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const getNewNpanxx = (zipCode) => (dispatch) => {
  dispatch(asyncFetch());
  // const state = getState().toJS();
  // const url = state.orderDetails.sendSMSUrl;
  // Temporary as Integration in progress
  const url = '/od/cust/auth/checkout/npaNxxNumberZipCode';
  // const url = 'http://www.mocky.io/v2/5ac3da7c3000002c00f470fe';
  getAPI(url, { zipCode, fetchNpaNxx: true }).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(hideNotification());
      dispatch(asyncFetchSucess({ newNPANXX: true, ...response.data.output }));// action to hide loader
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.DEVICE));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const changeForm = (form, field, value) => (dispatch) => {
  dispatch(change(form, field, value));
};

const setCyberSourceData = (data) => ({
  type: CYBER_SOURCE_DATA,
  data,
});

export const fetchCyberSourceDataApi = (orderId) =>
  request({
    method: 'get',
    url: 'checkout/getCybersourceSignedData?orderId=' + orderId,
  });

export const fetchCyberSourceData = (orderId) => (dispatch) => {
  dispatch(asyncFetch());
  fetchCyberSourceDataApi(orderId).then((res) => {
    dispatch(asyncFetchSucess());
    //const response = {"data" : {"output":{"orderId":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","httpPostUrl":"https://testsecureacceptance.cybersource.com/silent/pay","dataMap":{"unsigned_field_names":"card_type,card_number,card_expiry_date,card_cvn","amount":"1","bill_to_address_postal_code":"15317","signature":"2bs04hA20eZqvyfiruHELtZ5vBNup2rETmnVFOu4Q7M=","bill_to_address_state":"PA","transaction_uuid":"d63e9479-474d-4dae-8b2e-cdab9a1c939e","signed_field_names":"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,ignore_avs","locale":"en","transaction_type":"authorization,create_payment_token","bill_to_email":"aa@aa.com","reference_number":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","ignore_avs":"true","bill_to_address_country":"US","bill_to_surname":"BELTRAN","bill_to_address_line1":"301 CARRIAGE HILL APT'S","profile_id":"602C4C13-900B-46DE-9668-76CB2D14F3E3","access_key":"f43969b9e54539e3ba6ad6bb1a24ee30","bill_to_phone":"9999999999","override_custom_receipt_page":"/checkout/payment/","bill_to_address_city":"MC MURRAY","currency":"USD","bill_to_forename":"BRIAN","signed_date_time":"2018-02-16T12:47:31Z","payment_method":"card"},"cardTypeMap":{"001":"Visa","002":"MasterCard","003":"American Express","004":"Discover"}},"errorMap":null,"statusMessage":"Service completed Successfully.","statusCode":"00"}};
    dispatch(setCyberSourceData(res));
  }).catch((err) => {
    console.log('Error in err', err);
  });
};

const setPostCyberSourceData = (data) => ({
  type: CYBER_SOURCE_DATA,
  data,
});

export const postCyberSourceDataApi = (data,url) =>
  request({
    method: 'post',
    url,
    data,
  });

export const postCyberSourceData = (data, url) => (dispatch) => {
  dispatch(asyncFetch());
  postCyberSourceDataApi(data, url).then((res) => {
    dispatch(asyncFetchSucess());
    //const response = {"data" : {"output":{"orderId":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","httpPostUrl":"https://testsecureacceptance.cybersource.com/silent/pay","dataMap":{"unsigned_field_names":"card_type,card_number,card_expiry_date,card_cvn","amount":"1","bill_to_address_postal_code":"15317","signature":"2bs04hA20eZqvyfiruHELtZ5vBNup2rETmnVFOu4Q7M=","bill_to_address_state":"PA","transaction_uuid":"d63e9479-474d-4dae-8b2e-cdab9a1c939e","signed_field_names":"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,ignore_avs","locale":"en","transaction_type":"authorization,create_payment_token","bill_to_email":"aa@aa.com","reference_number":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","ignore_avs":"true","bill_to_address_country":"US","bill_to_surname":"BELTRAN","bill_to_address_line1":"301 CARRIAGE HILL APT'S","profile_id":"602C4C13-900B-46DE-9668-76CB2D14F3E3","access_key":"f43969b9e54539e3ba6ad6bb1a24ee30","bill_to_phone":"9999999999","override_custom_receipt_page":"/checkout/payment/","bill_to_address_city":"MC MURRAY","currency":"USD","bill_to_forename":"BRIAN","signed_date_time":"2018-02-16T12:47:31Z","payment_method":"card"},"cardTypeMap":{"001":"Visa","002":"MasterCard","003":"American Express","004":"Discover"}},"errorMap":null,"statusMessage":"Service completed Successfully.","statusCode":"00"}};
    dispatch(setPostCyberSourceData(res));
  }).catch((err) => {
    console.log('Error in err', err);
  });
};
