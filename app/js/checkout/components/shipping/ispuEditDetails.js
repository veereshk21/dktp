import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import StoreDetails from './storeDetails';
import { EDIT_STATE } from '../../constants';
import * as validation from '../../../common/validation';
import MSelect from '../../../common/Select/index';
import RadioButton from '../../../common/RadioButton/index';
import { renderTextField } from '../../../common/TextField/';
import AsyncComponent from '../../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../../common/Modal'));
const InStorePickUp = AsyncComponent(() => import('../../containers/ispu'));

const validate = (values, props) => {
  const errors = {};
  const emailAddress = values.get('email');
  const telephoneNumber = values.get('phoneNumber');

  if (!emailAddress) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidEmail(emailAddress)) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }
  return errors;
};

class ISPUDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ispuModalVisible: false,
    };
  }
  onCancel = () => this.props.updateEditState(EDIT_STATE.SHIPPING, false);

  updateISPU = (data) => {
    const { ispudetailsInfo } = this.props;

    const param = {
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
      activeSMSCapableMtnList: data.get('phoneNumber'),
      shippingAddressType: 'pickUpStore',
      orderId: this.props.orderId,
      storeId: ispudetailsInfo.storeId,
      standaloneAccessories: this.props.standaloneAccessories,
      longitude: ispudetailsInfo.longtitude.toString(),
      latitude: ispudetailsInfo.latitdude.toString(),
    };
    this.props.submitISPU(param);
  };

  showIspuModal = () => {
    this.setState({ ispuModalVisible: true });
    this.props.asyncFetch();
  }

  closeIspuModal = () => {
    this.setState({ ispuModalVisible: false });
  }
  ispuSuccessful = () => {
    this.setState({ ispuModalVisible: false });
  }

  render() {
    const { cqContent, activeSMSCapableMtnList, ispudetailsInfo } = this.props;
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
        <div className="margin18 onlyBottomMargin">
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
        <Row className="border_grayThree onlyBottomBorder pad12 onlyBottomPad">
          <Col
            xs={6}
            className="border_grayThree onlyRightBorder"
            style={{ paddingRight: 18, wordWrap: 'break-word' }}
          >
            <StoreDetails
              cqContent={cqContent}
              edit={this.props.editState[EDIT_STATE.SHIPPING]}
              updateEditState={this.props.updateEditState}
              ispudetailsInfo={ispudetailsInfo}
              showIspuModal={this.showIspuModal}
            />
          </Col>
          <Col
            xs={6}
            style={{ paddingLeft: 18 }}
          >
            <div>
              <Field
                component={renderTextField}
                id="email"
                name="email"
                label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_EMAIL_TEXT}
                type="text"
                required
              />
            </div>
            <div className="margin54 onlyTopMargin">
              <MSelect
                name="phoneNumber"
                id="phoneNumber"
                label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PHONE_NUMBER_TEXT}
                borderStyle
              >
                {
                  activeSMSCapableMtnList.map((number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      {validation.normalizePhoneNumber(number)}
                    </option>
                  ))
                }
              </MSelect>
            </div>
          </Col>
        </Row>
        <div className="width100 margin24 onlyTopMargin clearfix">
          <button
            className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
            onClick={this.onCancel}
          >
            {cqContent.label.DT_OD_CHECKOUT_PAYMENT_CANCEL}
          </button>
          <button
            className="primary button large"
            type="submit"
            disabled={!this.props.valid || this.props.submitting}
            onClick={
              this.props.handleSubmit((data) => {
                this.updateISPU(data);
              })
            }
          >
            {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_BUTTON_TEXT}
          </button>

        </div>
      </div>
    );
  }
}

ISPUDetails.propTypes = {
  cqContent: PropTypes.object,
  updateEditState: PropTypes.func,
  ispudetailsInfo: PropTypes.object,
  editState: PropTypes.object,
  contactInfo: PropTypes.object, // eslint-disable-line
  activeSMSCapableMtnList: PropTypes.array,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  orderId: PropTypes.string,
  standaloneAccessories: PropTypes.bool,
  submitISPU: PropTypes.func,
  asyncFetch: PropTypes.func,
};

export default reduxForm({
  form: 'ispuContactInfo',
  destroyOnUnmount: false,
  validate,
})(ISPUDetails);

