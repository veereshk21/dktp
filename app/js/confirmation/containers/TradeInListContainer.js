
import { connect } from 'react-redux';

import TradeInList from '../components/TradeInList';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    cqKeys: data.cqJSON,
    tradeInList: data.transformedTradeInPromoDetails.tradeInDevices,
    // currentRecycleDeviceInfo: data.tradeInDevicesDetails.tradeinDevices.currentRecycleDeviceInfo
  };
};

const TradeInListDetails = connect(mapStateToProps)(TradeInList);

export default TradeInListDetails;
