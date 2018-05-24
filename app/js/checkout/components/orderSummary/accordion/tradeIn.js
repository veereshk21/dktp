import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';

const deviceName = (device) => (
  <p className="bold">
    {device.deviceBrand && <span dangerouslySetInnerHTML={{ __html: device.deviceBrand }} />}
    <span dangerouslySetInnerHTML={{ __html: device.displayName }} />
    {device.size && <span> {device.size} </span>}
    {device.color && <span>in {device.color}</span>}
  </p>
);

const TradeInAccordionItem = (props) => {
  const {
    standaloneAccessories, cqContent,
  } = props;

  return (
    <AccordionItem className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <AccordionItemTitle>
        <SummaryRow
          description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN}</p>}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {props.tradeInDetails.tradeInDevices.map((device, index) => (
          <div key={`tradein-${index}`}>
            <Row>
              <Col xs={11}>
                <div className="margin12 onlyTopMargin">
                  {deviceName(device)}
                </div>
                <div className="margin6 noSideMargin">
                  <p>
                    <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN_MARKET_VALUE}&nbsp;${device.originalAppraisalPrice}</span>
                  </p>
                </div>
                {(device.originalAppraisalPrice > 0 && device.tradeInCredit > device.originalAppraisalPrice) &&
                  <div className="margin6 noSideMargin">
                    <p>
                      <span className="">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN_PROMOTIONAL_VALUE} </span>
                      <span>${device.tradeInCredit}</span>
                    </p>
                  </div>
                }
              </Col>
            </Row >
          </div>
        ))}
      </AccordionItemBody>
    </AccordionItem>

  );
};

TradeInAccordionItem.propTypes = {
  standaloneAccessories: PropTypes.bool,
  cqContent: PropTypes.object,
  tradeInDetails: PropTypes.object,
};

export default TradeInAccordionItem;
