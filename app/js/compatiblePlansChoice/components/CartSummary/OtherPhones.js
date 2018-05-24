import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const OtherPhones = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.existingPhones && props.updatePlanPromptInfo.existingPhones.length > 0 && (
      <div className="margin20 noSideMargin">
        <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_6 bold">
          {props.cq.label.DT_OD_OTHER_PHONES_TEXT}
        </h2>
        {props.updatePlanPromptInfo.existingPhones.map((plan) => (
          <Row className="margin20 noSideMargin fontSize_6">
            <Col xs={9}>
              <p
                className="fontSize_6"
                dangerouslySetInnerHTML={{ __html: plan.deviceName }}
              />
            </Col>
            <Col xs={2}>
              <p className="fontSize_6">
                ${props.updatePlanPromptInfo.discount ? plan.discountCost : plan.deviceCost}
              </p>
            </Col>
          </Row>
        ))}
      </div>
    )}
  </div>
);


OtherPhones.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default OtherPhones;
