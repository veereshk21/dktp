import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ProtectionPlans from './../components/index';

/**
 * Returns only the first and last item in the array
 * @param equipmentProtectionList
 * @returns {Array}
 */
const getFewerPlans = (protectionTypes) => { // eslint-disable-line
  const protectionList = protectionTypes.single;
  return protectionList.filter((protection, index) => { // eslint-disable-line
    if (index === 0 || index === protectionList.length - 1) {
      return protection;
    }
  });
};

const getProtections = (equipmentProtectionList) => { // eslint-disable-line
  return equipmentProtectionList.reduce((groups, item, index) => { // eslint-disable-line
    const protection = item;
    const types = groups;
    protection.index = index;
    const key = protection.tmpMdPlan === true ? 'multi' : 'single';
    (types[key] = types[key] || []).push(protection);
    return types;
  }, {});
};

const mapStateToProps = (state) => {
  const data = state.get('data').toJS();
  const appleCare = state.get('appleCare') && state.get('appleCare').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const protectionTypes = getProtections(data.mtnDeviceInfo.equipmentProtectionList);
  const fewPlans = getFewerPlans(protectionTypes);
  return {
    cqContent,
    fewPlans,
    tpmdHeader: data.mtnDeviceInfo.tpmdHeader,
    tpmdDescription: data.mtnDeviceInfo.tpmdDescription,
    tapEligible: data.mtnDeviceInfo.tapEligible,
    tapExist: data.mtnDeviceInfo.tapExist,
    tmprefreshOptionAvailable: data.mtnDeviceInfo.tmprefreshOptionAvailable,
    tmpMdPlan: data.mtnDeviceInfo.tmpMdPlan,
    commerceItemId: data.commerceItemId,
    deviceSkuId: data.deviceSkuId,
    deviceProdId: data.deviceProdId,
    saveUrl: data.saveUrl,
    // TODO Need to read fron JSON once BE is ready.
    showAllPlans: false,
    mtn: data.mtnDeviceInfo.mtn,
    multiDeviceProtection: data.mtnDeviceInfo.multiDeviceProtection,
    isFetching: state.get('isFetching'),
    editProtection: data.editProtection,
    protectionPlans: data.mtnDeviceInfo.equipmentProtectionList,
    deviceImage: state.get('deviceImage'),
    legacyPlanFlag: data.legacyPlanFlag,
    cpcskip: data.cpcskip,
    editCart: data.editCart,
    ...asyncCallStatus,
    deviceProtectionRequired: data.deviceProtectionRequired,
    fromEditDeviceForEUP: data.fromEditDeviceForEUP,
    protectionTypes,
    bundleData: state.get('bundleAccessories').bundleAccessories,
    bundleItemInCart: data.bundleItemInCart,
    appleCare: appleCare && appleCare[0],
    bundleAccessoriesURL: data.bundleAccessoriesURL,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProtectionPlans);
