import { connect } from 'react-redux';

import OrderInfo from '../../components/header/orderInfo';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  return {
    orderId: data.orderId,
    cqContent: state.get('cqContent').toJS(),
    multiOrderDetails: data.multiOrderDetails,
    subOrders: data.subOrders,
    comboOrder: data.comboOrder,
    confirmationNumberText: data.confirmationNumberText,
  };
};

export default connect(mapStateToProps)(OrderInfo);
