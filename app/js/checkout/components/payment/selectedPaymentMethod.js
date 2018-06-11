import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { normalizePhoneNumber } from '../../../common/validation';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';

class SelectedPaymentMethod extends Component {
  componentWillMount() {

  }
  onClickEdit = () => {
    this.props.updateEditState(EDIT_STATE.PAYMENT, true);
  }
  renderPaymentMethod = () => {
    const {
      selectedPaymentMode, selectedCard, cqContent, billingInfo,
    } = this.props;
    let paymentMethod = null;
    if (selectedPaymentMode === 'newcard' || selectedPaymentMode === 'savedcard') {
      paymentMethod = (
        <p>{selectedCard.creditCardNumber && selectedCard.creditCardNumber.length > 5 ? selectedCard.creditCardNumber : `XXXX-XXXX-XXXX-${selectedCard.creditCardNumber}`}</p>
      );
    } else if (selectedPaymentMode === 'bta') {
      paymentMethod = (
        <div>
          <p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA}</p>
          <p className="legal margin18 onlyRightMargin">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA_DESCRIPTION}</p>
        </div>
      );
    } else if (selectedPaymentMode === 'paypal') {
      paymentMethod = (
        <div>
          <p>PayPal</p>
          <p>{billingInfo.paypalEmailAddress}</p>
        </div>
      );
    } else if (selectedPaymentMode === 'masterpass') {
      paymentMethod = (
        <div>
          <p>Masterpass</p>
          <p>{billingInfo.masterpassResponseInfo && billingInfo.masterpassResponseInfo.emailAddress}</p>
        </div>
      );
    } else if (selectedPaymentMode === 'applepay') {
      paymentMethod = (
        <div>
          <p>Apple Pay</p>
          <p>{billingInfo.applePayResponseInfo && billingInfo.applePayResponseInfo.emailAddress}</p>
        </div>
      );
    }
    return paymentMethod;
  }
  render() {
    const { cqContent, billingAddress } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <div className="margin12 onlyBottomMargin">
            <h3 className="verticalBottom displayInlineBlock margin10 onlyRightMargin">
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_COMPLETED_SECTION_TITLE}
            </h3>

            <EditButton onClick={this.onClickEdit} />
          </div>

          <div style={{ wordWrap: 'break-word' }}>{this.renderPaymentMethod()}</div>

        </Col>
        <Col xs={4} lg={5} lgOffset={1} className="billingAddressEdit">
          {/* Billing Address */}

          <h3 className="margin12 onlyBottomMargin">
            {cqContent.label.DT_OD_CHECKOUT_PAYMENT_BILLING_ADDRESS_SECTION_TITLE}
          </h3>

          {billingAddress.businessName &&
            <p>{billingAddress.businessName}</p>
          }
          {(billingAddress.firstName || billingAddress.lastName) &&
            <p> {billingAddress.firstName} {billingAddress.lastName}</p>
          }
          <p>{billingAddress.address1}</p>
          {billingAddress.address2 &&
            <p>{billingAddress.address2}</p>
          }
          <p>{billingAddress.city}, {billingAddress.state}, {billingAddress.zipcode}</p>
          <p>{normalizePhoneNumber(billingAddress.phoneNumber)}</p>
          <p> {billingAddress.email}</p>


        </Col>
      </Row>
    );
  }
}

SelectedPaymentMethod.propTypes = {
  cqContent: PropTypes.object,
  billingAddress: PropTypes.object,
  selectedPaymentMode: PropTypes.string,
  selectedCard: PropTypes.object,
  updateEditState: PropTypes.func,
  billingInfo: PropTypes.object,
};
export default SelectedPaymentMethod;
