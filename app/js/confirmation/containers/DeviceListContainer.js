
import { connect } from 'react-redux';

import DeviceList from '../components/DeviceList';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    cqKeys: data.cqJSON,
    devices: data.devices,
    deviceConfigInfo: data.deviceConfigInfo,
  };
};

const DeviceListDetails = connect(mapStateToProps)(DeviceList);

export default DeviceListDetails;
