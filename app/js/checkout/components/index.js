import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Loader from '../../common/Loader/Loader';
import ShippingSection from '../containers/shipping/shippingSection';
import PaymentSection from './payment/paymentSection';
import DevicesSection from '../containers/devices/devicesSection';
import AsyncComponent from '../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';

const Header = AsyncComponent(() => import('./header/header'));
const OrderSummary = AsyncComponent(() => import('../containers/orderSummary/orderSummary'));
const AgreementSection = AsyncComponent(() => import('../containers/agreement/agreementSection'));
const EppAccessoryPolicyModal = AsyncComponent(() => import('./eppAccessoryPolicyModal'));


class HomePage extends Component {
  componentDidMount() {
    const paymentSectionElement = window.document.getElementById('paymentSection');
    const shippingSectionElement = window.document.getElementById('shippingSection');
    const devicesSectionElement = window.document.getElementById('devicesSection');
    const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };
    if (paymentSectionElement && this.props.paymentRequired) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_PAYMENT_SECTION_ERROR);
      paymentSectionElement.scrollIntoView(scrollProps);
    }
    // Masterpass Error Notification, ex: preauth errors
    if (paymentSectionElement && this.props.masterpassError) {
      this.props.showMasterpassError();
    }
    if (shippingSectionElement && (this.props.shippingAddressRequired || this.props.shippingAddressChangeRequired || this.props.checkoutStates.poBoxShippingAddress || this.props.checkoutStates.shippingAddressValidationError)) {
      // this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_UPDATE_REQUIRED_ERROR);
      shippingSectionElement.scrollIntoView(scrollProps);
    }
    if (devicesSectionElement && this.props.npanxxError) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_NPANXX_NO_NUMBERS_ZIPCODE_TEXT);
      devicesSectionElement.scrollIntoView(scrollProps);
    }
    if (shippingSectionElement && this.props.flipIspuToShipping) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ISPU_NOTAVAILABLE_ORDER_HEAD_ERROR);
      shippingSectionElement.scrollIntoView(scrollProps);
    }
  }

  render() {
    const {
      isFetching, cqContent, standaloneAccessories, cartDetailURL, eppAccessoryPolicyModal,
    } = this.props;

    return (
      <div>
        {isFetching === true && <Loader />}
        {/* <div className="border_grayThree height60 width100 onlyBottomBorder" /> */}
        {eppAccessoryPolicyModal && <EppAccessoryPolicyModal cqContent={cqContent} />}
        <div className="border_e6 onlyBottomBorder pad24 noSidePad">
          <Row middle="xs">
            <Col xs={9}>
              <div className="margin6 onlyLeftMargin clearfix textAlignLeft width50 displayInlineBlock">
                <a href={cartDetailURL} className="secondaryCTA m-back color_000 bold fontSize_6 pad12 noSidePad">{cqContent.label.DT_OD_CHECKOUT_BACK_TO_CART}</a>
              </div>
            </Col>
            <Col xs={3}>
              <ChatAndC2C />
            </Col>
          </Row>
        </div>
        <Row className="section clearfix" style={{ marginRight: 0, marginLeft: 0 }}>
          <Col xs={6} className="noPad mainContent">

            <Header
              cqContent={cqContent}
              oneClickCheckout={this.props.oneClickCheckout}
            />
            <ShippingSection />

            {this.props.showPaymentSection &&
              <PaymentSection {...this.props} />
            }

            {!standaloneAccessories &&
              <div>
                <DevicesSection />
                <AgreementSection />
              </div>
            }
          </Col>
          <Col xs={6} className="noPad sideBarContent">
            <OrderSummary />
          </Col>
        </Row>
      </div>
    );
  }
}

HomePage.propTypes = {
  isFetching: PropTypes.bool,
  cqContent: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  paymentRequired: PropTypes.bool,
  shippingAddressRequired: PropTypes.bool,
  shippingAddressChangeRequired: PropTypes.bool,
  showErrorNotification: PropTypes.func,
  npanxxError: PropTypes.bool,
  oneClickCheckout: PropTypes.bool,
  cartDetailURL: PropTypes.string,
  showPaymentSection: PropTypes.bool,
  masterpassError: PropTypes.bool,
  showMasterpassError: PropTypes.func,
  flipIspuToShipping: PropTypes.bool,
  checkoutStates: PropTypes.object,
  eppAccessoryPolicyModal: PropTypes.bool,
};

export default HomePage;
