import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const NewDevices = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.newDevices && props.updatePlanPromptInfo.newDevices.length > 0 && (
      <div className="margin20 noSideMargin">
        <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_6 bold">
          {props.cq.label.DT_OD_NEW_DEVICES_TEXT}
        </h2>

        {props.updatePlanPromptInfo.newDevices.map((plan) => (
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


NewDevices.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default NewDevices;
