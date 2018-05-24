import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';
import { hashHistory } from '../../store';
import * as validation from '../../common/validation';
import { renderTextField } from '../../common/TextField/';
import ToolTip from '../../common/ToolTip/index';
import NotificationBar from '../../common/NotificationBar';
import { NOTIFICATIONS } from '../constants';

const selector = formValueSelector('securePin');
const validate = (values, props) => {
  const errors = {};
  const securePin = values.get('securePin');
  const securePinConfirmation = values.get('securePinConfirmation');

  if (!securePin) {
    errors.securePin = props.cqContent.error.DT_OD_CHECKOUT_SECURE_PIN_REQUIRED_ERROR;
  }
  if (!securePinConfirmation) {
    errors.securePinConfirmation = props.cqContent.error.DT_OD_CHECKOUT_SECURE_PIN_CONFIRM_REQUIRED_ERROR;
  } else if (securePin !== securePinConfirmation) {
    errors.securePinConfirmation = props.cqContent.error.DT_OD_CHECKOUT_SECURE_PIN_NOT_MATCHING_ERROR;
  }
  return errors;
};
class SecurePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceDetails: props.deviceDetails,
      sentSMS: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.asyncCallStatus.data.sentSMS) {
      const { deviceDetails } = this.props;
      const deviceIndex = deviceDetails.findIndex((device) => (device.mtn === nextProps.selectValue('smsDevice')));

      if (deviceIndex >= 0) {
        deviceDetails.splice(deviceIndex, 1, { ...deviceDetails[deviceIndex], numberOfSMSRequestsIn24Hours: nextProps.asyncCallStatus.data.numberOfSMSRequestsIn24Hours });
      } else {
        hashHistory.push('/genericError');
      }
      this.setState({
        sentSMS: true,
        deviceDetails,
      });
      this.props.invalidateAsyncFetch();
    } else if (nextProps.asyncCallStatus.data.smsAuthenticationComplete) {
      nextProps.securePinSuccess();
    }
  }
  sendSMS = () => {
    this.props.sendSMS(this.props.selectValue('smsDevice'));
  }
  validateAuthCode = () => {
    this.props.validateAuthCode(this.props.selectValue('securePin'));
  }
  render() {
    const {
      cqContent, closeModal, selectValue, valid, submitting,
    } = this.props;
    const {
      deviceDetails, sentSMS,
    } = this.state;
    const currentDevice = deviceDetails.find((device) => (device.mtn === selectValue('smsDevice')));
    const currentDeviceSMSEligible = currentDevice && (!currentDevice.smsCapable || !currentDevice.esnHistoryCheckPassed || currentDevice.numberOfSMSRequestsIn24Hours >= 3);

    return (
      <div>
        <NotificationBar section={NOTIFICATIONS.SECURE_PIN} />
        <div className="pad12">
          <h2>{cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_TITLE}</h2>
          {!sentSMS ?
            <div>
              <div
                className="background_blue margin20 noSideMargin pad20 color_FFF"
                dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_SECURE_PIN_SHIPPING_ADRESS_NOTIFICATION }}
              />
              <div dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_SECURE_PIN_AUTHORIZATION_PROCESS }} />
              <div className="margin24 onlyLeftMargin">
                <Row className="pad36 onlyTopPad">
                  {deviceDetails.map((device) => (
                    <Col key={`devicePin-${device.mtn}`} className="background_gray_three pad12 width160 margin6 sideMarginOnly">
                      <label className="displayBlock textAlignCenter" htmlFor={device.mtn}>
                        <img className="margin12 onlyBottomMargin" src={device.deviceImageUrl} alt={device.deviceName} />
                      </label>
                      <RadioButton
                        // disabled={radioBTNClass}
                        name="smsDevice"
                        id={`smsDevice-${device.mtn}`}
                        value={device.mtn}
                        containerClassName=""
                        labelClassName="bold displayInlineBlock fontSize_4 onlyLeftPad pad6 verticalCenter radioLabel"
                      >
                        {device.formattedMtn}
                      </RadioButton>
                    </Col>

                  ))}
                </Row>
                <div className="margin30 noSideMargin">
                  <button
                    className="primary button large"
                    type="submit"
                    onClick={this.sendSMS}
                    disabled={currentDeviceSMSEligible}
                  >
                    {cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_TEXT_ME}
                  </button>
                  <button
                    className="button secondary displayInlineBlock margin12 onlyLeftMargin"
                    onClick={closeModal}
                  >
                    {cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_CANCEL}
                  </button>
                </div>
                <p>{cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_FREE_TEXT}</p>
              </div>
            </div>
            :
            <div>
              <div>
                <span>
                  {cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_AUTHENTICATE_SUBTITLE}
                </span>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Enter online authentication code information tooltip"
                  text={cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_AUTHENTICATE_SUBTITLE_TOOLTIP}
                  noRenderHTML
                />
              </div>

              <div style={{ width: 300 }}>
                <div className="margin24 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="securePin"
                    name="securePin"
                    normalize={validation.allowOnlyNumbers}
                    label={cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_CUSTOMER_VERIFICATION}
                  />
                </div>
                <div className="margin24 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="securePinConfirmation"
                    name="securePinConfirmation"
                    normalize={validation.allowOnlyNumbers}
                    label={cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_CONFIRM_CUSTOMER_VERIFICATION}
                    disabled={!this.props.selectValue('securePin')}
                  />
                </div>
              </div>
              <div className="margin30 noSideMargin">
                <button
                  className="primary button large"
                  type="submit"
                  onClick={this.validateAuthCode}
                  disabled={!valid || submitting}
                >
                  {cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_CONFIRM}
                </button>
                <button
                  className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
                  onClick={closeModal}
                >
                  {cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_CANCEL}
                </button>
              </div>
              <div>
                <span className="margin24 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_AUTHENTICATE_FOOTER}</span>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Didn't receive authentication code information tooltip"
                  text={cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_AUTHENTICATE_FOOTER_TOOLTIP}
                  noRenderHTML
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

SecurePin.propTypes = {
  cqContent: PropTypes.object,
  deviceDetails: PropTypes.array,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  closeModal: PropTypes.func,
  selectValue: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  sendSMS: PropTypes.func,
  validateAuthCode: PropTypes.func,
};

export default connect((state) => ({ selectValue: (field) => selector(state, field) }))(
  reduxForm({
    form: 'securePin',
    validate,
  })(SecurePin)
);
