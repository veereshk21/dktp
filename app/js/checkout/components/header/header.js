import React from 'react';
import PropTypes from 'prop-types';
import PromoBanners from './promoBanners';

const Header = (props) => (
  <div className="pad24 background_black">
    <h1 className="color_FFF margin20 onlyBottomMargin"> {props.cqContent.label.DT_OD_CHECKOUT_SUCCESS_MAIN_TITLE} </h1>
    <p className="color_FFF margin20 noSideMargin fontSize_6">{props.cqContent.label.DT_OD_CHECKOUT_ALMOST_DONE_NOTIFICATION}</p>
    <hr className="margin48 noSideMargin" aria-hidden />
    <PromoBanners {...props} />
  </div>
);

Header.propTypes = {
  cqContent: PropTypes.object,
};
export default Header;
