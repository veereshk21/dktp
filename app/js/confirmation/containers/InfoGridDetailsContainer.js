
import { connect } from 'react-redux';

import infoGridCenter from '../components/InfoGridDetails';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    cqKeys: data.cqJSON,
    billAddress: data.billingInfo.billingAddress,
    shipAddress: data.shippingInfo,
    selectedShippingType: data.selectedShippingType,
    billingInfo: data.billingInfo,
    checkoutStates: data.checkoutStates,
    splitShipment: data.splitShipment,
  };
};

const infoGridDetails = connect(mapStateToProps)(infoGridCenter);

export default infoGridDetails;
