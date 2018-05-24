import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';

const TradeInPromoDetails = ({ tradeInPromoDetails, cqContent, tradeInUrl, removeTradeInDeviceFromCart }) => {
  const removeTradeIn = (appraiseTradeInDeviceWithOutDeviceId, existingAppraisedReferenceId, flow) => {
    // eslint-disable-next-line no-console
    const params = {
      existingAppraisedReferenceId,
      appraiseTradeInDeviceWithOutDeviceId,
      flow,
    };
    removeTradeInDeviceFromCart({ ...params });
  };
  const goToTradeIn = () => {
    window.location = tradeInUrl;
  };

  return (
    <div className="background_gray_one pad20 fontSize_4">
      <Row bottom="xs">
        <Col xs={4}>
          <h2 className="fontSize_10" >{cqContent.label.DT_OD_CART_TRADE_IN_TITLE}</h2>
        </Col>
        <Col xs={8}>
          <div className="tradeInPrompt_icon floatRight fontSize_13" />
        </Col>
      </Row>
      <div className="margin6 onlyTopMargin">
        {
          tradeInPromoDetails.tradeInDevices.map((device, index) => (
            <div>
              { index > 0 && <hr style={{ borderColor: '#000000' }} />}
              <Row
                className="pad24 noSidePad"
                middle="xs"
              >
                <Col xs={2}>
                  <img
                    className="width70"
                    alt="Traded in device"
                    src={device.modelImage}
                  />
                </Col>
                <Col xs={6}>
                  <Row className="pad6 onlyBottomPad">
                    <Col
                      xs={5}
                      className="bold"
                    >
                      {cqContent.label.DT_OD_CART_TRADE_IN_DESCRIPTION_TEXT}
                    </Col>
                    <Col
                      xs={5}
                      className="bold"
                    >
                      {cqContent.label.DT_OD_CART_TRADE_IN_DEVICE_ID_TEXT}
                    </Col>
                  </Row>
                  <Row className="pad24 onlyBottomPad">
                    <Col xs={5}>
                      {device.displayName}
                    </Col>
                    <Col xs={5}>
                      {device.deviceId}
                    </Col>
                  </Row>
                  <Row className="pad6 onlyBottomPad">
                    <Col
                      xs={5}
                      className="bold"
                    >
                      {cqContent.label.DT_OD_CART_TRADE_IN_MARKET_VALUE_TEXT}
                    </Col>
                    <Col
                      xs={5}
                      className="bold"
                    >
                      {cqContent.label.DT_OD_CART_TRADE_IN_PROMOTIONAL_VALUE_TEXT}
                    </Col>
                  </Row>
                  <Row className="pad12 onlyBottomPad">
                    <Col xs={5}>
                      ${device.originalAppraisalPrice}
                    </Col>
                    <Col xs={5}>
                      {`${parseFloat(device.originalAppraisalPrice) > 0 && parseFloat(device.tradeInCredit) > parseFloat(device.originalAppraisalPrice) ? '$' + device.tradeInCredit : '--'}`}
                    </Col>
                  </Row>
                </Col>
                <Col xs={4}>
                  <Row className="pad6 onlyBottomPad">
                    <Col
                      xs={12}
                      className="bold"
                    >
                      {cqContent.label.DT_OD_CART_TRADE_IN_APPRAISAL_VALUE_TEXT}
                    </Col>
                  </Row>
                  <Row className="pad24 onlyBottomPad">
                    <Col
                      xs={12}
                      className="bold fontSize_8"
                    >
                      ${device.tradeInCredit}
                    </Col>
                  </Row>
                  <Row className="pad12 onlyBottomPad">
                    <Col xs={12}>
                      <a
                        role="button"
                        onClick={() => {
                          removeTradeIn(device.appraiseTradeInDeviceWithOutDeviceId, device.existingAppraisedReferenceId, device.flow);
                        }}
                      >
                        {cqContent.label.DT_OD_CART_TRADE_IN_DEVICE_REMOVE_TEXT}
                      </a>
                    </Col>
                  </Row>
                  <Row className="pad6 onlyBottomPad">
                    <Col xs={12} style={{ height: '17px' }} />
                  </Row>
                </Col>
              </Row>
            </div>
          ))
        }
      </div>
      <Row className="pad24 onlyBottomPad">
        <Col
          xsOffset={8}
          xs={4}
        >
          <a
            role="button"
            onClick={() => { goToTradeIn(); }}
          >
            {cqContent.label.DT_OD_CART_TRADE_IN_MORE_DEVICE_CTA_TEXT}
          </a>
        </Col>
      </Row>
      <hr style={{ borderColor: '#000000' }} />
      <p
        className="margin20 onlyTopMargin fontSize_1 color_333"
        dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CART_TRADE_IN_TERMS_TEXT }}
      />
    </div>
  );
};
TradeInPromoDetails.propTypes = {
  tradeInPromoDetails: PropTypes.object,
  cqContent: PropTypes.object,
  tradeInUrl: PropTypes.string,
  removeTradeInDeviceFromCart: PropTypes.func,
};
export default TradeInPromoDetails;
