import { fromJS } from 'immutable';

import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  RESET_STATE,
  STORE_LIST,
  MARKER_SELECTED,
  STORE_SELECTED,
  MAP_CLICKED,
  AGREEMENT_CLICKED,
  APPLE_PAY,
  UPDATE_EDIT_STATE,
} from './constants';


/**
 * Reducer to handle all async calls and show/hide loader accordingly. This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};


/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
 * * ** ** ** ** **ISPU reducer* ** ** ** ** ** ** *
 * ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
export const storeDetails = (state = {}, action) => {
  switch (action.type) {
    case STORE_LIST:
      return Object.assign({}, state, { storeList: action.data.storeList }, {
        selectedStoreId: null, navigateToStoreDetail: false, zipCode: action.data.zipCode, mapOnlyView: false, reRenderMaps: true,
      });
    case MARKER_SELECTED:
      return Object.assign({}, state, {
        selectedStoreId: action.storeId, navigateToStoreDetail: false, mapOnlyView: false, reRenderMaps: action.reRenderMaps,
      });
    case STORE_SELECTED:
      return Object.assign({}, state, { selectedStoreId: action.storeId, navigateToStoreDetail: true, reRenderMaps: false });
    case MAP_CLICKED:
      return Object.assign({}, state, { selectedStoreId: null, mapOnlyView: true, reRenderMaps: true });
    default:
      return state;
  }
};

export const customerAgreement = (state = {}, action) => {
  switch (action.type) {
    case AGREEMENT_CLICKED: {
      const agreement = {};
      agreement[action.agreementState.name] = action.agreementState.state;
      return Object.assign({}, state, agreement);
    }
    default:
      return state;
  }
};

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};


/**
 * Main checkout reducer which is used to reset the checkout view and data, the entire window json is added as a new object orderDetails
 * @param state : an empty array , populated by intialState in createStore
 * @param action : data and type
 * @returns {*} by default a combinedReducer which acts on individual parts of the state tree.
 */
export const orderDetails = (state = {}, action) => {
  switch (action.type) {
    case RESET_STATE: {
      const newState = fromJS(action.data);
      return newState;
    }
    default:
      return state;
    // return state;
  }
};

export const applePayAvailable = (state = {}, action) => {
  switch (action.type) {
    case APPLE_PAY: {
      const { canMakePayments } = action;
      return canMakePayments;
    }
    default:
      return state;
    // return state;
  }
};
export const editState = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDIT_STATE: {
      const newState = { ...state.toJS(), [action.data.section]: action.data.value };
      return fromJS(newState);
    }
    default:
      return state;
  }
};
