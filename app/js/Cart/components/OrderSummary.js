import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PayPalCheckout from './../containers/PayPalCheckout';
import MasterPassCheckout from './../containers/MasterPassCheckout';
import DeviceDelivery from './DeviceDelivery';

import AsyncComponent from '../../common/AsyncComponent';

const DevicePromotionCode = AsyncComponent(() => import('./../containers/DevicePromotionCode'));
const DevicePrice = AsyncComponent(() => import('./../containers/DevicePrice'));

class OrderSummary extends Component {
  static propTypes = {
    cartData: PropTypes.object.isRequired,
    cq: PropTypes.object.isRequired,
    saveCart: PropTypes.func,
    toggleModal: PropTypes.func,
    emailResponse: PropTypes.object,
    accountMember: PropTypes.bool,
  };

  // material-ui specific method
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  onToggleContinueShopping = () => {
    if (this.props.standaloneAccessories) {
      window.location = this.props.shopMoreLink;
    } else {
      this.props.toggleModal('ContinueShopping');
    }
  };
  onToggleClearCartModal = () => {
    this.props.toggleModal('ClearCart');
  };
  saveCart = (event) => {
    event.preventDefault();
    this.props.saveCart();
  };

  render() {
    const {
      cartData, cq, emailResponse, accountMember,
    } = this.props;
    // const coDisabled = !(cartReadyforCheckout && cartReadyforCheckout !== null && cartReadyforCheckout !== '');
    return (
      <div id="cartAsideBar">
        <PayPalCheckout title="payPalCheckout" data={cartData} cq={cq} />
        <MasterPassCheckout title="masterPassCheckout" data={cartData} cq={cq} />
        {cartData.output.targetter && <DeviceDelivery title="DeviceDelivery" data={cartData} cq={cq} />}
        <DevicePromotionCode title="DevicePromotion" data={cartData} cq={cq} />
        <DevicePrice title="DevicePrice" data={cartData} cq={cq} />
        <PayPalCheckout title="payPalCheckout" data={cartData} cq={cq} />
        <MasterPassCheckout title="masterPassCheckout" data={cartData} cq={cq} />

        <div className="cartbtnLinks">
          <Row>
            <Col md={7} lg={7}>
              {!emailResponse.cartSaved && !accountMember &&
              <a
                onClick={this.onToggleContinueShopping}
                role="button"
                className="color_333"
              >
                {cq.label.DT_OD_CART_CONTINUE_SHOP_LINK}</a>}
            </Col>
            <Col md={5} lg={5} className="textAlignRight">
              {/* <Anchor href="javascript:void(0)"  onClick={this.saveCart} className="color_333 bold fontSize_4 margin18 onlyLeftMargin pad12 onlyLeftPad border_black onlyLeftBorder"><span>{cq.label.DT_OD_CART_SAVE_CART_LINK}</span></Anchor> */}
              {cartData.output.emptyCartFlag === false &&
                <a
                  onClick={this.onToggleClearCartModal}
                  role="button"
                  className="color_333"
                >
                  {cq.label.DT_OD_CART_CLEAR_CART_LINK}</a>}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

OrderSummary.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

OrderSummary.propTypes = {
  standaloneAccessories: PropTypes.bool,
  shopMoreLink: PropTypes.string,
};

export default OrderSummary;
