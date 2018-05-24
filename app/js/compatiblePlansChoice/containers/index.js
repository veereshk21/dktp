import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CompatiblePlans from '../components';
import { SINGLE_LINE, MULTI_LINE, DATA_ONLY } from './../constants';

const mapStatetoProps = (state) => {
  const json = state.toJSON();
  let additionalPlanDetails = json.additionalPlanDetails;
  additionalPlanDetails = !(Object.keys(additionalPlanDetails).length === 0 && additionalPlanDetails.constructor === Object) ? additionalPlanDetails : null;
  let isPlanDetailsShow = false;
  if (additionalPlanDetails) {
    isPlanDetailsShow = true;
  }
  const singleLinePlans = json.output.plans.filter(
    (plan) => (plan.planType === SINGLE_LINE || plan.jaxPlan)
  );

  const multiLinePlans = json.output.plans.filter(
    (plan) => (plan.planType === MULTI_LINE || plan.jaxPlan)
  );

  const dataOnlyPlans = json.output.plans.filter(
    (plan) => plan.planType === DATA_ONLY
  );

  const singleDevicePlans = json.output.plans.filter((plan) => plan.planType === SINGLE_LINE);
  return {
    updatePlanPromptInfo: json.output,
    additionalPlanDetails,
    isPlanDetailsShow,
    cq: json.cq,
    isFetching: json.asyncCallStatus.isFetching,
    isSingleDevice: singleDevicePlans.length > 0,
    singleLinePlans: singleDevicePlans.length > 0 ? singleLinePlans : singleDevicePlans,
    multiLinePlans: multiLinePlans.concat(dataOnlyPlans),
    isMultiUpgrade: json.output.multiUpgradeDetails && json.output.multiUpgradeDetails.displayModal,
    multiUpgradeContent: json.output.multiUpgradeDetails,
    dataOnlyPlans,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(CompatiblePlans);
