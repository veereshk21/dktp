export const RESET_STATE = 'RESET_STATE';
export const ASYNC_FETCH = 'ASYNC_FETCH';
export const ASYNC_FETCH_SUCCESS = 'ASYNC_FETCH_SUCCESS';
export const ASYNC_FETCH_FAILURE = 'ASYNC_FETCH_FAILURE';
export const ASYNC_FETCH_INVALIDATE = 'ASYNC_FETCH_INVALIDATE';
export const CHOOSE_PAYMENT_METHOD = 'CHOOSE_PAYMENT_METHOD';
export const STORE_LIST = 'STORE_LIST';
export const MARKER_SELECTED = 'MARKER_SELECTED';
export const STORE_SELECTED = 'STORE_SELECTED';
export const MAP_CLICKED = 'MAP_CLICKED';
export const AGREEMENT_CLICKED = 'AGREEMENT_CLICKED';
export const API_SUCCESS_CODE = '00';
export const API_FAILURE_CODE = '01';

export const BILL_TO_ACCOUNT = 'BTA';
export const APPLE_PAY = 'APPLE_PAY';

// TODO: Remove this AJAX URL and get from JSON
export const PAYPAL_CMPI_LOOKUP_URL = '/od/cust/auth/checkout/paypal/cmpilookup?triggerFrom=PAYMENT';

// Section Edit States
export const UPDATE_EDIT_STATE = 'UPDATE_EDIT_STATE';
export const SHIPPING = 'shipping';
export const PAYMENT = 'payment';
export const EDIT_STATE = {
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
  DEVICE: 'device',
};

export const NOTIFICATIONS = {
  HEADER: 'page-header',
  SHIPPING: 'shipping-section',
  PAYMENT: 'payment-section',
  DEVICE: 'device-section',
  PORTIN: 'portin-modal',
  AGREEMENT: 'agreement-section',
  SUMMARY: 'summary-section',
  SECURE_PIN: 'secure-pin-modal',
  ISPU: 'ispu-modal',
};
