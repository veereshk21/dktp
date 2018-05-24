import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearCart,
  removeDevice,
  removeTradeInDeviceFromCart,
} from './../actions';

import DeviceDetails from '../components/DeviceDetails';

const mapStateToProps = (state) => {
  const isNSOFlow = state.get('cartData').get('items') ? state.get('cartData').get('output').get('items').filter((mdn) => mdn.get('flow') === 'NSO').get(0) || false : false;
  const cartData = state.get('cartData').get('output').toJS();
  const recommendedAccessories = state.get('recommendedAccessories');
  const cqContent = state.get('cqContent').toJS();
  return { ...cartData, cqContent, isNSOFlow, recommendedAccessories };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearCart, removeDevice, removeTradeInDeviceFromCart }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeviceDetails));
