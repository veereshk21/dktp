import React from 'react';
import PropTypes from 'prop-types';

import AsyncComponent from '../../common/AsyncComponent';

/* Page Components */
import OrderSummary from './orderSummary/orderSummary';
import SaveContent from './saveContent/saveContent';

/* Page Containers */
import Header from '../containers/header/header';

const InfoGrid = AsyncComponent(() => import('../containers/infoGrid/infoGrid'));

const Confirmation = (props) => {
  const {
    cqContent,
  } = props;

  return (
    <div>
      <div className="margin20 onlySideMargin">
        <Header />
        {!props.standaloneAccessories &&
          <SaveContent cqContent={cqContent} />
        }
        <InfoGrid />
        <OrderSummary {...props} />
        <div className="textAlignLeft margin10 noSideMargin color_666">
          <p className="bold">{cqContent.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER}</p>
          <p className="">{cqContent.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER_DETAILS}</p>
        </div>
      </div>

    </div>
  );
};

Confirmation.propTypes = {
  cqContent: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  // devices: PropTypes.object,
  // accessories: PropTypes.array,
  // billingInfo: PropTypes.object,
  // transformedTradeInPromoDetails: PropTypes.object,
  // selectedShippingType: PropTypes.object,
};

export default Confirmation;
