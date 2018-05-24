/**
 *
 * This is the entry file for the application
 *
* */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import a11y from 'react-a11y';
import axios from 'axios';
import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';
import { orderDetails, cqContent, customerAgreement, asyncCallStatus, applePayAvailable, editState, storeDetails } from './reducer';
import { notification } from '../common/NotificationBar/reducer';
import { EDIT_STATE } from './constants';

import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/arrows.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import './../../css/modules/modal.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/accordion.scss';
import './../../css/pages/checkout/checkout.scss';
import cq from './../../cq/cq_checkout.json';
// import reviewOrderJSON from './../../json/checkout/bta-ispu.js'; // eslint-disable-line

// import './applePay/assests/applepay.css';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.reviewOrderJSON = reviewOrderJSON;
}

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    orderDetails: window.reviewOrderJSON.output || {},
    cqContent: result.data,
    editState: {
      [EDIT_STATE.SHIPPING]: !!(window.reviewOrderJSON.output.checkoutStates && (window.reviewOrderJSON.output.checkoutStates.shippingAddressChangeRequired || window.reviewOrderJSON.output.checkoutStates.shippingAddressRequired || window.reviewOrderJSON.output.checkoutStates.shippingAddressRequired.shippingMethodRequired)),
      [EDIT_STATE.PAYMENT]: !!(window.reviewOrderJSON.output.checkoutStates && window.reviewOrderJSON.output.checkoutStates.paymentRequired),
    },
  };
  const store = configureStore(initialState, {
    orderDetails, cqContent, customerAgreement, asyncCallStatus, applePayAvailable, notification, editState, storeDetails,
  });

  injectTapEventPlugin(); // Instant TapEvents for React http://facebook.github.io/react/

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
