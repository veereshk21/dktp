import React from 'react';
import PropTypes from 'prop-types';
import tradeinIcon from '../../../../../images/recycle.svg';

const PlanAccessAccordionItem = (props) => (
  <div>
    {props.tradeInDetails.tradeInDevices.map((device, index) => (
      <div
        key={`tradein-${index}`}
        className="border_black margin20 pad20 clearfix"
      >
        <div className="floatLeft">
          <img className="height60 margin10 noSideMargin" src={tradeinIcon} alt="Trade In Device" />
        </div>
        <div className="margin78 noSidePad onlyLeftMargin pad15">
          <p className="bold displayInline fontSize_6">{props.cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN_APPRAISED_VALUE.replace('$AMOUNT$', device.tradeInCredit)}</p>
        </div>
      </div>
    ))}
  </div>
);

PlanAccessAccordionItem.propTypes = {
  cqContent: PropTypes.object,
  tradeInDetails: PropTypes.object,
};

export default PlanAccessAccordionItem;
