import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import CheckedDevices from './CheckedDevices';
import PlanDetails from './PlanDetails';

const RightSection = (props) => {
  const showChecked = props.showCheckedDevices && props.showCheckedDevices.output;
  // const showCheckedFromPage = props.pageJSON.checkedDevices;
  let deviceDetails;
  if (showChecked) {
    deviceDetails = props.showCheckedDevices.output;
  }
  const { cqJSON } = props;

  return (
    <Col sm={6} md={6} lg={4}>
      {props.pageJSON.planDetails &&
        <PlanDetails planDetails={props.pageJSON.planDetails} cqJSON={cqJSON} />
      }
      {(!showChecked) ?
        <Row className="pad18 noSidePad">
          <Col xs={12}>
            <Row className="pad10 onlyBottomPad">
              <Col xs={12}>
                <h3>{cqJSON.label.DT_OD_BYOD_CHECKED_DEVICE_TITLE}</h3>
              </Col>
            </Row>
            <Row className="checkedDeviceInfo background_gray_one">
              <Col xs={12} className="fontSize_4">
                {cqJSON.label.DT_OD_BYOD_CHECKED_DEVICE_DESCRIPTION}
              </Col>
            </Row>
          </Col>
        </Row> :
        <CheckedDevices
          deviceDetail={deviceDetails}
          cqJSON={cqJSON}
          showDeviceId={props.showDeviceId}
          showSimId={props.showSimId}
          removeDevice={props.removeDevice}
          removeDeviceUrl={props.pageJSON.removeDeviceUrl}
        />
      }
    </Col>
  );
};

// Eslint is acting crazy, not correctly detecting showDeviceId & showSimId
RightSection.propTypes = {
  cqJSON: PropTypes.object,
  showDeviceId: PropTypes.bool, // eslint-disable-line
  showSimId: PropTypes.bool, // eslint-disable-line
  showCheckedDevices: PropTypes.object,
  pageJSON: PropTypes.object,
  removeDevice: PropTypes.func,
};

export default RightSection;
