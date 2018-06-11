import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import Checkbox from '../../../common/Checkbox/index';
import * as validation from '../../../common/validation';
import ToolTip from '../../../common/ToolTip/index';


const validate = (values, props) => {
  const errors = {};

  const firstName = values.get('firstNameServAddress');
  const lastName = values.get('lastNameServAddress');
  const address = values.get('address1ServAddress');
  const address2 = values.get('address2ServAddress');
  const state = values.get('stateServAddress');
  const city = values.get('cityServAddress');
  const zipCode = values.get('zipcodeServAddress');
  const telephoneNumber = values.get('phoneNumberServAddress');


  // Validation for different Service Address
  if (!firstName) {
    errors.firstNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(firstName)) {
    errors.firstNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(lastName)) {
    errors.lastNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!address) {
    errors.address1ServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidAddress(address)) {
    errors.address1ServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_SERVICE_ADDRESS_PRIMARY_ERROR;
  }
  if (address2 && !validation.isValidAddress(address2)) {
    errors.address2ServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_SERVICE_ADDRESS_SECONDARY_ERROR;
  }
  if (!city) {
    errors.cityServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCity(city)) {
    errors.cityServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_CITY_ERROR;
  }
  if (!state) {
    errors.stateServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(state)) {
    errors.stateServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!zipCode) {
    errors.zipcodeServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(zipCode)) {
    errors.zipcodeServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumberServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(telephoneNumber)) {
    errors.phoneNumberServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }

  return errors;
};
class ServiceAddressEdit extends Component {
  componentWillReceiveProps = (newProps) => {
    if (!this.props.dirty && newProps.dirty) {
      this.props.setIsAddressUpdated(true);
    }
  }

  onClickSameAsShipping = () => {
    const {
      change, addressInfo, sameAsShippingAddress,
    } = this.props;
    if (!sameAsShippingAddress) {
      change('firstNameServAddress', addressInfo.firstName);
      change('lastNameServAddress', addressInfo.lastName);
      change('address1ServAddress', addressInfo.address1);
      change('address2ServAddress', addressInfo.address2);
      change('cityServAddress', addressInfo.city);
      change('stateServAddress', addressInfo.state);
      change('zipcodeServAddress', addressInfo.zipcode);
      change('phoneNumber', addressInfo.phoneNumber);
    }
  };

  render() {
    const {
      cqContent, sameAsShippingAddress, states,
    } = this.props;


    return (
      <div>
        <div>
          <h3 className="displayInlineBlock">
            {cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS}
          </h3>
          <ToolTip
            className="margin3 onlyLeftMargin displayInlineBlock"
            ariaLabel="Billing address information tooltip"
            text={cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS_TOOLTIP}
            noRenderHTML
          />
        </div>
        <div>
          <Checkbox
            className="checkbox"
            name="sameAsShippingAddress"
            id="sameAsShippingAddress"
            component="input"
            type="checkbox"
            checkboxClass="displayInlineBlock pad6 noLeftPad"
            labelClass="displayInlineBlock verticalCenter leftAlign pad6 checkboxLabel"
            onClick={this.onClickSameAsShipping}
          >
            <p id="sameAsShippingAddressLabel" > {cqContent.label.DT_OD_CHECKOUT_DEVICES_SERVICE_ADDRESS_SAME_AS_SHIPPING} </p>
          </Checkbox>
        </div>
        {!sameAsShippingAddress &&
          <Row className="margin12 noSideMargin">
            <Col xs={12} className="margin6 noSideMargin">
              <Field
                component={renderTextField}
                id="firstNameServAddress"
                name="firstNameServAddress"
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_FIRST_NAME_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={12} className="margin6 noSideMargin">
              <Field
                component={renderTextField}
                id="lastNameServAddress"
                name="lastNameServAddress"
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_LAST_NAME_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={12} className="margin6 noSideMargin">
              <Field
                component={renderTextField}
                id="address1ServAddress"
                name="address1ServAddress"
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_SERVICE_ADDRESS_PRIMARY_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={12} className="margin6 noSideMargin">
              <Field
                component={renderTextField}
                id="address2ServAddress"
                name="address2ServAddress"
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_SERVICE_ADDRESS_SECONDARY_TEXT}
                type="text"
              />
            </Col>
            <Col xs={12} className="margin6 noSideMargin">
              <Field
                component={renderTextField}
                id="zipcodeServAddress"
                name="zipcodeServAddress"
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_ZIPCODE_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={6} className="margin6 noSideMargin">
              <Field
                component={renderTextField}
                id="cityServAddress"
                name="cityServAddress"
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_CITY_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={6} className="margin6 noSideMargin clearfix">
              <MSelect
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_STATE_TEXT}
                name="stateServAddress"
                aria-label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_STATE_TEXT}
                id="stateServAddress"
                borderStyle
                required
              >
                <option disabled value="" />
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </MSelect>
            </Col>
            <Col xs={12} className="margin6 noSideMargin">
              <Field
                component={renderTextField}
                id="phoneNumberServAddress"
                name="phoneNumberServAddress"
                label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_PHONE_NUMBER_TEXT}
                type="text"
                maxLength="10"
                required
              />
            </Col>
          </Row>
        }
      </div>
    );
  }
}
ServiceAddressEdit.propTypes = {
  cqContent: PropTypes.object,
  sameAsShippingAddress: PropTypes.bool,
  states: PropTypes.array,
  change: PropTypes.func,
  addressInfo: PropTypes.object,
  setIsAddressUpdated: PropTypes.func,
  dirty: PropTypes.bool,
};

// export default ServiceAddressEdit;
export default reduxForm({
  form: 'serviceAddress',
  validate,
})(ServiceAddressEdit);
