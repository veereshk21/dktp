import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const borderNone = {
  noTopBorder: { borderTop: 'none' },
  noRightBorder: { borderRight: 'none' },
  noBottomBorder: { borderBottom: 'none' },
  noLeftBorder: { borderLeft: 'none' },
  defaultRightBorder: { borderRight: 'auto' },
};
const others = {
  minHeight: '120px',
};

/* eslint-disable arrow-body-style */
const infoGridCenter = ({ cqKeys, shipAddress, billAddress, selectedShippingType, billingInfo, checkoutStates, splitShipment }) => {
  const showPaymentSection = checkoutStates && checkoutStates.showPaymentSection;
  const showShippingSection = checkoutStates && (checkoutStates.showShippingAddress && checkoutStates.showDeliveryMethod);
  return (
    <section className="margin40 onlyTopMargin pad8">
      <Row md={12} lg={12}>
        {showShippingSection ?
          <Col md={showPaymentSection ? 6 : 12} lg={showPaymentSection ? 6 : 12} className="gridBorder" style={showPaymentSection ? { ...borderNone.noRightBorder } : { ...borderNone.defaultRightBorder }}>
            <Row md={12} lg={12} className="pad30 gridColorBG">
              <Col md={12} lg={12} >
                <p className="noSidePad textAlignCenter fontSize_9 bold"> {cqKeys.label.DT_OD_CONFIRMATION_SHIPPING_INFOMATION} </p>
              </Col>
            </Row>
            <Row md={12} lg={12} className="">
              <Col md={6} lg={6}>
                <Row md={12} lg={12} className="pad24 gridBorder gridColorBG" style={{ ...borderNone.noLeftBorder, ...borderNone.noBottomBorder, ...borderNone.noRightBorder }}>
                  <Col md={12} lg={12} >
                    <p className="textAlignCenter fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_SHIPPING_TO} </p>
                  </Col>
                </Row>
                <Row md={12} lg={12} className="pad24 gridBorder textAlignCenter" style={{ ...borderNone.noLeftBorder, ...borderNone.noBottomBorder, ...borderNone.noRightBorder }}>
                  <Col md={12} lg={12} >
                    <p className="fontSize_2"> {shipAddress.addressInfo.lastName}, {shipAddress.addressInfo.firstName} </p>
                    <p className="fontSize_2"> {shipAddress.addressInfo.address1} </p>
                    {shipAddress.addressInfo.phoneNumber && <p className="fontSize_2"> {shipAddress.addressInfo.phoneNumber} </p>}
                  </Col>
                </Row>
              </Col>
              <Col md={6} lg={6}>
                <Row md={12} lg={12} className="pad24 gridBorder gridColorBG" style={{ ...borderNone.noRightBorder, ...borderNone.noBottomBorder }}>
                  <Col md={12} lg={12} >
                    <p className="textAlignCenter fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_SHIPPING_TYPE} </p>
                  </Col>
                </Row>
                <Row md={12} lg={12} className="pad24 gridBorder textAlignCenter" style={{ ...borderNone.noBottomBorder, ...borderNone.noRightBorder, ...others }}>
                  <Col md={12} lg={12} >
                    <p className="fontSize_2"> {splitShipment ? shipAddress.poboMessage : selectedShippingType.shippingTypeName} </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col> : ''}

        {showPaymentSection ?
          <Col md={showShippingSection ? 6 : 12} lg={showShippingSection ? 6 : 12} className="gridBorder">
            <Row md={12} lg={12} className="pad30 gridColorBG">
              <Col md={12} lg={12} >
                <p className="textAlignCenter fontSize_9 bold"> {cqKeys.label.DT_OD_CONFIRMATION_BILLING_INFOMATION}  </p>
              </Col>
            </Row>
            <Row md={12} lg={12}>
              <Col md={6} lg={6}>
                <Row md={12} lg={12} className="pad24 gridBorder gridColorBG" style={{ ...borderNone.noLeftBorder, ...borderNone.noBottomBorder, ...borderNone.noRightBorder }}>
                  <Col md={12} lg={12} >
                    <p className="textAlignCenter fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_BILL_TO} </p>
                  </Col>
                </Row>
                <Row md={12} lg={12} className="pad24 gridBorder textAlignCenter" style={{ ...borderNone.noLeftBorder, ...borderNone.noBottomBorder, ...borderNone.noRightBorder }}>
                  <Col md={12} lg={12}>
                    {billAddress.lastName && <p className="fontSize_2"> {billAddress.lastName}, {billAddress.firstName} </p>}
                    <p className="fontSize_2"> {billAddress.address1} </p>
                    {billAddress.phoneNumber && <p className="fontSize_2"> {billAddress.phoneNumber} </p>}
                  </Col>
                </Row>
              </Col>
              <Col md={6} lg={6}>
                <Row md={12} lg={12} className="pad24 gridBorder gridColorBG" style={{ ...borderNone.noBottomBorder, ...borderNone.noRightBorder }}>
                  <Col md={12} lg={12} >
                    <p className="textAlignCenter fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_PAYMENT_TYPE} </p>
                  </Col>
                </Row>
                <Row md={12} lg={12} className="pad24 gridBorder textAlignCenter" style={{ ...borderNone.noBottomBorder, ...borderNone.noRightBorder, ...others }}>
                  <Col md={12} lg={12}>
                    {billingInfo.selectedPaymentMode === 'ApplePay' &&
                      <p className="fontSize_2">
                        <span className="block">{billingInfo.selectedPaymentMode}</span>
                        <span className="block">{billingInfo.applePayResponseInfo.emailAddress}</span>
                      </p>
                    }
                    {billingInfo.selectedPaymentMode === 'payPal' &&
                      <p className="fontSize_2">
                        <span className="block">Paypal</span>
                        <span className="block">{billingInfo.paypalEmailAddress}</span>
                      </p>
                    }
                    {billingInfo.selectedPaymentMode === 'masterpass' &&
                      <div className="fontSize_2 textAlignRight">
                        <img alt="Masterpass" src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg" />
                        <span className="block">{billingInfo.masterpassResponseInfo.cardType} (****{billingInfo.masterpassResponseInfo.lastDigits})</span>
                        <span className="block">{billingInfo.masterpassResponseInfo.emailAddress}</span>
                      </div>
                    }
                    {billingInfo.selectedPaymentMode === 'BTA' &&
                      <p className="fontSize_2">
                        <span className="block">Bill to Account</span>
                        <span className="block">{billingInfo.selectedPaymentMode === 'BTA' && billingInfo.billToAccountNumber}</span>
                      </p>
                    }
                    {(billingInfo.selectedPaymentMode === 'newCard' || billingInfo.selectedPaymentMode === 'savedCard') &&
                      <p className="fontSize_2">
                        <span className="block textTransUppercase">{billingInfo.creditCardInfo.creditCardType}</span>
                        <span className="block">{billingInfo.creditCardInfo.creditCardNumber}</span>
                      </p>
                    }
                    {billingInfo.giftCardList.map((giftCard, key) => {
                      return (
                        <p className="margin10 onlyTopMargin fontSize_2">
                          <span className="block">Gift Card {key + 1} Applied to Purchase</span>
                          <span className="block">{giftCard.maskedGiftCardNumber}</span>
                          <span className="block">${giftCard.amountToApply}</span>
                        </p>
                      );
                    })}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col> : ''}
      </Row>
    </section>
  );
};

infoGridCenter.propTypes = {
  cqKeys: PropTypes.object,
  shipAddress: PropTypes.object,
  billAddress: PropTypes.object,
  billingInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  checkoutStates: PropTypes.object,
  splitShipment: PropTypes.bool,
};
export default infoGridCenter;
