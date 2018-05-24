import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServiceAddressEdit from '../../components/devices/serviceAddressEdit';
import * as actionCreators from '../../actions';

import * as NotificationActions from '../../../common/NotificationBar/actions';

function mapStateToProps(state, props) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const forms = state.get('form').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const getFormValue = (field) => (forms.serviceAddress && forms.serviceAddress.values ? forms.serviceAddress.values[field] : null);
  const addressInfo = data.shippingInfo.addressInfo;
  const { serviceAddress } = props.device;
  return {
    cqContent,
    ...asyncCallStatus,
    devices: data.deviceConfigInfo.devices,
    states: data.states,
    sameAsShippingAddress: getFormValue('sameAsShippingAddress'),
    getFormValue,
    initialValues: {
      address1ServAddress: serviceAddress.address1,
      address2ServAddress: serviceAddress.address2,
      cityServAddress: serviceAddress.city,
      firstNameServAddress: serviceAddress.firstName,
      lastNameServAddress: serviceAddress.lastName,
      phoneNumberServAddress: serviceAddress.phoneNumber,
      sameAsShippingAddress: !!props.device.sameAsShippingAddress,
      stateServAddress: serviceAddress.state,
      zipcodeServAddress: serviceAddress.zipCode,
    },
    addressInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAddressEdit);
