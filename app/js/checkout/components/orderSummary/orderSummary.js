import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sticky from 'react-stickynode';

import { NOTIFICATIONS } from '../../constants';
import Accordion from './accordion/accordion';
import BuddyModal from './BuddyModal';
import NotificationBar from '../../../common/NotificationBar';

import NortonSeal from '../../../../images/norton_secure_seal.svg';

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBuddyModal: false,
    };
  }

  onPlaceOrder = () => {
    const { cqContent, showErrorNotification, addressInfo, checkoutStates } = this.props;
    const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };
    if (!this.props.checkoutEnabled) {
      if (!this.props.shippingCompleted) {
        if (!this.props.ispuSelected) {
          // Shipping Address Error Messages
          if (checkoutStates.poBoxShippingAddress) {
            // PO BOX Address
            showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PO_BOX_ERROR);
          } else if (checkoutStates.shippingAddressValidationError) {
            // Generic Validation Error
            showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_VALIDATION_ERROR);
          } else if (checkoutStates.contactInfoRequired) {
            if (!addressInfo.email && !addressInfo.phoneNumber) {
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_AND_PHONE_NUMBER_ERROR);
            } else if (!addressInfo.email) {
              // Missing Email Address
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR);
            } else if (!addressInfo.phoneNumber) {
              // Missing Phone Number
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_PHONE_NUMBER_ERROR);
            }
          } else {
            this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
          }
        } else {
          // ISPU Error Messages
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        }
        document.getElementById('shippingSection').scrollIntoView(scrollProps);
      } else if (!this.props.paymentCompleted) {
        this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        document.getElementById('paymentSection').scrollIntoView(scrollProps);
      } else if (!this.props.devicesCompleted) {
        this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        document.getElementById('devicesSection').scrollIntoView(scrollProps);
      } else if (!this.props.termsCompleted) {
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        document.getElementById('agreementSection').scrollIntoView(scrollProps);
      }
    } else if (this.props.buddyUpgrade) {
      this.showBuddyModal();
    } else {
      this.submitOrder();
    }
  };

  submitOrder = () => {
    const { placeOrder, submitOrderURL, optInShippingSMS, optInMtn, optInPaperFree } = this.props;
    placeOrder(submitOrderURL, optInShippingSMS, optInMtn, optInPaperFree);
  }

  cancelOrder = () => {
    const { cqContent, cancelOrder, orderId } = this.props;
    cancelOrder(cqContent.label.DT_OD_CHECKOUT_BUDDY_CANCEL_URL, orderId);
  }

  showBuddyModal = () => {
    this.setState({ showBuddyModal: true });
  }

  closeBuddyModal = () => {
    this.setState({ showBuddyModal: false });
  }

  render() {
    const {
      cqContent,
      cartDetailURL,
      notification,
    } = this.props;
    const readTermsLink = `<a class="link" href="javascript:document.getElementById('agreementSection').scrollIntoView({ behavior: 'smooth' })">${cqContent.label.DT_OD_CHECKOUT_SUMMARY_READ_TERMS_LINK}</a>`;
    return (
      <div>
        {this.state.showBuddyModal &&
          <BuddyModal cqContent={cqContent} closeBuddyModal={this.closeBuddyModal} submitOrder={this.submitOrder} cancelOrder={this.cancelOrder} />
        }
        <Sticky
          bottomBoundary="#app"
          top={notification.height}
        >
          <NotificationBar section={NOTIFICATIONS.SUMMARY} />
          <div className="pad24">
            {/* Header */}
            <div className="margin42 onlyBottomMargin">
              <div className="displayInlineBlock">
                <h2 className="h1"> {cqContent.label.DT_OD_CHECKOUT_SUMMARY_TITLE} </h2>
              </div>
              <div className="floatRight displayInlineBlock textAlignRight ">
                <a
                  className="margin3 onlyBottomMargin link displayBlock"
                  href={cartDetailURL}
                >
                  {cqContent.label.DT_OD_CHECKOUT_SUMMARY_EDIT_CART}
                </a>
                {/* <button
                  className="margin3 onlyTopMargin link background_transparent displayBlock borderSize_0 fontSize_3 noPad"
                // onClick={this.onCancel}
                >
                  {cqContent.label.DT_OD_CHECKOUT_SUMMARY_SAVE_CART}
                </button> */}
              </div>
            </div>
            {/* Accordion  */}
            <Accordion {...this.props} />
            {/* Checkout CTAs */}
            <div>
              {!this.props.standaloneAccessories &&
                <p
                  className="margin24 noSideMargin"
                  dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CHECKOUT_SUMMARY_READ_TERMS.replace('$TERMS_LINK$', readTermsLink) }}
                />
              }
              <div className="margin24 noSideMargin clearfix">
                <button
                  className="button primary"
                  onClick={this.onPlaceOrder}
                >
                  {cqContent.label.DT_OD_CHECKOUT_PLACE_ORDER_CTA}
                </button>
                <img className="floatRight height60 margin-6 onlyTopMargin" src={NortonSeal} alt="Norton Secured" />
              </div>
              <a className="link" target="_blank" href="//www22.verizon.com/privacy/" >{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PRIVACY_POLICY}</a>
            </div>
          </div>
        </Sticky>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  cqContent: PropTypes.object,
  checkoutEnabled: PropTypes.bool,
  cartDetailURL: PropTypes.string,
  placeOrder: PropTypes.func,
  submitOrderURL: PropTypes.string,
  optInShippingSMS: PropTypes.bool,
  optInMtn: PropTypes.string,
  optInPaperFree: PropTypes.bool,
  standaloneAccessories: PropTypes.bool,
  buddyUpgrade: PropTypes.bool,
  orderId: PropTypes.string,
  cancelOrder: PropTypes.func,
  showErrorNotification: PropTypes.func,
  termsCompleted: PropTypes.bool,
  shippingCompleted: PropTypes.bool,
  paymentCompleted: PropTypes.bool,
  devicesCompleted: PropTypes.bool,
  notification: PropTypes.object,
  addressInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
  ispuSelected: PropTypes.bool,
};

export default OrderSummary;
