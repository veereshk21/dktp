import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearCart, toggleModal, getRecommendedAcc, handle3dPaymentValidated } from './../actions';
import Index from '../components';
import { showErrorNotification } from './../../common/NotificationBar/actions';

const getTotalItemsCount = (cartData) => {
  const totalDevices = cartData.items ? cartData.items.length : 0;
  const totalStandAloneAccessories = cartData.accessories ? cartData.accessories.length : 0;

  return (totalDevices + totalStandAloneAccessories);
};
const getLastIntent = (cartData) => {
  const totalDevices = cartData.items ? cartData.items.length : 0;
  if (totalDevices) {
    return cartData.items[totalDevices - 1].flow === 'EUP' ? 'Upgraded' : 'Added';
  }
  return totalDevices;
};
const mapStateToProps = (state) => {
  const data = state.toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cartData = state.get('cartData').get('output').toJS();
  const cqContent = state.get('cqContent').toJS();
  const modalStatus = state.get('modalStatus');
  const totalItems = getTotalItemsCount(cartData);
  const lastIntent = getLastIntent(cartData);
  return {
    ...cartData,
    cqContent,
    asyncCallStatus,
    totalItems,
    lastIntent,
    modalStatus,
    authInfo: cartData.authInfo,
    masterpass3DSecure: cartData.masterpass3DSecure,
    emailResponse: data.accountEmailFeature || {},
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearCart, toggleModal, getRecommendedAcc, showErrorNotification, handle3dPaymentValidated }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
