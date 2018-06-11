import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
// import CardSprite from '../../../images/credit-cards-sprite.png';

const ShippingBillingDetails = (props) => (
  <Col
    xs={12}
    style={{ paddingLeft: 0 }}
  >
    <Row
      className="background_gray_three border_CC margin24 onlyBottomMargin"
      style={{ padding: '18px' }}
    >
      <Col
        xs={3}
        className="lineheight18"
      >
        <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
          {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_SHIPPING_INFO}
        </h3>
        <p>{props.addressInfo.firstName} {props.addressInfo.lastName}</p>
        <p>{props.addressInfo.address1}</p>
        <p>{props.addressInfo.address2 && props.addressInfo.address2}</p>
        <p>{props.addressInfo.city}</p>
        <p>{props.addressInfo.state} {props.addressInfo.zipcode}</p>
        <p>{props.addressInfo.email}</p>
        <p>{props.addressInfo.phoneNumber}</p>
      </Col>
      <Col
        xs={3}
        className="lineheight18"
      >
        <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
          {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_SHIPPING_METHOD}
        </h3>
        <div>{props.selectedShippingType.shippingTypeName}</div>
        {props.selectedShippingType.price === 0 ?
          <span className="bold">{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_FREE_SHIPPING}</span> :
          <div>${props.selectedShippingType.price}</div>
        }
      </Col>
      <Col
        xs={3}
        className="lineheight18"
      >
        <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
          {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_BILLING_INFO}
        </h3>
        <p>{props.billingAddress.firstName} {props.billingAddress.lastName}</p>
        <p>{props.billingAddress.address1}</p>
        <p>{props.billingAddress.address2 && props.billingAddress.address2}</p>
        <p>{props.billingAddress.city}</p>
        <p>{props.billingAddress.state}&nbsp;{props.billingAddress.zipcode}</p>
        <p>{props.addressInfo.phoneNumber}</p>
      </Col>
      <Col
        xs={3}
        className="lineheight18"
      >
        <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
          {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CREDIT_CARD_DETAILS}
        </h3>
        {/* <div className={props.creditCardInfo.creditCardType} /> */}
        {/* <div
          className={`creditCards m_${props.creditCardInfo.creditCardType}`}
          style={{ background: `url(${CardSprite}) no-repeat` }}
        /> */}
        <p>{props.billingAddress.firstName} {props.billingAddress.lastName}</p>
        <p><span className="textTransCapitalize">{props.creditCardInfo.creditCardType}</span> {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CREDIT_CARD_ENDING} {props.lastFour}</p>
        <p>{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CREDIT_CARD_EXPIRES} {props.creditCardInfo.creditCardExpMonth}/{props.creditCardInfo.creditCardExpYear}</p>
      </Col>
    </Row>
  </Col>
);

ShippingBillingDetails.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  billingAddress: PropTypes.object,
  creditCardInfo: PropTypes.object,
  lastFour: PropTypes.string,
};

export default ShippingBillingDetails;
