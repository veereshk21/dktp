import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

const SingleDeviceProtection = ({ fewPlans, cqContent, protectionTypes, deviceDetails, showAllPlans, selectedOption, onShowAllProtection, onProtectionChange }) => {
  const deviceName = deviceDetails ? (deviceDetails.brandName + ' ' + deviceDetails.displayName + ', ' + deviceDetails.capacity + ' in ' + deviceDetails.color) : '';
  const deviceUrl = deviceDetails ? deviceDetails.displayImageURL : '';
  const protectionArr = showAllPlans === true ? protectionTypes.single : fewPlans;
  return (
    <div>
      <div className="pad18 noSidePad">
        <h2 className="fontSize_7">
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
          {protectionArr.map((protection) => { // eslint-disable-line
            return (
              <Row key={protection.index} className="pad18 noSidePad">
                <Col xs={10}>
                  <input
                    tabIndex={protection.index}
                    id={'protectionRadio_' + protection.index}
                    className="radioCustom"
                    checked={
                      protection.sfoSkuId === selectedOption
                    }
                    type="radio"
                    name="protectionOption"
                    value={protection.sfoSkuId}
                    role="radiogroup"
                    onChange={() => {
                      onProtectionChange(protection);
                    }}
                  />
                  <label htmlFor={'protectionRadio_' + protection.index} className="radioCustom_label m-priceLabel width100">
                    <div className="priceLabel floatNone displayInlineBlock margin12 onlyLeftMargin verticalAlignMiddle">
                      <p tabIndex={protection.index} className="bold fontSize_5">{protection.displayName}</p>
                      <p className="pad6 onlyTopPad" tabIndex={protection.index} dangerouslySetInnerHTML={{ __html: `${protection.introText}` }} />
                    </div>
                  </label>
                </Col>
                <Col xs={2}>
                  <p tabIndex={protection.index} className="bold textRight">
                    {protection.hasEcpdDiscount && <span><span className="textDecLineThrough normal">${protection.wasPrice}</span>&nbsp;&nbsp;</span>}${`${protection.price} ${protection.priceTerm}`}
                  </p>
                </Col>
              </Row>
            );
          })}
          {protectionTypes.single.length > 2 && <a className="margin18 onlyTopMargin displayBlock fontSize_5 color_black textDecUnderline bold" onClick={onShowAllProtection} href="">
            {(showAllPlans === false) ? cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_ALL_PLANS_BTN_TXT : cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_LESS_PLANS_BTN_TXT}
          </a>}
          <div className="pad24 noSidePad" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_PROTECTION_TMP_REFRESH_TEXT }} />
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
