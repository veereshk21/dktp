import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';
// import PlansSwiperComponent from './PlansSwiperComponent';

import AsyncComponent from './../../common/AsyncComponent';

const PlansSwiperComponent = AsyncComponent(() => import('./PlansSwiperComponent'));
class SinglePlanComponent extends Component {
  static propTypes = {
    cq: PropTypes.object.isRequired,
    setAdditionalPlanDetails: PropTypes.func,
    onPlanSelected: PropTypes.func,
    singleLinePlans: PropTypes.array,
    selectedPlanSorId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modalOpen: false,
      modalContent: '',
    };
  }
  render() {
    const {
      singleLinePlans,
      setAdditionalPlanDetails,
      cq,
      selectedPlanSorId,
    } = this.props;
    return (
      <Col xs={12} className="" style={{ padding: 0 }}>
        <PlansSwiperComponent
          cqKeys={cq}
          plans={singleLinePlans}
          selectedPlanSorId={selectedPlanSorId}
          setAdditionalPlanDetails={setAdditionalPlanDetails}
          onPlanSelected={this.props.onPlanSelected}
        />
      </Col>
    );
  }
}

export default SinglePlanComponent;
