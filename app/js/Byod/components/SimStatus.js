import { Col, Row } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loader from '../../common/Loader/Loader';
import Notification from './../../common/Notification/Notification';
import RightSection from './RightSection/index';
import ChatAndC2C from '../../common/ChatAndC2C';

class SimStatus extends Component {
  static propTypes = {
    cqJSON: PropTypes.object,
    pageJSON: PropTypes.object,
    removeDevice: PropTypes.func,
    showCheckedDevices: PropTypes.object,
    simValidationResponse: PropTypes.object,
    // redirectionCall: PropTypes.func,
    asyncCallStatus: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.content = null;
    this.pageMessage = null;
    this.showContent = this.showContent.bind(this);
    this.state = {
      viewInstructions: false,
      showSuccessNotification: false,
    };

    this.onAddToCartAndCheckoutHandler = this.onAddToCartAndCheckoutHandler.bind(this);
  }

  componentWillMount() {
    this.state.showSuccessNotification = (this.props.simValidationResponse.output && this.props.simValidationResponse.output.output !== null) || false;
    this.pageMessage = (this.props.simValidationResponse.output && this.props.simValidationResponse.output.output !== null) && this.props.simValidationResponse.output.statusMessage;
    return true;
  }

  onAddToCartAndCheckoutHandler(evt) {
    evt.preventDefault();
    const { redirectURL, redirectUrl } = this.props.simValidationResponse.output.output;
    const redirectionPath = redirectURL || redirectUrl;
    window.location.href = redirectionPath;
  }

  showContent(type) {
    this.state.viewInstructions = true;
    this.content = this.props.pageJSON.deviceType[0].OS.filter((device) => device.name === type)[0].deviceIdInstructions;
  }

  bringAnotherDevice = () => {
    window.location = this.props.pageJSON.byodLandingUrl;
  }

  render() {
    const { cqJSON, asyncCallStatus } = this.props;
    console.log(this.props);
    return (
      <section>
        {asyncCallStatus.isFetching === true && <Loader />}
        <Row>
          <Col xsOffset={9} xs={3}>
            <ChatAndC2C />
          </Col>
        </Row>
        <Row className="pad36 noSidePad">
          <Col sm={6} md={6} lg={8}>
            {this.state.showSuccessNotification &&
              <Notification message={this.pageMessage} />
            }
            <Row className="pad24 noSidePad">
              <Col xs={9}>
                {cqJSON.label.DT_OD_BYOD_SIM_ID_ADDED_DESCRIPTION}
              </Col>
            </Row>
            <Row className="pad36 noSidePad">
              <Col xs={8}>
                <button className="button primary large" onClick={this.onAddToCartAndCheckoutHandler}>{cqJSON.label.DT_OD_BYOD_ADD_TO_CART_CTA}</button>
              </Col>
            </Row>
          </Col>
          <RightSection
            showCheckedDevices={this.props.showCheckedDevices}
            checkedDevice={this.props.pageJSON.checkedDevices}
            cqJSON={cqJSON}
            showDeviceId
            showSimId
            removeDevice={this.props.removeDevice}
            removeDeviceUrl={this.props.pageJSON.removeDeviceUrl}
            pageJSON={this.props.pageJSON}
          />
        </Row>
      </section>
    );
  }
}

export default reduxForm({
  form: 'byodDevice',
})(SimStatus);
