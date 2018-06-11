import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import * as validation from '../../../common/validation';
import MSelect from '../../../common/Select/index';
import { renderTextField } from '../../../common/TextField/';
import RadioButton from '../../../common/RadioButton/index';

const validate = (values, props) => {
  const errors = {};
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');
  const billingAddress = values.get('address1');
  const billingAddress2 = values.get('address2');
  const state = values.get('state');
  const city = values.get('city');
  const zipCode = values.get('zipcode');
  const telephoneNumber = values.get('phoneNumber');
  const billingSameAsShipping = values.get('sameAsShipping');


  if (billingSameAsShipping !== 'true') {
    if (!firstName) {
      errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidNameWithSpace(firstName)) {
      errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_FIRST_NAME_ERROR;
    }
    if (!lastName) {
      errors.lastName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidNameWithSpace(lastName)) {
      errors.lastName = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_LAST_NAME_ERROR;
    }
    if (!billingAddress) {
      errors.address1 = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidAddress(billingAddress)) {
      errors.address1 = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_BILLING_ADDRESS_PRIMARY_ERROR;
    }
    if (billingAddress2 && !validation.isValidAddress(billingAddress2)) {
      errors.address2 = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_BILLING_ADDRESS_SECONDARY_ERROR;
    }
    if (!city) {
      errors.city = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidCity(city)) {
      errors.city = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_CITY_ERROR;
    }
    if (!state) {
      errors.state = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidName(state)) {
      errors.state = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_STATE_ERROR;
    }
    if (!zipCode) {
      errors.zipcode = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidZipCode(zipCode)) {
      errors.zipcode = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_ZIPCODE_ERROR;
    }

    if (!telephoneNumber) {
      errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidPhoneNumber(telephoneNumber)) {
      errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_BILLING_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
    }
  }
  return errors;
};

class BillingAddressEdit extends Component {
  componentDidUpdate(prevProps) {
    if (typeof prevProps.sameAsShipping !== 'undefined' && prevProps.sameAsShipping !== this.props.sameAsShipping && this.props.sameAsShipping) {
      this.props.initialize({ ...this.props.shippingAddress, sameAsShipping: 'true' });
    }
  }

  render() {
    const {
      cqContent, states, shippingAddress,
    } = this.props;
    return (
      <div>
        <form // eslint-disable-line
          id="field"
          className="margin0"
        >
          {/* Radio Buttons */}
          <div className="margin36 onlyTopMargin">
            <RadioButton
              name="sameAsShipping"
              id="billingSameAsShippingTrue"
              value="true"
              containerClassName="pad6 noSidePad"
              labelClassName="verticalCenter pad12 onlyLeftPad radioLabel"
            >
              <p>{cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_SAME_AS_SHIPPING}</p>
            </RadioButton>
            {this.props.sameAsShipping &&
              <div className="margin12 noSideMargin pad36 onlyLeftPad" >
                <p className="bold">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                <p>{shippingAddress.address1}</p>
                {shippingAddress.address2 &&
                  <p>{shippingAddress.address2}</p>
                }
                <p>{shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zipcode}</p>
                <p>{shippingAddress.phoneNumber}</p>
                <p>{shippingAddress.email}</p>
              </div>}
            <RadioButton
              name="sameAsShipping"
              id="billingSameAsShippingFalse"
              value="false"
              containerClassName="pad6 noSidePad"
              labelClassName="verticalCenter pad12 onlyLeftPad radioLabel"
            >
              <p>{cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_DIFFERENT_THAN_SHIPPING}</p>
            </RadioButton>
          </div>

          {/* Billing Address */}
          {!this.props.sameAsShipping &&
            <Row className="margin24 onlyTopMargin">
              <Col xs={8}>
                <div className="margin12 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="firstNameBilling"
                    name="firstName"
                    label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_FIRST_NAME_TEXT}
                    type="text"
                    required
                  />
                </div>
                <div className="margin12 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="lastNameBilling"
                    name="lastName"
                    label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_LAST_NAME_TEXT}
                    type="text"
                    required
                  />
                </div>
                <div className="margin12 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="phoneNumberBilling"
                    name="phoneNumber"
                    label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_PHONE_NUMBER_TEXT}
                    type="text"
                    maxLength="10"
                    normalize={validation.allowOnlyNumbers}
                    required
                  />
                </div>

                <div className="margin12 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="address1Billing"
                    name="address1"
                    label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_BILLING_ADDRESS_PRIMARY_TEXT}
                    type="text"
                    required
                  />
                </div>
                <div className="margin12 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="address2Billing"
                    name="address2"
                    label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_BILLING_ADDRESS_SECONDARY_TEXT}
                    type="text"
                  />
                </div>
                <Row>
                  <Col xs={6}>
                    <Field
                      component={renderTextField}
                      id="cityBilling"
                      name="city"
                      label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_CITY_TEXT}
                      type="text"
                      required
                    />
                  </Col>
                  <Col xs={6}>
                    <div style={{ marginTop: 28 }}>
                      <MSelect
                        label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_STATE_TEXT}
                        name="state"
                        aria-label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_STATE_TEXT}
                        id="stateBilling"
                        borderStyle
                        required
                      >
                        {states.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </MSelect>
                    </div>
                  </Col>
                </Row>
                <div className="margin12 noSideMargin">
                  <Field
                    required
                    component={renderTextField}
                    id="zipcodeBilling"
                    name="zipcode"
                    label={cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_ZIPCODE_TEXT}
                    type="text"
                  />
                </div>
              </Col>
            </Row>
          }
        </form >
      </div >
    );
  }
}

BillingAddressEdit.propTypes = {
  cqContent: PropTypes.object,
  states: PropTypes.array,
  sameAsShipping: PropTypes.bool,
  shippingAddress: PropTypes.object,
  initialize: PropTypes.func,
};
export default reduxForm({
  form: 'billingAddress',
  validate,
})(BillingAddressEdit);

