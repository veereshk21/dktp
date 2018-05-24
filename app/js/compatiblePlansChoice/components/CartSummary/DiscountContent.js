import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const DiscountContent = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.discount && (props.updatePlanPromptInfo.discounts && props.updatePlanPromptInfo.discounts.length) > 0 && (
      <div className="margin20 noSideMargin">
        <h2 className="h5 orderSummarySidebar_mainHeading color_00">
          {props.cq.label.DT_OD_DISCOUNTS_TEXT}
        </h2>
        {props.updatePlanPromptInfo.discounts.map((plan) => (
          <Row className="margin20 noSideMargin">
            <Col xs={9}>
              <p
                className="fontSize_6"
                dangerouslySetInnerHTML={{ __html: plan.discountName }}
              />
            </Col>
            <Col xs={2}>
              <p className="fontSize_6">-${plan.discountPrice}</p>
            </Col>
          </Row>
        ))}
      </div>
    )}
  </div>
);


DiscountContent.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default DiscountContent;
