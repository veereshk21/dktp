/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';

import OrderInfo from '../components/OrderInfo';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    orderId: data.orderId,
    cqKeys: data.cqJSON,
    multiOrderDetails: data.multiOrderDetails,
    subOrders: data.subOrders,
    comboOrder: data.comboOrder,
    confirmationNumberText: data.confirmationNumberText,
  };
};

const OrderInfoContainer = connect(mapStateToProps)(OrderInfo);

export default OrderInfoContainer;
