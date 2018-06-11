import React from 'react';
import PropTypes from 'prop-types';
// import { Row, Col } from 'react-flexbox-grid';
import ItemHeader from './ItemHeader';
import TradeInDevice from './TradeInDevice';
import TradeInPromoDetails from './TradeInPromoDetails';
import ItemWrapper from './ItemWrapper';

import AsyncComponent from '../../common/AsyncComponent';

const Devices = AsyncComponent(() => import('./Devices'));
const PlanInfo = AsyncComponent(() => import('./PlanInfo'));
const RecommendedAccesoriesWrapper = AsyncComponent(() => import('./../containers/RecommendedAccessoriesWrapper'));
const StandAloneAccessoriesWrapper = AsyncComponent(() => import('./../containers/StandAloneAccessoriesWrapper'));

const DeviceDetails = (props) => {
  const {
    cqContent, items, protectionURL, plans, tradeInPromoEligible, tradeInPromoDetails, removeTradeInDeviceFromCart,
    tradeInUrl, clearCart, cpcSucessful, removeDevice, accessoriesBundle, accessories, standaloneAccessories,
    isNSOFlow, recommendedAccessories, tmpMd, emptyCartFlag, itemOnJaxPlan, autoPayApplied, authenticated } = props;
  const { isFetching, error, data } = recommendedAccessories;
  const isStatndAlAccessorieExist = ((accessories && accessories.length > 0) ||
    accessoriesBundle);
  const isPlansExists = (plans && plans.items.length > 0);
  const showTmpMdPriceIndex = 0;
  let tapIndex = 0;
  let tapExistIndex = 0;
  let nonNSODevices = 0;
  return (
    <div>{emptyCartFlag === false && <div>
      {items && items.map((deviceInfo, id) => (
        <ItemWrapper key={'device-' + id}>
          <ItemHeader
            title={`Device ${id + 1}`}
            cqContent={cqContent}
          >
            <Devices
              key={id}
              showTmpMdPrice={tmpMd && !deviceInfo.protectionOption && showTmpMdPriceIndex + 1}
              hideTmpMdPrice={tmpMd && !deviceInfo.protectionOption && showTmpMdPriceIndex > 1 && true}
              accessories={accessories}
              totalDevices={items.length}
              cqContent={cqContent}
              protectionURL={protectionURL}
              deviceInfo={deviceInfo}
              clearCart={clearCart}
              cpcSucessful={cpcSucessful}
              removeDevice={removeDevice}
              tapIndex={(deviceInfo.flow !== 'NSO' && !deviceInfo.protectionOption) ? (tapIndex += 1) : tapIndex}
              tapExistIndex={(deviceInfo.flow !== 'NSO' && deviceInfo.protectionOption && deviceInfo.protectionOption.featureType === 'SPO') ? (tapExistIndex += 1) : tapExistIndex}
              tmpMd={tmpMd}
              index={deviceInfo.flow !== 'NSO' && (nonNSODevices += 1)}
              authenticated={authenticated}
            />
          </ItemHeader>
        </ItemWrapper>
      ))
      }

      {cpcSucessful === true && isPlansExists === true &&
        <ItemWrapper>
          <ItemHeader
            title={cqContent.label.DT_OD_CART_PLAN_TITLE}
            cqContent={cqContent}
          >
            {plans !== null && <PlanInfo plans={plans} cqContent={cqContent} itemOnJaxPlan={itemOnJaxPlan} autoPayApplied={autoPayApplied} />}
          </ItemHeader>
        </ItemWrapper>
      }

      {isStatndAlAccessorieExist &&
        <ItemWrapper>
          <ItemHeader
            title={cqContent.label.DT_OD_CART_ACCESSORIES_TITLE}
            cqContent={cqContent}
            standaloneAccessories={standaloneAccessories}
          >
            <StandAloneAccessoriesWrapper />
          </ItemHeader>
        </ItemWrapper>
      }
      {/* <ItemWrapper>
        <ItemHeader
          cqContent={cqContent}
          standaloneAccessories={standaloneAccessories}
        >
          <Row>
            <Col xsOffset={2} xs={10}>
              <Row end="xs">
                <Col
                  xs={7}
                  className="bold fontSize_9"
                >
                  Subtotal
                </Col>
                <Col xs={5}>
                  <Row center="xs">
                    { standaloneAccessories ?
                      <Col xs={6} /> :
                      <Col
                        xs={6}
                        className="bold fontSize_9"
                      >
                        ${props.totalDueMonthly}
                      </Col>
                    }
                    <Col
                      xs={6}
                      className="bold fontSize_9"
                    >
                      ${props.rawSubTotalDueToday}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </ItemHeader>
      </ItemWrapper> */}
      {standaloneAccessories === false && isNSOFlow === false &&
        <ItemWrapper>
          {tradeInPromoEligible === true && tradeInPromoDetails === null ?
            <TradeInDevice cqContent={cqContent} tradeInUrl={tradeInUrl} />
            :
            <TradeInPromoDetails
              tradeInPromoDetails={tradeInPromoDetails}
              tradeInUrl={tradeInUrl}
              cqContent={cqContent}
              removeTradeInDeviceFromCart={removeTradeInDeviceFromCart}
            />
          }
        </ItemWrapper>
      }

      {(isFetching === false && Object.keys(data).length > 0 && (data.output.recommendedAccessoriesDetails && data.output.recommendedAccessoriesDetails.length > 0)) && error === false &&
        <ItemWrapper>
          <RecommendedAccesoriesWrapper />
        </ItemWrapper>
      }

    </div>}</div>
  );
};
DeviceDetails.propTypes = {
  cqContent: PropTypes.object,
  items: PropTypes.array,
  protectionURL: PropTypes.string,
  plans: PropTypes.object,
  tradeInPromoEligible: PropTypes.bool,
  tradeInPromoDetails: PropTypes.oneOfType([PropTypes.object, null]),
  tradeInUrl: PropTypes.string,
  clearCart: PropTypes.func,
  cpcSucessful: PropTypes.bool,
  removeDevice: PropTypes.func,
  accessoriesBundle: PropTypes.oneOfType([PropTypes.array, null]),
  accessories: PropTypes.oneOfType([PropTypes.array, null]),
  standaloneAccessories: PropTypes.bool,
  isNSOFlow: PropTypes.bool,
  recommendedAccessories: PropTypes.object,
  tmpMd: PropTypes.object,
  emptyCartFlag: PropTypes.bool,
  removeTradeInDeviceFromCart: PropTypes.func,
  itemOnJaxPlan: PropTypes.bool,
  autoPayApplied: PropTypes.bool,
  authenticated: PropTypes.bool,
  // totalDueMonthly: PropTypes.string,
  // rawSubTotalDueToday: PropTypes.string,
};
export default DeviceDetails;
