import { Col, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { renderTextField } from '../../common/TextField/';
import Button from '../../common/Button/Button';
import * as Constants from './../constants';
import Notification from './../../common/Notification/Notification';
import { getErrorMap } from './../../common/Helpers';
import Loader from '../../common/Loader/Loader';
import ChatAndC2C from '../../common/ChatAndC2C';

const styles = {
  place: {
    marginLeft: 15,
    fontSize: 18,
  },
};

class Sim extends Component {
  static propTypes = {
    pageJSON: PropTypes.object,
    iMEIResponse: PropTypes.object,
    addNewSim: PropTypes.func,
    formData: PropTypes.object,
    validateSIM: PropTypes.func,
    cqJSON: PropTypes.object,
    data: PropTypes.object,
    asyncCallStatus: PropTypes.object,
    checkedDevicesResponse: PropTypes.object,
    // removeDevice: PropTypes.func,
    // showCheckedDevices: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.content = null;
    this.osOptions = this.props.data.deviceType[0].OS;
    this.osMismatch = false;
    this.simContent = null;
    this.pageMessage = null;
    this.state = {
      simState: true,
      showSimError: false,
      showSuccessNotification: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formData.toJS().simId &&
      newProps.formData.toJS().simId.values.deviceType !== this.props.formData.toJS().simId.values.deviceType) {
      this.osOptions = this.props.data.deviceType.filter((device) => device.name === newProps.formData.toJS().simId.values.deviceType)[0].OS;
      this.osMismatch = true;
    }
    this.state.showSimError = (newProps.simValidationResponse.output && newProps.simValidationResponse.output.output === null) || false;
    this.simContent = (newProps.simValidationResponse.output && newProps.simValidationResponse.output.output === null) && getErrorMap(newProps.simValidationResponse.output.errorMap);
    this.state.showSuccessNotification = (newProps.iMEIResponse.output && typeof newProps.iMEIResponse.output.output !== typeof undefined && newProps.iMEIResponse.output.output !== null) || false;
    this.pageMessage = (newProps.iMEIResponse.output && newProps.iMEIResponse.output.output !== null) && newProps.iMEIResponse.output.statusMessage;
    return true;
  }

  getOSContent = () => {
    let content = null;
    const selectedDevice = this.props.formData.toJS().simId && this.props.data.deviceType.filter((device) => device.name === this.props.formData.toJS().simId.values.deviceType)[0].OS;
    if (!this.osMismatch) {
      content = this.props.formData.toJS().simId ? selectedDevice.filter((os) => os.name === this.props.formData.toJS().simId.values.osType)[0].deviceIdInstructions : null;
    } else {
      content = selectedDevice[0].deviceIdInstructions;
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  changeSimView = (type) => {
    // this.setState({ simState: !this.state.simState });
    this.setState({ simState: type === Constants.NEED_SIM });
  }

  addSimSelected = () => {
    const { deviceId } = this.props.iMEIResponse.output.output;
    this.props.addNewSim({ deviceId, skipNSOAddSimBtn: true }, this.props.pageJSON.addSimUrl);
  }

  submitSim = () => {
    const { simId } = this.props.formData.toJS().simId.values;
    // hashHistory.push('/sim');
    this.props.validateSIM({ simId }, this.props.pageJSON.validateSIMUrl);
  };

  render() {
    const { cqJSON, asyncCallStatus, checkedDevicesResponse } = this.props;
    const device = checkedDevicesResponse.output[0];
    return (
      <section>
        {asyncCallStatus.isFetching === true && <Loader />}
        <Row>
          <Col xsOffset={9} xs={3}>
            <ChatAndC2C />
          </Col>
        </Row>
        <Row className="pad36 noSidePad">
          <Col xs={6}>
            {this.state.showSuccessNotification &&
              <Notification message={this.pageMessage} />
            }
            <Row className="pad24 onlyBottomPad">
              <Col xs={12}>
                {device.deviceName && <h2>{cqJSON.label.DT_OD_BYOD_SIM_TITLE.replace('$DEVICENAME$', device.deviceName)}</h2>}
              </Col>
            </Row>
            <Row className="pad72 onlyBottomPad">
              <Col xs={12}>
                {cqJSON.label.DT_OD_BYOD_SIM_REQUIRED_DESCRIPTION}
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <Row>
              <Col xs={4} className="textAlignCenter">
                {device.deviceName && device.imageUrl && <img className="width100" src={`https://ss7.vzw.com/is/image/VerizonWireless/${device.imageUrl}?$device-lg$`} alt={device.deviceName} />}
              </Col>
              <Col xs={8}>
                <Row className="pad12 onlyBottomPad">
                  <Col xs={12}>
                    <h3>Line 1</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={5}>
                    {device.deviceName && <h2>{device.deviceName}</h2>}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="pad36 onlyBottomPad">
          <Col xs={6} className="border_grayThree">
            <Row className="pad18 noBottomPad">
              <Col xs={12}>
                <h2>{cqJSON.label.DT_OD_BYOD_GET_SIM_TEXT}</h2>
              </Col>
            </Row>
            <Row className="pad18">
              <Col xs={12} className="border_grayThree onlyBottomBorder pad6 onlyBottomPad">
                {cqJSON.label.DT_OD_BYOD_ORDER_NEW_SIM}
              </Col>
            </Row>
            <Row className="pad18">
              <Button
                type="button"
                className="button primary"
                onClick={this.addSimSelected}
              >
                {cqJSON.label.DT_OD_BYOD_ADD_SIM_CTA_TEXT}
              </Button>
            </Row>
          </Col>
          <Col xs={6} className="border_grayThree noLeftBorder">
            <Row className="pad18 noBottomPad">
              <Col xs={12}>
                <h2>{cqJSON.label.DT_OD_BYOD_HAVE_SIM_TITLE}</h2>
              </Col>
            </Row>
            <Row className="pad18">
              <Col xs={12} className="border_grayThree onlyBottomBorder pad6 onlyBottomPad">
                {cqJSON.label.DT_OD_BYOD_HAVE_SIM_DESCRIPTION}
              </Col>
            </Row>
            {this.state.showSimError &&
              <Notification type="error" message={this.simContent} />
            }
            <Row className="pad18">
              <Col xs={5}>
                <Field
                  component={renderTextField}
                  id="byodDevice"
                  name="simId"
                  type="text"
                  hintText="SIM ID"
                  hintStyle={styles.place}
                  required
                  pattern="[0-9]*"
                />
              </Col>
              <Col>
                <Button
                  type="button"
                  className="button primary"
                  onClick={this.submitSim}
                >
                  {cqJSON.label.DT_OD_BYOD_CHECK_SIM_CTA_TEXT}
                </Button>
              </Col>
            </Row>
            <Row className="pad18 noTopPad">
              <Col xs={12}>
                <Row>
                  <Col xs={12}>
                    {cqJSON.label.DT_OD_FIND_SIM_INSTRUCTION_TOP}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="pad24 onlyRightPad">1.</span><span>From your home screen, select "Settings".</span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="pad24 onlyRightPad">2.</span><span>Select "General".</span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="pad24 onlyRightPad">3.</span><span>Select "About".</span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="pad24 onlyRightPad">4.</span><span>Scroll down to the ICCID number.</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    );
  }
}

export default reduxForm({
  form: 'simId',
  initialValues: {
    deviceType: 'Smartphone',
    osType: 'iOS(Apple)',
  },
})(Sim);
