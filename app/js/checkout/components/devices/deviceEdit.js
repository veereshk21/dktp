import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';

import { connect } from 'react-redux';
import Modal from '../../../common/Modal';
import * as validation from '../../../common/validation';
import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import RadioButton from '../../../common/RadioButton/index';
import Checkbox from '../../../common/Checkbox/index';
import ServiceAddressEdit from '../../containers/devices/serviceAddressEdit';
import { transformServiceAddress } from '../../helpers';
import { NOTIFICATIONS } from '../../constants';
import AsyncComponent from '../../../common/AsyncComponent';

const PortInNumber = AsyncComponent(() => import('../../containers/devices/portInNumber'));


const validate = (values, props) => {
  const errors = {};

  const numberZipCode = values.get('numberZipCode');
  const npnxx = values.get('npnxx');

  if (!npnxx) {
    errors.npnxx = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }
  // Validation for new Number
  if (npnxx === 'new') {
    if (!numberZipCode) {
      errors.numberZipCode = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidZipCode(numberZipCode)) {
      errors.numberZipCode = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_ZIPCODE_ERROR;
    }
  }

  return errors;
};

class DeviceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTransferModal: false,
      npaNxxMTNS: (props.npaNxxdetails && props.npaNxxdetails.mtns ? props.npaNxxdetails.mtns : []),
      editTransfer: false,
      isAddressUpdated: false,
    };
  }

  componentWillReceiveProps = (newProps) => {
    // const { mtns } = newProps.asyncCallStatus.data;
    const {
      newNPANXX, mtns,
    } = newProps.asyncCallStatus.data;

    const newForm = newProps.forms[newProps.form];
    const newNumberZipCode = newForm && newForm.values && newForm.values.numberZipCode;

    if (newNumberZipCode && this.getFormValue('numberZipCode') !== newNumberZipCode && validation.isValidZipCode(newNumberZipCode)) {
      this.props.getNewNpanxx(newNumberZipCode);
    } else if (newNPANXX) {
      // Update the list of Mtns available
      this.setState({ npaNxxMTNS: mtns });
      if (mtns && mtns.length > 0) {
        this.props.change('newNumber', mtns[0]);
      }
      this.props.invalidateAsyncFetch();
    }
  };

  componentDidUpdate = (prevProps) => {
    const currentTransfer = !!(this.getFormValue('npnxx') === 'transfer');
    const prevTransfer = !!(prevProps.forms && prevProps.forms[prevProps.form].values && prevProps.forms[prevProps.form].values.npnxx === 'transfer');

    if (currentTransfer !== prevTransfer && currentTransfer) {
      this.openTransferModal();
    }
  }


  getFormValue = (field) => (this.props.forms && this.props.forms[this.props.form] && this.props.forms[this.props.form].values ? this.props.forms[this.props.form].values[field] : null);

  setIsAddressUpdated = (value) => {
    this.setState({ isAddressUpdated: value });
  }
  updateDeviceInfo = (data) => {
    const serviceAddressValues = this.props.forms.serviceAddress ? this.props.forms.serviceAddress.values : {};
    const params = {
      deviceId: this.props.device.deviceId,
      serviceAddress: transformServiceAddress(serviceAddressValues),
      npnxxCustomerSelection: data.get('npnxx'),
      npaNxxnumber: data.get('newNumber'),
      sameAsShippingAddress: serviceAddressValues.sameAsShippingAddress,
      isAddressUpdated: this.state.isAddressUpdated, // TODO: this should be based out of pristine/dirty value of portin
      portInDetails: this.props.device.portInDetails,
      useSameNpaNxxNumberForAllDevices: data.get('npnxx') !== 'transfer' ? data.get('sameNumber') : false,
    };
    this.props.updateDeviceInfo(params, this.props.index, NOTIFICATIONS.DEVICE);
  }

  validatePortIn = (portInDetails) => {
    const serviceAddressValues = this.props.forms.serviceAddress ? this.props.forms.serviceAddress.values : {};
    const params = {
      deviceId: this.props.device.deviceId,
      serviceAddress: transformServiceAddress(serviceAddressValues),
      npnxxCustomerSelection: 'transfer',
      npaNxxnumber: this.getFormValue('newNumber'),
      portInDetails,
      sameAsShippingAddress: serviceAddressValues.sameAsShippingAddress,
      isAddressUpdated: this.state.isAddressUpdated, // TODO: this should be based out of pristine/dirty value of portin
      useSameNpaNxxNumberForAllDevices: false,
    };
    this.props.updateDeviceInfo(params, this.props.index, NOTIFICATIONS.PORTIN);
  }

  openTransferModal = () => {
    this.setState({ showTransferModal: true });
  }

  closeTransferModal = () => {
    if (!this.state.editTransfer) {
      this.props.change('npnxx', 'default');
    }
    this.setState({
      showTransferModal: false,
      editTransfer: false,
    });
  }

  openEditTransferModal = () => {
    this.setState({
      showTransferModal: true,
      editTransfer: true,
    });
  }

  serviceAddressHasErrors = () => {
    const { forms } = this.props;
    let isDisabled = true;
    if (forms && forms.serviceAddress && forms.serviceAddress.values) {
      if (forms.serviceAddress.values.sameAsShippingAddress) {
        isDisabled = false;
      } else if (forms.serviceAddress.syncErrors) {
        // There are errors in service address
        isDisabled = true;
      } else {
        isDisabled = false;
      }
    }
    return isDisabled;
  }
  render() {
    const {
      cqContent, device, index, valid, submitting, setEditState, handleSubmit, npaNxxdetails,
    } = this.props;
    return (
      <div>
        <Row className="border_grayThree onlyBottomBorder pad12 onlyBottomPad">
          <Col xs={3} sm={3} md={3} lg={2}>
            <img className="height102" src={device.deviceImageUrl} alt={device.deviceName} />
          </Col>
          <Col xs={9} lg={10} className="noPad">
            <Row>
              {(device.flow === 'AAL' || device.flow === 'NSO') &&
                <Col xs={6} className="border_grayThree onlyRightBorder" style={{ paddingRight: 18 }}>
                  <p className="bold fontSize_5">
                    {index + 1}. <span dangerouslySetInnerHTML={{ __html: device.deviceName }} />
                  </p>
                  <div className="margin6 noSideMargin">
                    <p className="bold fontSize_5 margin6 noSideMargin radioLabel">
                      {cqContent.label.DT_OD_CHECKOUT_NPNXX_TITLE}
                    </p>

                    <RadioButton
                      name="npnxx"
                      id="transferNumber"
                      value="transfer"
                      containerClassName="pad6 noSidePad"
                      labelClassName="verticalCenter pad12 onlyLeftPad radioLabel"
                    >
                      <div>
                        <p>{cqContent.label.DT_OD_CHECKOUT_NPNXX_OPTION_TRANSFER}</p>
                      </div>
                    </RadioButton>
                    {this.getFormValue('npnxx') === 'transfer' && device.portInDetails &&
                      <div className="margin36 onlyLeftMargin pad6 noSidePad">
                        <span className="fontSize_4">Transfer {validation.normalizePhoneNumber(device.portInDetails.existingNumber)}</span>
                        <button
                          className="fontSize_3 link background_transparent displayInlineBlock borderSize_0 noPad margin6 onlyLeftMargin"
                          onClick={this.openEditTransferModal}
                        >
                          Change
                        </button>
                      </div>
                    }
                    <RadioButton
                      name="npnxx"
                      id="newNumber"
                      value="new"
                      containerClassName="pad6 noSidePad"
                      labelClassName="verticalCenter pad12 onlyLeftPad radioLabel"
                    >
                      <p>{cqContent.label.DT_OD_CHECKOUT_NPNXX_OPTION_NEW}</p>
                    </RadioButton>

                    {this.getFormValue('npnxx') === 'new' &&
                      <div>
                        <div className="pad12 noSidePad">
                          <Field
                            component={renderTextField}
                            id="numberZipCode"
                            name="numberZipCode"
                            label={cqContent.label.DT_OD_CHECKOUT_NPNXX_ZIPCODE_FIELD}
                            type="text"
                            required
                          />
                        </div>
                        <div className="pad12 noSidePad clearfix">
                          <MSelect
                            id="newNumber"
                            name="newNumber"
                            label={cqContent.label.DT_OD_CHECKOUT_NPNXX_NUMBER_SELECT}
                            borderStyle
                          >
                            {this.state.npaNxxMTNS &&
                              this.state.npaNxxMTNS.map((number) => (
                                <option
                                  key={number}
                                  value={number}
                                >
                                  {number}
                                </option>
                              ))
                            }
                          </MSelect>
                        </div>
                      </div>
                    }
                    {((npaNxxdetails && npaNxxdetails.mtns && npaNxxdetails.mtns.length > 0) || device.npaNxxnumber) &&
                      < RadioButton
                        name="npnxx"
                        id="default"
                        value="default"
                        containerClassName="pad6 noSidePad"
                        labelClassName="verticalCenter pad12 onlyLeftPad radioLabel"
                      >
                        <p>{cqContent.label.DT_OD_CHECKOUT_NPNXX_OPTION_DEFAULT}</p>
                      </RadioButton>
                    }
                  </div>
                  <Modal
                    mounted={this.state.showTransferModal}
                    closeFn={this.closeTransferModal}
                    validatePortIn={this.props.validatePortIn}
                    underlayColor="rgba(0,0,0,0.8)"
                  >
                    <PortInNumber
                      closeModal={this.closeTransferModal}
                      device={device}
                      validatePortIn={this.validatePortIn}
                    />

                  </Modal>
                </Col>
              }
              <Col xs={(device.flow === 'AAL' || device.flow === 'NSO') ? 6 : 12} style={{ paddingLeft: (device.flow === 'AAL' || device.flow === 'NSO') ? 18 : 8 }}>
                <ServiceAddressEdit
                  device={device}
                  setIsAddressUpdated={this.setIsAddressUpdated}
                />
              </Col>
            </Row>
            <div className={((device.flow === 'AAL' || device.flow === 'NSO') && this.getFormValue('npnxx') !== 'transfer') ? '' : 'displayNone'}>
              <Checkbox
                className="checkbox"
                name="sameNumber"
                id="sameNumber"
                component="input"
                type="checkbox"
                checkboxClass="displayInlineBlock pad6 noLeftPad"
                labelClass="displayInlineBlock verticalCenter leftAlign pad6 checkboxLabel"
              >
                <p id="sameNumberLabel" > {cqContent.label.DT_OD_CHECKOUT_NPNXX_SAME_NUMBER_ALL_DEVICES} </p>
              </Checkbox>
            </div>
          </Col>
        </Row>
        <div className={`width100 pad24 clearfix ${index > 0 ? 'onlyTopPad' : 'noSidePad border_grayThree onlyBottomBorder'}`}>
          {!this.props.required &&
            <button
              className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
              onClick={() => setEditState(index, false)}
            >
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_CANCEL}
            </button>
          }
          <button
            className="primary button large"
            type="submit"
            disabled={!valid || submitting || this.serviceAddressHasErrors()}
            onClick={
              handleSubmit((data) => {
                this.updateDeviceInfo(data);
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

DeviceEdit.propTypes = {
  cqContent: PropTypes.object,
  index: PropTypes.number,
  device: PropTypes.object,
  forms: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  setEditState: PropTypes.func,
  form: PropTypes.string,
  change: PropTypes.func,
  npaNxxdetails: PropTypes.object,
  required: PropTypes.bool,
  updateDeviceInfo: PropTypes.func,
  validatePortIn: PropTypes.func,
  getNewNpanxx: PropTypes.func,
  handleSubmit: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
};

export default reduxForm({
  validate,
})(connect((state) => ({ forms: state.get('form').toJS() }))(DeviceEdit));
