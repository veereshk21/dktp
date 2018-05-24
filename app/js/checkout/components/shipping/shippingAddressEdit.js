import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import RadioButton from '../../../common/RadioButton/index';
import Button from '../../../common/Button/Button';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import * as validation from '../../../common/validation';
import AsyncComponent from '../../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../../common/Modal'));
const InStorePickUp = AsyncComponent(() => import('../../containers/ispu'));
const ShippingAddressForm = AsyncComponent(() => import('./shippingAddressForm'));
const SecurePin = AsyncComponent(() => import('../securePin'));

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
    } else if (!validation.isValidName(businessName)) {
      errors.businessName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_COMPANY_NAME_ERROR;
    }
  }

  if (!firstName) {
    errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(firstName)) {
    errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(lastName)) {
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
      showSecurePin: false,
      deviceDetails: [],
      orderID: '',
      ispuModalVisible: false,
    };
  }
  componentDidMount = () => {
    if (this.props.shippingAddressChangeRequired) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_UPDATE_REQUIRED_ERROR, NOTIFICATIONS.SHIPPING);
      this.props.touch('phoneNumber');
      this.props.touch('email');
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.formValues.shippingAddressType !== this.props.formValues.shippingAddressType) {
      if (nextProps.formValues.shippingAddressType === 'ISPU') {
        if (nextProps.ispuChangeToShip) {
          this.props.changeForm('ispuContactInfo', 'shippingAddressType', 'ISPU');
        } else {
          this.showIspuModal();
        }
      } else {
        // SWITCHING FROM ISPU? NOT SURE WHAT GOES HERE
      }
    }
    if (nextProps.asyncCallStatus.data.smsDevicesFetched) {
      this.setState({
        showSecurePin: true,
        deviceDetails: nextProps.asyncCallStatus.data.output.deviceDetails,
        orderID: nextProps.asyncCallStatus.data.output.orderID,
      });
      this.props.invalidateAsyncFetch();
    }
  }

  onCancel = () => {
    this.props.updateEditState(EDIT_STATE.SHIPPING, false);
  }

  showIspuModal = () => {
    this.setState({ ispuModalVisible: true });
  }

  closeIspuModal = () => {
    this.setState({ ispuModalVisible: false });
    this.props.change('shippingAddressType', 'shipToMe');
  }
  ispuSuccessful = () => {
    this.setState({ ispuModalVisible: false });
  }

  closeSecurePinModal = () => {
    this.props.change('sameAsBilling', true);
    this.setState({ showSecurePin: false });
  }

  securePinSuccess = () => {
    this.props.change('sameAsBilling', false);
    this.setState({ showSecurePin: false });
  }

  notifySecurePinIneligible = () => {
    const { cqContent } = this.props;
    this.props.showErrorNotification(cqContent.error.DT_OD_CHECKOUT_ADDRESS_UPDATE_PROMPT_TEXT, NOTIFICATIONS.SHIPPING);
  }
  submitShippingInfo = (data) => {
    const { cqContent } = this.props;
    this.props.updateShippingAddress(data.toJS(), cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_UPDATE_FAILURE_TEXT);
  }
  render() {
    const {
      cqContent, handleSubmit, valid, submitting, formValues, shippingAddressRequired, shippingAddressChangeRequired, loginMTN,
    } = this.props;
    const isBuisnessAddress = formValues.shipToType === 'business';
    return (
      <div>
        {this.state.ispuModalVisible &&
          <Modal
            mounted
            closeFn={this.closeIspuModal}
            showCloseX
            underlayColor="rgba(0,0,0,0.8)"
          >
            <InStorePickUp
              closeModal={this.ispuSuccessful}
            />
          </Modal>
        }
        {this.state.showSecurePin &&
          <Modal
            mounted
            closeFn={this.closeSecurePinModal}
            underlayColor="rgba(0,0,0,0.8)"
          >
            <SecurePin
              deviceDetails={this.state.deviceDetails}
              orderID={this.state.orderID}
              closeModal={this.closeSecurePinModal}
              initialValues={{ smsDevice: loginMTN }}
              cqContent={cqContent}
              sendSMS={this.props.sendSMS}
              validateAuthCode={this.props.validateAuthCode}
              asyncCallStatus={this.props.asyncCallStatus}
              invalidateAsyncFetch={this.props.invalidateAsyncFetch}
              securePinSuccess={this.securePinSuccess}
            />
          </Modal>
        }
        {this.props.ispuEligibleFlag &&
          <div className="margin12 onlyBottomMargin">
            <div className="pad6 noSidePad">
              <RadioButton
                name="shippingAddressType"
                id="shippingAddressTypeShipToMe"
                value="shipToMe"
                containerClassName=" "
                labelClassName="verticalCenter pad12 onlyLeftPad"
              >
                <p>{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIP_TO_ADDRESS}</p>
              </RadioButton>
            </div>
            <div className="pad6 noSidePad">

              <RadioButton
                name="shippingAddressType"
                id="shippingAddressTypeISPU"
                value="ISPU"
                containerClassName=" "
                labelClassName="verticalCenter pad12 onlyLeftPad"
              >
                <p>{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PICK_UP_STORE}</p>
              </RadioButton>
            </div>
          </div>
        }
        <ShippingAddressForm
          {...this.props}
          isBuisnessAddress={isBuisnessAddress}
        />
        <div className="width100 margin24 onlyTopMargin clearfix">
          {!(shippingAddressRequired || shippingAddressChangeRequired) &&
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
  // formEnabled: PropTypes.bool,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  shippingAddressRequired: PropTypes.bool,
  shippingAddressChangeRequired: PropTypes.bool,
  showErrorNotification: PropTypes.func,
  updateShippingAddress: PropTypes.func,
  touch: PropTypes.func,
  formValues: PropTypes.object,
  updateEditState: PropTypes.func,
  loginMTN: PropTypes.string,
  sendSMS: PropTypes.func,
  validateAuthCode: PropTypes.func,
  asyncCallStatus: PropTypes.object,
  change: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  ispuEligibleFlag: PropTypes.bool,
  // ispuChangeToShip: PropTypes.bool,
  changeForm: PropTypes.func,
};
export default reduxForm({
  form: 'shippingAddress',
  validate,
})(ShippingAddressEdit);

