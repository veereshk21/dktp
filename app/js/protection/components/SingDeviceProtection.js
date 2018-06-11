import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';

const SingleDeviceProtection = ({ fewPlans, cqContent, protectionTypes, deviceDetails, showAllPlans, selectedOption, onShowAllProtection, onProtectionChange }) => {
  const deviceName = deviceDetails ? (deviceDetails.brandName + ' ' + deviceDetails.displayName + ', ' + deviceDetails.capacity + ' in ' + deviceDetails.color) : '';
  const deviceUrl = deviceDetails ? deviceDetails.displayImageURL : '';
  const protectionArr = showAllPlans === true ? protectionTypes.single : fewPlans;
  return (
    <div>
      <div className="pad18">
        <h2 className="fontSize_6">
          {cqContent.label.DT_OD_PROTECTION_TMP_SD_TITLE}
        </h2>
        <p className="margin12 noSideMargin">{cqContent.label.DT_OD_PROTECTION_TMP_SD_SUB_TITLE}</p>
      </div>
      <Row>
        <Col xs={4} className="textAlignCenter">
          <div className="bold margin6 onlyTopMargin fontSize_5" dangerouslySetInnerHTML={{ __html: deviceName }} />
          <img className="width50 margin18 noSideMargin" src={deviceUrl} alt={deviceName} />
        </Col>
        <Col xs={8}>
          {protectionArr.map((protection,index) => { // eslint-disable-line
            return (
              <Row key={index} className="pad18 noSidePad">
                <Col xs={10}>
                  <RadioButton
                    name="protectionOption"
                    id={'protectionRadio_' + (index + 1)}
                    value={protection.sfoSkuId}
                    containerClassName=" "
                    labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad width90"
                    checked={protection.sfoSkuId === selectedOption}
                    onChange={() => {
                      onProtectionChange(protection);
                    }}
                  >
                    <div className="fontSize_4">
                      <p tabIndex={index} className="bold fontSize_5">{protection.displayName}</p>
                      <p className="pad6 onlyTopPad" tabIndex={index} dangerouslySetInnerHTML={{ __html: `${protection.introText}` }} />
                    </div>
                  </RadioButton>
                </Col>
                <Col xs={2}>
                  <p tabIndex={index} className="bold">
                    {protection.hasEcpdDiscount && <span><span className="textDecLineThrough normal">${protection.wasPrice}</span>&nbsp;&nbsp;</span>}${`${protection.price} ${protection.priceTerm}`}
                  </p>
                </Col>
              </Row>
            );
          })}
          {protectionTypes.single.length > 2 && <a className="pad36 onlyLeftPad margin18 onlyTopMargin displayBlock fontSize_5 color_black textDecUnderline bold" onClick={onShowAllProtection} href="">
            {(showAllPlans === false) ? cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_ALL_PLANS_BTN_TXT : cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_LESS_PLANS_BTN_TXT}
          </a>}
          <div className="margin36 onlyLeftMargin pad24 noSidePad" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_PROTECTION_TMP_REFRESH_TEXT }} />
        </Col>
      </Row>
    </div>
  );
};

SingleDeviceProtection.propTypes = {
  fewPlans: PropTypes.array,
  cqContent: PropTypes.object,
  protectionTypes: PropTypes.object,
  deviceDetails: PropTypes.object,
  showAllPlans: PropTypes.bool,
  selectedOption: PropTypes.string,
  onShowAllProtection: PropTypes.func,
  onProtectionChange: PropTypes.func,
};

export default SingleDeviceProtection;
