import React from 'react';
import PropTypes from 'prop-types';
import ComboOrder from './ComboOrder';

/* eslint-disable arrow-body-style */
const OrderInfo = ({ orderId, cqKeys, multiOrderDetails, subOrders, comboOrder }) => {
  return (

    <div className="pad10 onlyTopPad">
      {(multiOrderDetails || (comboOrder && subOrders)) ?
        <ComboOrder cqKeys={cqKeys} multiOrderDetails={multiOrderDetails} subOrders={subOrders} comboOrder={comboOrder} />
        :
        <div>
          <div className="bold fontSize_4 margin15 onlyTopMargin">{cqKeys.label.DT_OD_CONFIRMATION_ORDER_TEXT} {orderId}</div>
        </div>
      }
    </div>


  );
};

OrderInfo.propTypes = {
  orderId: PropTypes.string.isRequired,
  multiOrderDetails: PropTypes.array,
  comboOrder: PropTypes.bool,
  subOrders: PropTypes.array,
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_CONFIRMATION_ORDER_TEXT: PropTypes.string,
    }),
  }),
};
export default OrderInfo;
