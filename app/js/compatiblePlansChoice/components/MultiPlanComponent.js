import { Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// import PlansSwiperComponent from './PlansSwiperComponent';


import AsyncComponent from './../../common/AsyncComponent';

const PlansSwiperComponent = AsyncComponent(() => import('./PlansSwiperComponent'));
class MultiPlanComponent extends Component {
  static propTypes = {
    updatePlanPromptInfo: PropTypes.object.isRequired,
    cq: PropTypes.object.isRequired,
    setAdditionalPlanDetails: PropTypes.func,
    multiLinePlans: PropTypes.array,
    onPlanSelected: PropTypes.func,
    selectedPlanSorId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isHidden: false,
      showMore: 'Show more Data options',
      arrowClass: 'font-icon_arrowDown arrowStyle',
      modalOpen: false,
    };
  }

  render() {
    const { updatePlanPromptInfo, setAdditionalPlanDetails, cq, multiLinePlans, selectedPlanSorId } = this.props;
    return (
      <Col xs={12} className="" style={{ padding: 0 }}>
        <PlansSwiperComponent
          cqKeys={cq}
          plans={multiLinePlans}
          selectedPlanSorId={selectedPlanSorId}
          setAdditionalPlanDetails={setAdditionalPlanDetails}
          comparePlansEnabled={updatePlanPromptInfo.comparePlansEnabled}
          onPlanSelected={this.props.onPlanSelected}
        />
      </Col>
    );
  }
}

export default MultiPlanComponent;
