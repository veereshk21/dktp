import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const OtherDevices = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.existingDevices && props.updatePlanPromptInfo.existingDevices.length > 0 && (
      <div className="margin20 noSideMargin">
        <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_6 bold">
          {props.cq.label.DT_OD_OTHER_DEVICES_TEXT}
        </h2>
        {props.updatePlanPromptInfo.existingDevices.map((plan, index) => (
          <Row className="margin20 noSideMargin fontSize_6" key={'otherDevice-' + index}>
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


OtherDevices.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default OtherDevices;
