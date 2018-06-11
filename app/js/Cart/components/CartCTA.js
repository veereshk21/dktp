import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';

const CartCTA = ({ cartSaved, accountMember, onToggleContinueShopping, emptyCartFlag, onToggleClearCart, cqContent }) => (<Row>
  <Col md={7} lg={7}>
    {!cartSaved && !accountMember &&
    <a
      onClick={onToggleContinueShopping}
      role="button"
      className="color_333"
    >
      {cqContent.label.DT_OD_CART_CONTINUE_SHOP_LINK}</a>}
  </Col>
  <Col md={5} lg={5} className="textAlignRight">
    {/* <Anchor href="javascript:void(0)"  onClick={this.saveCart} className="color_333 bold fontSize_4 margin18 onlyLeftMargin pad12 onlyLeftPad border_black onlyLeftBorder"><span>{cq.label.DT_OD_CART_SAVE_CART_LINK}</span></Anchor> */}
    {emptyCartFlag === false &&
    <a
      onClick={onToggleClearCart}
      role="button"
      className="color_333"
    >
      {cqContent.label.DT_OD_CART_CLEAR_CART_LINK}</a>}
  </Col>
</Row>);


CartCTA.propTypes = {
  cartSaved: PropTypes.bool,
  accountMember: PropTypes.bool,
  onToggleContinueShopping: PropTypes.func,
  emptyCartFlag: PropTypes.bool,
  onToggleClearCart: PropTypes.func,
  cqContent: PropTypes.object,
};

export default CartCTA;
