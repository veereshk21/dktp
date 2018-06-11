import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Accordion } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';
import Items from './items';
import Shipping from './shipping';
import Taxes from './taxes';
import TradeIn from './tradeIn';
import PlanAccess from './planAccess';
import CPC from './cpc';
import TradeInBanner from './tradeInBanner';
import UpgradeFees from './upgradeFees';
import GiftCards from './giftCards';

const OrderAccordion = (props) => {
  const {
    standaloneAccessories, cqContent, tradeInDetails,
  } = props;

  return (
    <div className="orderSummary">
      <Row>
        <Col xs={standaloneAccessories ? 8 : 5} />
        <Col xs={3}>
          <p className="bold fontSize_5 textAlignRight">
            {props.isBTA ? cqContent.label.DT_OD_CHECKOUT_SUMMARY_HEADER_DUE_NEXT_BILL : cqContent.label.DT_OD_CHECKOUT_SUMMARY_HEADER_DUE_TODAY}
          </p>
        </Col>
        {!standaloneAccessories &&
          <Col xs={3}>
            <p className="bold fontSize_5 textAlignRight margin-6 onlyRightMargin">
              {cqContent.label.DT_OD_CHECKOUT_SUMMARY_HEADER_DUE_MONTHLY}
            </p>
          </Col>
        }
        <Col xs={1} aria-hidden />
      </Row >

      <Accordion>
        <Items
          cqContent={cqContent}
          standaloneAccessories={standaloneAccessories}
          devices={props.devices}
          accessories={props.accessories}
          accessoriesBundle={props.accessoriesBundle}
          subtotalDueToday={props.subtotalDueToday}
          depositAmount={props.depositAmount}
        />
        {!standaloneAccessories && props.displayUpgradeFee &&
          <UpgradeFees
            cqContent={cqContent}
            devices={props.devices}
            totalUpgradeFee={props.totalUpgradeFee}
          />
        }
        {!standaloneAccessories &&
          props.cpcOrder ?
          (<CPC
            cqContent={cqContent}
            plans={props.plans}
            showPlanCost={props.showPlanCost}
          />)
          :
          (props.plans && props.plans.items) &&
          (<PlanAccess
            cqContent={cqContent}
            plans={props.plans}
          />)
        }
        {tradeInDetails &&
          <TradeIn
            cqContent={cqContent}
            standaloneAccessories={standaloneAccessories}
            tradeInDetails={tradeInDetails}
          />
        }
        <Taxes
          cqContent={cqContent}
          standaloneAccessories={standaloneAccessories}
          taxes={props.taxes}
          totalOrderTax={props.totalOrderTax}
        />
        {props.showDeliveryMethod &&
          <Shipping
            cqContent={cqContent}
            standaloneAccessories={standaloneAccessories}
            shipping={props.shipping}
          />}
        {/* Total */}
        <div className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
          <SummaryRow
            description={<p className="fontSize_7">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TOTAL}</p>}
            dueToday={`$${props.dueToday}`}
            dueMonthly={`$${props.dueMonthly}`}
            isTitle
            accessoryFlow={standaloneAccessories}
          />
        </div>
        {props.showGiftCards &&
          <GiftCards
            cqContent={cqContent}
            plans={props.plans}
            showGiftCards={props.showGiftCards}
            giftCardList={props.giftCardList}
          />
        }
      </Accordion>

      {/* {!standaloneAccessories &&
        <p className="bold fontSize_5">
          {cqContent.label.DT_OD_CHECKOUT_SUMMARY_YOU_SAVE_PER_MONTH.replace('$AMOUNT$', 'XX.XX')}
        </p>
      } */}
      {tradeInDetails &&
        <TradeInBanner
          cqContent={cqContent}
          tradeInDetails={tradeInDetails}
        />
      }
      {!standaloneAccessories &&
        <p className="legal margin24 noSideMargin">
          {cqContent.label.DT_OD_CHECKOUT_SUMMARY_DUE_MONTHLY_DISCLAIMER}
        </p>
      }
    </div>
  );
};

OrderAccordion.propTypes = {
  isBTA: PropTypes.bool,
  cqContent: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  devices: PropTypes.object,
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  plans: PropTypes.object,
  shipping: PropTypes.object,
  taxes: PropTypes.array,
  dueToday: PropTypes.string,
  dueMonthly: PropTypes.string,
  tradeInDetails: PropTypes.object,
  subtotalDueToday: PropTypes.string,
  totalUpgradeFee: PropTypes.string,
  totalOrderTax: PropTypes.string,
  displayUpgradeFee: PropTypes.bool,
  depositAmount: PropTypes.string,
  cpcOrder: PropTypes.bool,
  showPlanCost: PropTypes.bool,
  showGiftCards: PropTypes.bool,
  giftCardList: PropTypes.array,
  showDeliveryMethod: PropTypes.bool,
};

export default OrderAccordion;
