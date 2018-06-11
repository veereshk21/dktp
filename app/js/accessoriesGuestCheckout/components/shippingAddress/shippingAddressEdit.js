import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import Button from '../../../common/Button/Button';
import { EDIT_STATE } from '../../constants';
import * as validation from '../../../common/validation';
import AsyncComponent from '../../../common/AsyncComponent';

const ShippingAddressForm = AsyncComponent(() => import('./shippingAddressForm'));

const validate = (values, props) => {
  const errors = {};
  const businessName = values.get('businessName');
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');
  const shippingAddress = values.get('address1');
  const shippingAddress2 = values.get('address2');
  const state = values.get('state');
  const city = values.get('city');
  const zipCode = values.get('zipcode');
  const emailAddress = values.get('email');
  const telephoneNumber = values.get('phoneNumber');

  if (props.formValues.shipToType === 'business') {
    if (!businessName) {
      errors.businessName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidNameWithSpace(businessName)) {
      errors.businessName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_COMPANY_NAME_ERROR;
    }
  }

  if (!firstName) {
    errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(firstName)) {
    errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(lastName)) {
    errors.lastName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!shippingAddress) {
    errors.address1 = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidAddress(shippingAddress)) {
    errors.address1 = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_SHIPPING_ADDRESS_PRIMARY_ERROR;
  }
  if (shippingAddress2 && !validation.isValidAddress(shippingAddress2)) {
    errors.address2 = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_SHIPPING_ADDRESS_SECONDARY_ERROR;
  }
  if (!city) {
    errors.city = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCity(city)) {
    errors.city = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_CITY_ERROR;
  }
  if (!state) {
    errors.state = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(state)) {
    errors.state = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!zipCode) {
    errors.zipcode = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(zipCode)) {
    errors.zipcode = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!emailAddress) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidEmail(emailAddress)) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(telephoneNumber)) {
    errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }
  return errors;
};

class ShippingAddressEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceDetails: [],
      orderID: '',
    };
  }

  onCancel = () => {
    this.props.updateEditState(EDIT_STATE.SHIPPING_ADDRESS, false);
  }

  submitShippingInfo = (data) => {
    const { cqContent } = this.props;
    this.props.updateShippingAddress({ ...data.toJS(), addressOnly: true }, cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_UPDATE_FAILURE_TEXT);
  }
  render() {
    const {
      cqContent, handleSubmit, valid, submitting, formValues, stepsCompleted,
    } = this.props;
    const isBuisnessAddress = formValues.shipToType === 'business';
    return (
      <div>
        <ShippingAddressForm
          {...this.props}
          isBuisnessAddress={isBuisnessAddress}
        />
        <div className="width100 margin24 onlyTopMargin clearfix">
          {stepsCompleted.shippingAddress &&
            <button
              className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
              onClick={this.onCancel}
            >
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_CANCEL}
            </button>
          }
          <Button
            className="primary button large"
            type="submit"
            disabled={!valid || submitting}
            onClick={
              handleSubmit((data) => {
                this.submitShippingInfo(data);
              })
            }
          >
            {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_BUTTON_TEXT}
          </Button>

        </div>
      </div >
    );
  }
}

ShippingAddressEdit.propTypes = {
  handleSubmit: PropTypes.func,
  cqContent: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  updateShippingAddress: PropTypes.func,
  formValues: PropTypes.object,
  updateEditState: PropTypes.func,
  stepsCompleted: PropTypes.object,
};
export default reduxForm({
  form: 'shippingAddress',
  validate,
})(ShippingAddressEdit);

