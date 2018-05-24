import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import { ZERO_PRICE } from './../../constants';

const UpgradedDevices = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.upgradeDevices && props.updatePlanPromptInfo.upgradeDevices.length > 0 && (
      <div className="margin20 noSideMargin">
        <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_6 bold">
          {props.cq.label.DT_OD_UPGRADED_DEVICES_TEXT}
        </h2>

        {props.updatePlanPromptInfo.upgradeDevices.map((plan) => (
          <Row className="margin20 noSideMargin">
            <Col xs={9}>
              <p
                className="fontSize_6"
                dangerouslySetInnerHTML={{ __html: plan.deviceName }}
              />
            </Col>
            <Col xs={2}>
              <p className="fontSize_6">
                ${(parseFloat(plan.discountCost).toFixed(2) !== ZERO_PRICE && parseFloat(plan.discountCost).toFixed(2) < parseFloat(plan.deviceCost).toFixed(2)) ?
                  plan.discountCost : plan.deviceCost
                }
              </p>
            </Col>
          </Row>
        ))}
      </div>
    )}
  </div>
);


UpgradedDevices.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default UpgradedDevices;
