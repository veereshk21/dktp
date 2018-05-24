import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import DevicePrice from '../components/DevicePrice';

const mapStateToProps = (state) => {
  const asyncStatusCall = state.get('asyncCallStatus');
  const toggleEnterZip = state.get('toggleEnterZip');
  const data = state.get('cartData').get('output').toJS();
  return {
    cartData: data,
    isEnterZipDisplay: toggleEnterZip && toggleEnterZip.isEnterZipDisplay,
    cq: state.get('cqContent').toJS(),
    cpc: data.cpcSucessful,
    asyncCallStatus: asyncStatusCall,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DevicePrice));
