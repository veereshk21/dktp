import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form/immutable';
import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import Checkbox from '../../../common/Checkbox/index';

const ShippingAddressForm = (props) => {
  const { cqContent, formEnabled, authEnabled, isBuisnessAddress, states, change, billingAddress } = props;

  const onCheckBoxClick = () => {
    if (!props.formValues.sameAsBilling) {
      change('address1', billingAddress.address1);
      change('address2', billingAddress.address2);
      change('businessName', billingAddress.businessName);
      change('city', billingAddress.city);
      change('companyName', billingAddress.companyName);
      change('state', billingAddress.state);
      change('zipcode', billingAddress.zipcode);
    }
  };
  const onFormClick = (e) => {
    if (authEnabled && !formEnabled) {
      e.preventDefault();
      props.fetchSMSDevices();
    } else if (!authEnabled) {
      props.notifySecurePinIneligible();
    }
  };
  return (
    <form // eslint-disable-line
      id="field"
      className="margin0"
    >
      <div className="clearfix">
        <Row className="border_grayThree onlyBottomBorder pad12 onlyBottomPad">
          <Col xs={6} className="border_grayThree onlyRightBorder" style={{ paddingRight: 18 }}>
            <div className="margin12 onlyBottomMargin">
              <h3>{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE} </h3>
            </div>
            <Row>
              <Col xs={12} onClick={(e) => { onFormClick(e); }}>
                <Checkbox
                  className="checkbox"
                  name="sameAsBilling"
                  id="sameAsBilling"
                  component="input"
                  type="checkbox"
                  checkboxClass="displayInlineBlock pad6 noLeftPad"
                  labelClass="displayInlineBlock verticalCenter leftAlign pad6"
                  aria-labelledby="sameAsBillingLabel"
                  tabIndex="-1"
                  aria-hidden
                  onClick={onCheckBoxClick}
                >
                  <p id="sameAsBillingLabel" > {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SAME_BILLING} </p>
                </Checkbox>
              </Col>
            </Row>
            <Row className="margin12 onlyBottomMargin">
              <Col xs={12} onClick={(e) => { onFormClick(e); }}>
                <div>
                  <MSelect
                    label={<span className="is-visuallyHidden">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_WHERE_TO_SHIP}</span>}
                    name="shipToType"
                    aria-label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_STATE_TEXT}
                    id="shipToType"
                    borderStyle
                    disabled={!formEnabled || props.formValues.sameAsBilling}
                  >
                    <option value="residence">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIP_TO_RESIDENCE}</option>
                    <option value="business">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIP_TO_BILLING}</option>

                  </MSelect>
                </div>
              </Col>
            </Row>
            {isBuisnessAddress &&
              <Row className="margin12 noSideMargin">
                <Col xs={12} onClick={(e) => { onFormClick(e); }}>
                  <Field
                    component={renderTextField}
                    id="businessName"
                    name="businessName"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_COMPANY_NAME_TEXT}
                    type="text"
                    required={isBuisnessAddress}
                    disabled={!formEnabled || props.formValues.sameAsBilling}
                  />
                </Col>
              </Row>
            }
            <Row className="margin12 noSideMargin">
              <Col xs={6}>
                <Field
                  component={renderTextField}
                  id="firstName"
                  name="firstName"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_FIRST_NAME_TEXT}
                  type="text"
                  required
                />
              </Col>
              <Col xs={6}>
                <Field
                  component={renderTextField}
                  id="lastName"
                  name="lastName"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_LAST_NAME_TEXT}
                  type="text"
                  required
                />
              </Col>
            </Row>
            <Row className="margin12 noSideMargin">
              <Col xs={12} onClick={(e) => { onFormClick(e); }}>
                <Field
                  component={renderTextField}
                  id="address1"
                  name="address1"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIPPING_ADDRESS_PRIMARY_TEXT}
                  type="text"
                  required
                  disabled={!formEnabled || props.formValues.sameAsBilling}
                />
              </Col>
            </Row>
            <Row className="margin12 noSideMargin">
              <Col xs={12} onClick={(e) => { onFormClick(e); }}>
                <Field
                  component={renderTextField}
                  id="address2"
                  name="address2"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIPPING_ADDRESS_SECONDARY_TEXT}
                  type="text"
                  disabled={!formEnabled || props.formValues.sameAsBilling}
                />
              </Col>
            </Row>
            <Row className="margin12 noSideMargin">
              <Col xs={12} onClick={(e) => { onFormClick(e); }}>
                <Field
                  component={renderTextField}
                  id="zipcode"
                  name="zipcode"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_ZIPCODE_TEXT}
                  type="text"
                  required
                  disabled={!formEnabled || props.formValues.sameAsBilling}
                />
              </Col>
            </Row>
            <Row className="margin12 noSideMargin">
              <Col xs={6} onClick={(e) => { onFormClick(e); }}>
                <Field
                  component={renderTextField}
                  id="city"
                  name="city"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_CITY_TEXT}
                  type="text"
                  required
                  disabled={!formEnabled || props.formValues.sameAsBilling}
                />
              </Col>

              <Col xs={6}>
                <div style={{ marginTop: 28 }}>
                  <MSelect
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_STATE_TEXT}
                    name="state"
                    aria-label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_STATE_TEXT}
                    id="state"
                    borderStyle
                    required
                    disabled={!formEnabled || props.formValues.sameAsBilling}
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </MSelect>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={6} style={{ paddingLeft: 18, marginTop: 64 }}>
            <Row>
              <Col xs={12}>
                <Field
                  component={renderTextField}
                  id="email"
                  name="email"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_EMAIL_TEXT}
                  type="text"
                  required
                />
              </Col>
            </Row>
            <Row className="margin12 noSideMargin">
              <Col xs={12}>
                <Field
                  component={renderTextField}
                  id="phoneNumber"
                  name="phoneNumber"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PHONE_NUMBER_TEXT}
                  type="text"
                  required
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </form>
  );
};

ShippingAddressForm.propTypes = {
  cqContent: PropTypes.object,
  formEnabled: PropTypes.bool,
  isBuisnessAddress: PropTypes.bool,
  states: PropTypes.array,
  authEnabled: PropTypes.bool,
  change: PropTypes.func,
  billingAddress: PropTypes.object,
  formValues: PropTypes.object,
};

export default ShippingAddressForm;
