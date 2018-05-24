import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import EditButton from '../../../common/EditButton/index';
import ToolTip from '../../../common/ToolTip/index';
import { normalizePhoneNumber, normalizeNpaNxxPhoneNumber } from '../../../common/validation';

const DeviceInfo = (props) => {
  const { cqContent, device, index, editDeviceOpened, displayImeiId } = props;
  let deviceNumber = '';

  if (device.npnxxCustomerSelection === 'transfer' && device.portInDetails) {
    deviceNumber = `Transfer ${normalizePhoneNumber(device.portInDetails.existingNumber)}`;
  } else if (device.flow === 'AAL' || device.flow === 'NSO') {
    deviceNumber = normalizeNpaNxxPhoneNumber(device.npaNxxnumber);
  } else {
    deviceNumber = normalizePhoneNumber(device.mtnNumber);
  }
  return (
    <Row>
      <Col xs={3} sm={3} md={3} lg={2}>
        <img className="height102" src={device.deviceImageUrl} alt={device.manufactureName + ' ' + device.deviceName} />
      </Col>
      <Col xs={9} lg={10} className="noPad">
        <Row>
          <Col xs={6}>
            <p className="bold fontSize_5">
              {index + 1}. <span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} />
            </p>
          </Col>
          <Col xs={6}>
            <p className="bold fontSize_5 displayInlineBlock">
              {cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS}
            </p>
            <ToolTip
              className="margin3 onlyLeftMargin displayInlineBlock"
              ariaLabel="Billing address information tooltip"
              text={cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS_TOOLTIP}
              noRenderHTML
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <p className="fontSize_2" >{device.color}{device.size ? ',' : ''} {device.size}</p>
            {device.numberShareDevice ?
              <div>
                <div>
                  <p className="fontSize_2 displayInlineBlock">New: {deviceNumber}</p>
                  {(device.flow === 'AAL' || device.flow === 'NSO') && !editDeviceOpened &&
                    <EditButton onClick={props.onEdit} />
                  }
                </div>
                <p className="fontSize_2">Sharing: {device.numberSharedMtn && normalizePhoneNumber(device.numberSharedMtn)}</p>
              </div>
              :
              <div>
                <p className="fontSize_2 displayInlineBlock">{deviceNumber}</p>
                {(device.flow === 'AAL' || device.flow === 'NSO') && !editDeviceOpened &&
                  <EditButton onClick={props.onEdit} />
                }
              </div>

            }
            {displayImeiId &&
              <p className="fontSize_2">{cqContent.label.DT_OD_CHECKOUT_DEVICES_DEVICEID_TEXT} {displayImeiId}</p>
            }
          </Col>
          <Col xs={6}>
            <div className="fontSize_2">
              {device.sameAsShippingAddress ?
                <span className="verticalBottom"> {cqContent.label.DT_OD_CHECKOUT_DEVICES_SERVICE_ADDRESS_SAME_AS_SHIPPING}</span>
                :
                <span className="deviceServiceAddress verticalBottom">
                  <span>{device.serviceAddress.address1}, </span>
                  {device.serviceAddress.address2 &&
                    <span>{device.serviceAddress.address2}, </span>
                  }
                  <span>{device.serviceAddress.city}, {device.serviceAddress.state}, {device.serviceAddress.zipCode}</span>

                </span>
              }
              {!editDeviceOpened &&
                <EditButton onClick={props.onEdit} />
              }
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
DeviceInfo.propTypes = {
  cqContent: PropTypes.object,
  device: PropTypes.object,
  index: PropTypes.number,
  editDeviceOpened: PropTypes.bool,
  onEdit: PropTypes.func,
  displayImeiId: PropTypes.string,
};
export default DeviceInfo;
