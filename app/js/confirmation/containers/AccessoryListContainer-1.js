
import { connect } from 'react-redux';

import AccessoryList from '../components/AccessoryList';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    cqKeys: data.cqJSON,
    accessoryList: data.devices.accessories,
    accessoriesBundle: data.devices.accessoriesBundle,
    featureList: data.featureList,
    standaloneAccessoryList: data.accessories,
  };
};

const AccessoryListDetails = connect(mapStateToProps)(AccessoryList);

export default AccessoryListDetails;
