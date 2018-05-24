import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Anchor from './../../common/A/A';
import paypalIMG from './../../../images/payment-icons/paypal-cart.svg';
import EmailCartModal from '../containers/EmailCartContainer';

const customStyles = {
  content: {
    width: '40vw',
  },
};

class PayPalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { openModal: false };
    this._onCheckout = this._onCheckout.bind(this);
    this.handleEmailCartModalOpen = this.handleEmailCartModalOpen.bind(this);
    this.handleEmailCartModalClose = this.handleEmailCartModalClose.bind(this);
  }

  _onCheckout(paypalEnabled, event) {
    event.preventDefault();
    // TODO: This is the logic for guest checkout
    // const { authenticated, standaloneAccessories, guestCheckoutSignInURL } = this.props;
    // if (standaloneAccessories && !authenticated) {
    //   window.location.href = guestCheckoutSignInURL;
    // } else {
    //   this.props.initiateCheckout(paypalEnabled);
    // }
    this.props.initiateCheckout(paypalEnabled);
  }

  _onEmailCart(event) { // Email Cart
    event.preventDefault();
    this.handleEmailCartModalOpen();
  }

  handleEmailCartModalOpen = () => {
    this.setState({ openModal: true });
  };

  handleEmailCartModalClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const {
      cq,
      cartReadyforCheckout,
      isAccountMember,
      emailResponse,
      cartData,
    } = this.props;
    return (
      <div>
        <div className="margin20 noSideMargin">
          {isAccountMember ?
            <button
              className="button primary width100 margin18 onlyBottomMargin"
              disabled={(cartReadyforCheckout || emailResponse.cartSaved)}
              onClick={this._onEmailCart.bind(this)}
            >{cq.label.DT_OD_CART_EMAIL_CTA}
            </button>
            :
            <button className="button primary width100 margin18 onlyBottomMargin" disabled={!this.props.cartReadyforCheckout} onClick={this._onCheckout.bind(this, null)}>
              {cq.label.DT_OD_CART_CHECK_OUT_TITLE}
            </button>
          }
          {cartData.paypalEnabled && !isAccountMember &&
            <form id="paypalCheckoutTopFrm">
              <button className="paypal-button paypal-style-checkout paypal-color-silver paypal-size-medium paypal-shape-rect en_US width100" type="button" onClick={this._onCheckout.bind(this, cartData.paypalEnabled)}>
                <p className="paypal-button-content">
                  <img src={paypalIMG} alt="PayPal" itemProp="image" />
                  <span>{cq.label.DT_OD_CART_CHECK_OUT_TITLE}</span>
                </p>
                <p className="paypal-button-tag-content width100">{cq.label.DT_OD_CART_PAYPAL_TAG_LINE_TITLE}</p>
              </button>
            </form>
          }
        </div>
        <ReactModal
          isOpen={(typeof this.props.emailResponse.cartSaved !== 'undefined') ? false : this.state.openModal}
          style={customStyles}
          onRequestClose={this.handleEmailCartModalClose}
          className="modal"
          overlayClassName="overlay"
        >
          <EmailCartModal onCancelClick={this.handleEmailCartModalClose} isOpen={this.state.openModal} />
          <Anchor onClick={this.handleEmailCartModalClose} className="modalCloseIcon pad0 textDecNone" />
        </ReactModal>
      </div>
    );
  }
}

PayPalWrapper.defaultProps = {
  guestCheckoutSignInURL: '/od/cust/checkout/sign_in',
};

PayPalWrapper.propTypes = {
  // title: PropTypes.element.String,
  cq: PropTypes.object,
  cartReadyforCheckout: PropTypes.bool,
  isAccountMember: PropTypes.bool,
  emailResponse: PropTypes.object,
  initiateCheckout: PropTypes.func,
  cartData: PropTypes.object,
  // authenticated: PropTypes.bool,
  // standaloneAccessories: PropTypes.bool,
  // guestCheckoutSignInURL: PropTypes.string,
};

export default PayPalWrapper;
