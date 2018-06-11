import React from 'react';
import PropTypes from 'prop-types';

const ContinueShoppingModal = (props) => {
  const { cqContent, onContinueShoppingHandler, allowEUP } = props;
  return (<div className="">
    <h2>{cqContent.label.DT_OD_CART_CONTINUE_SHOPPING_MODAL_TITLE}</h2>
    <p
      className="margin36 onlyTopMargin"
    >{cqContent.label.DT_OD_CART_CONTINUE_SHOPPING_MODAL_SUB_TEXT}
    </p>
    <div className="margin30 onlyTopMargin cartModalButtons">
      <button
        className="button primary margin5 onlyRightMargin addModalBtn"
        onClick={() => { onContinueShoppingHandler('aal'); }}
      >{cqContent.label.DT_OD_CART_ADD_DEVICE_CTA_TEXT}
      </button>
      {allowEUP === true && <button
        className="button primary addModalBtn"
        onClick={() => { onContinueShoppingHandler('eup'); }}
      >{cqContent.label.DT_OD_CART_UPGRADE_DEVICE_CTA_TEXT}
      </button>}
    </div>
  </div>);
};
ContinueShoppingModal.propTypes = {
  cqContent: PropTypes.object,
  onContinueShoppingHandler: PropTypes.func,
  allowEUP: PropTypes.bool,
};
export default ContinueShoppingModal;
