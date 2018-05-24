
import { connect } from 'react-redux';

import PlanList from '../components/PlanList';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    cqKeys: data.cqJSON,
    devices: data.devices,
    plans: data.plans,
    cpcOrder: data.cpcOrder,
  };
};

const PlanListDetails = connect(mapStateToProps)(PlanList);

export default PlanListDetails;
