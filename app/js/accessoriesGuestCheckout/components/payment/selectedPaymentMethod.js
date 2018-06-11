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

  render() {
    const { cqContent, billingAddress, selectedCard, billingInfo } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <div className="margin12 onlyBottomMargin">
            <p className="bold fontSize_5 verticalBottom displayInlineBlock">
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_COMPLETED_SECTION_TITLE}
            </p>

            <EditButton onClick={this.onClickEdit} />
          </div>
          {billingInfo.billingAddress &&
            <div style={{ wordWrap: 'break-word' }}>
              <div>
                <p>{billingInfo.billingAddress.firstName} {billingInfo.billingAddress.lastName}</p>
                <p><span className="textTransCapitalize">{selectedCard.creditCardType} </span>{selectedCard.creditCardNumber && ` Ending in (${selectedCard.creditCardNumber.slice(-4)})`}</p>
                <p>Expires {selectedCard.creditCardExpMonth}/{selectedCard.creditCardExpYear}</p>
              </div>
            </div>
          }

        </Col>
        <Col xs={6}>
          {/* Billing Address */}
          <div className="margin12 onlyBottomMargin">
            <p className="bold fontSize_5 verticalBottom displayInlineBlock">
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_BILLING_ADDRESS_SECTION_TITLE}
            </p>

            <EditButton onClick={this.onClickEdit} />
          </div>
          {billingInfo.billingAddress &&
            <div>
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
            </div>
          }

        </Col>
      </Row>
    );
  }
}

SelectedPaymentMethod.propTypes = {
  cqContent: PropTypes.object,
  billingAddress: PropTypes.object,
  selectedCard: PropTypes.object,
  updateEditState: PropTypes.func,
  billingInfo: PropTypes.object,
};
export default SelectedPaymentMethod;
