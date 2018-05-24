import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const PlanCost = (props) => (
  <div>
    {props.updatePlanPromptInfo && !props.updatePlanPromptInfo.jaxPlan && (
      <div className="margin20 noSideMargin">
        <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_6 bold">
          {props.cq.label.DT_OD_ACCOUNT_ACCESS_TEXT}
        </h2>

        <Row className="margin20 noSideMargin fontSize_6">
          <Col xs={9}>
            <p
              className="fontSize_6"
              dangerouslySetInnerHTML={{ __html: props.cq.label.DT_OD_PLAN_COST_TEXT }}
            />
          </Col>
          <Col xs={2}>
            <p className="fontSize_6">
              ${props.updatePlanPromptInfo.discount ? props.updatePlanPromptInfo.discountedAccountAccessPrice : props.updatePlanPromptInfo.accountAccessPrice}
            </p>
          </Col>
        </Row>
      </div>)}
  </div>
);


PlanCost.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default PlanCost;
