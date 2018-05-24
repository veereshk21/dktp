import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sticky from 'react-stickynode';

import { NOTIFICATIONS } from '../../constants';
import Accordion from './accordion/accordion';
import BuddyModal from './BuddyModal';
import NotificationBar from '../../../common/NotificationBar';

import NortonSeal from '../../../../images/norton_secure_seal.svg';

class OrderSummary extends Component {
  static propTypes = {
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
  };

  constructor(props) {
    super(props);
    this.state = {
      showBuddyModal: false,
    };
  }

  onPlaceOrder = () => {
    const { buddyUpgrade } = this.props;
    if (buddyUpgrade) {
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
    } = this.props;

    const readTermsLink = `<a class="link" href="javascript:document.getElementById('agreementSection').scrollIntoView({ behavior: 'smooth' })">${cqContent.label.DT_OD_CHECKOUT_SUMMARY_READ_TERMS_LINK}</a>`;

    return (
      <div>
        {this.state.showBuddyModal &&
          <BuddyModal cqContent={cqContent} closeBuddyModal={this.closeBuddyModal} submitOrder={this.submitOrder} cancelOrder={this.cancelOrder} />
        }
        <Sticky bottomBoundary="#app">
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
                  disabled={!this.props.checkoutEnabled}
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

export default OrderSummary;
