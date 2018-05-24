import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeStandAloneAccessory, removeAccessoryBundle } from './../actions';
import StandAloneAccessoriesWrapper from './../components/StandAloneAccessoriesWrapper';

const mapStateToProps = (state) => {
  // const asyncCallStatus = state.get('asyncCallStatus');
  const cartData = state.get('cartData').get('output').toJS();
  const accessories = cartData.accessories;
  const accessoriesBundle = cartData.accessoriesBundle;
  const cqContent = state.get('cqContent').toJS();
  return {
    accessories,
    accessoriesBundle,
    cqContent,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ removeStandAloneAccessory, removeAccessoryBundle }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StandAloneAccessoriesWrapper));
