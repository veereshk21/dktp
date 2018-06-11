import { Grid, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../../common/Loader/Loader';

import AsyncComponent from '../../common/AsyncComponent';

const OrderSummary = AsyncComponent(() => import('./OrderSummary'));
const ReviewDetails = AsyncComponent(() => import('./ReviewDetails'));
const ShippingBillingDetails = AsyncComponent(() => import('./ShippingBillingDetails'));

const accessoriesGuestConfirmation = (props) => {
  const { cqContent, asyncCallStatus, firstName, orderNumber, addressInfo, selectedShippingType, totalAccessories,
    dueToday, subTotal, tax, billingAddress, creditCardInfo, shippingPrice, shippingState, lastFour, giftCardAmount,
    totalDiscount } = props;
  return (
    <Grid fluid id="accessoriesGuestConfirmation">
      {asyncCallStatus.isFetching === true && <Loader />}

      <OrderSummary
        cqContent={cqContent}
        firstName={firstName}
        email={addressInfo.email}
        orderNumber={orderNumber}
        shippingDesc={selectedShippingType.shippingDesc}
      />

      <Row>
        <ReviewDetails
          cqContent={cqContent}
          accessoriesDetails={totalAccessories}
          dueToday={dueToday}
          subTotal={subTotal}
          tax={tax}
          shippingPrice={shippingPrice}
          shippingState={shippingState}
          giftCardAmount={giftCardAmount}
          totalDiscount={totalDiscount}
        />
      </Row>

      <Row>
        <ShippingBillingDetails
          cqContent={cqContent}
          addressInfo={addressInfo}
          billingAddress={billingAddress}
          creditCardInfo={creditCardInfo}
          selectedShippingType={selectedShippingType}
          lastFour={lastFour}
        />
      </Row>
    </Grid>
  );
};

accessoriesGuestConfirmation.propTypes = {
  cqContent: PropTypes.object,
  asyncCallStatus: PropTypes.object,
  firstName: PropTypes.string,
  orderNumber: PropTypes.string,
  addressInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  totalAccessories: PropTypes.array,
  dueToday: PropTypes.string,
  subTotal: PropTypes.string,
  tax: PropTypes.string,
  billingAddress: PropTypes.object,
  creditCardInfo: PropTypes.object,
  shippingPrice: PropTypes.number,
  shippingState: PropTypes.string,
  lastFour: PropTypes.string,
  giftCardAmount: PropTypes.string,
  totalDiscount: PropTypes.string,
};

export default accessoriesGuestConfirmation;
