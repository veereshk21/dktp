import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const NewPhones = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.newPhones && props.updatePlanPromptInfo.newPhones.length > 0 && (
      <div className="margin20 noSideMargin">
        <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_6 bold">
          {props.cq.label.DT_OD_NEW_PHONES_TEXT}
        </h2>

        {props.updatePlanPromptInfo.newPhones.map((plan, index) => (
          <Row className="margin20 noSideMargin fontSize_6" key={'newPhone-' + index}>
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
      </div>)}
  </div>
);


NewPhones.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default NewPhones;
