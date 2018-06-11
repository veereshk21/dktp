import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { parsePrice } from './../../common/Helpers';
import AmountComponent from './DevicePriceComponents/AmountComponent';
import DueItemList from './DevicePriceComponents/DueItemList';
import AsyncComponent from '../../common/AsyncComponent';
import EditButton from '../../common/EditButton/index';

const CartZipCode = AsyncComponent(() => import('./../containers/CartZipCode'));

class DevicePriceWrapper extends Component {
  onChangeLocation = (e) => {
    e.preventDefault();
    // hashHistory.push('/enterZip');
    this.props.toggleEnterZip({ isEnterZipDisplay: true });
  }

  removePromoCodeEvent = (promoCode, event) => {
    event.preventDefault();
    /** TODO:An ajax call to determine new prices */
    this.props.removePromoCode(promoCode);
  }

  render() {
    const {
      cartData,
      cq,
      isEnterZipDisplay,
      cpc,
      // asyncCallStatus,
    } = this.props;
    const { taxDetails, promotionList } = cartData;
    return (
      <section id="prices" className="costSummary_section pad18 onlyBottomPad">
        <div className="fontSize_5">

          {/* itemData && itemData.map((item, i) => (<Row key={i} xs={12} sm={12} md={12} lg={12} className={`clearfix pad10 noSidePad dueTodayBreakDown ${(i > 0 ? 'pad12 noSidePad border_grayThree onlyTopBorder' : 'pad12 noSidePad')}`}>
                <Col xs={9} sm={9} md={9} lg={9} className="floatLeft textLeft bold">{cq.label.DT_OD_CART_SUB_TOTAL_TODAY_TITLE}</Col>
                <Col xs={3} sm={3} md={3} lg={3} className="floatRight textRight">$90.00</Col>
          </Row>)) */}
          {cartData.rawSubTotalDueToday &&
            <section className="section group">
              <Row className="clearfix margin12 onlyTopMargin">
                <Col className="floatLeft textLeft bold" lg={8} md={8}>
                  {cq.label.DT_OD_CART_SUB_TOTAL_DUE_TODAY}
                </Col>
                <Col className="floatRight textAlignRight" lg={4} md={4}>
                  ${cartData.rawSubTotalDueToday}
                </Col>
              </Row>
            </section>
          }
          {!cartData.accGuestCheckoutEnabled &&
            <section className="section group">
              {!isEnterZipDisplay && taxDetails &&
                <Row className="clearfix margin12 onlyTopMargin">
                  <Col className="floatLeft textLeft" md={9} lg={9}>
                    <div className="nowrap bold">
                      {cq.label.DT_OD_CART_DUE_TODAY_EST_GOV_SALES_TAX}
                    </div>
                    <div>
                      <p className="fontSize_4">for&nbsp;<span>{taxDetails.cityStateString}</span>
                        <EditButton onClick={this.onChangeLocation} />
                      </p>
                    </div>
                  </Col>
                  <Col className="floatRight textRight" id="estimateTax" md={3} lg={3}><div id="taxPrice">${taxDetails.taxPrice}</div></Col>
                </Row>
              }
              {isEnterZipDisplay && <CartZipCode />}
            </section>
          }
          {cartData.ecpdDueTodayDiscountedAmount > 0 &&
            <section className="section group">
              <Row className="clearfix margin12 onlyTopMargin">
                <Col className="floatLeft textLeft bold" lg={8} md={8}>
                  {cq.label.DT_OD_CART_EMPLOYEE_DISCOUNT}
                </Col>
                <Col className="floatRight textAlignRight" lg={4} md={4}>
                  - ${cartData.ecpdDueTodayDiscountedAmount}
                </Col>
              </Row>
            </section>
          }
          {promotionList && promotionList.map((promo, i) => (<section className="section group pad10 noSidePad">
            {promo.promoMsg && <Row key={i} xs={12} sm={12} md={12} lg={12} className="clearfix">
              <Col xs={8} sm={8} md={8} lg={8} className="floatLeft textLeft bold">{promo.promoMsg}</Col>
              <Col xs={4} sm={4} md={4} lg={4} className="floatRight textRight">-${promo.promoAmount}</Col>
            </Row>}
            {promo.barcode && <div className="">
              <p onClick={this.removePromoCodeEvent.bind(null, promo.barcode)} className="fontSize_2 pad5 textunderline pointer">{cq.label.DT_OD_CART_MAIN_REMOVE_CTA}</p>
            </div>}
          </section>))}
          {cartData.overallDiscountedAmount > 0 &&
            <section className="section group">
              <Row className="clearfix margin12 onlyTopMargin">
                <Col className="floatLeft textLeft bold" lg={8} md={8}>
                  {cq.label.DT_OD_CART_OVERALL_DISCOUNT}
                </Col>
                <Col className="floatRight textAlignRight" lg={4} md={4}>
                  - ${cartData.overallDiscountedAmount}
                </Col>
              </Row>
            </section>
          }
          {parsePrice(cartData.totalEdgeOrderDownPayment) > 0 &&
            <AmountComponent label={cq.label.DT_OD_CART_DOWN_PAYMENT_TEXT} amount={cartData.totalEdgeOrderDownPayment} />
          }
          {parsePrice(cartData.totalEdgeUpAmount) > 0 &&
            <AmountComponent label={cq.label.DT_OD_CART_OUTSTANDING_BALANCE_TEXT} amount={cartData.totalEdgeUpAmount} />
          }
          {parsePrice(cartData.totalEdgeUpBuyOutAmount) > 0 &&
            <AmountComponent label={cq.label.DT_OD_CART_KEEP_PAYMENT_TEXT} amount={cartData.totalEdgeUpBuyOutAmount} />
          }
          {cartData.isSameDayDelivery &&
            <Row className="clearfix pad10 noSidePad" id="sameDayShip">
              <Col className="floatLeft textLeft bold" md={8} lg={8}>
                <span>{cq.label.DT_OD_CART_SAME_DAY_SHIP_TITLE}</span>
              </Col>
              <Col className="floatRight textRight" md={4} lg={4}><div id="sameDayShipPrice">$60.00</div></Col>
            </Row>
          }
        </div>

        <div className="fontSize_8 margin24 onlyTopMargin">
          {cartData.ecpdDueMonthlySavings > 0 &&
            <DueItemList label={cq.label.DT_OD_CART_EMPLOYEE_MONTHLY_SAVINGS} amount={cartData.ecpdDueMonthlySavings} />
          }
          {cartData.totalDueToday &&
            <DueItemList label={cq.label.DT_OD_CART_DUE_TODAY_TITLE} amount={cartData.totalDueToday} />
          }
          {cartData.overallDueMonthly && (!cartData.standaloneAccessories && !cartData.accGuestCheckoutEnabled) ?
            <DueItemList label={cq.label.DT_OD_CART_DUE_MONTHLY_TITLE} amount={cartData.overallDueMonthly} />
            :
            <section className="section group">
              {cartData.totalDueMonthly && (!cartData.standaloneAccessories && !cartData.accGuestCheckoutEnabled) &&
                <DueItemList label={cq.label.DT_OD_CART_DUE_DEVICE_MONTHLY_TITLE} amount={cartData.totalDueMonthly} />
              }
              {cartData.plans && cpc &&
                <DueItemList label={cq.label.DT_OD_CART_DUE_PLAN_MONTHLY_TITLE} amount={cartData.plans.planOnlyDueMonthly} />
              }
            </section>
          }
          {(!cartData.standaloneAccessories && !cartData.accGuestCheckoutEnabled) &&
            <div>
              <Row>
                <Col
                  xs={1}
                  style={{ marginRight: '-8px' }}
                >
                  *
                </Col>
                <Col xs={10}>
                  <div className="finePrint fontSize_2">{cq.html.DT_OD_CART_ESTIMTD_TAX_TIP}</div>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={1}
                  style={{ marginRight: '-8px' }}
                >
                  *
                </Col>
                <Col xs={10}>
                  <div className="finePrint arial fontSize_2">{cq.label.DT_OD_CART_BILL_NOTE_TITLE}</div>
                </Col>
              </Row>
            </div>
          }
        </div>
      </section>
    );
  }
}

DevicePriceWrapper.propTypes = {
  cartData: PropTypes.object,
  cpc: PropTypes.bool,
  cq: PropTypes.object,
  toggleEnterZip: PropTypes.func,
  removePromoCode: PropTypes.func,
  isEnterZipDisplay: PropTypes.bool,
  // asyncCallStatus: PropTypes.object,
};

export default DevicePriceWrapper;
