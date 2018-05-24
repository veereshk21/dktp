import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';
import ToolTip from '../../../../common/ToolTip/index';
import Accessories from './accessories';
import StandaloneAccessories from './standaloneAccessories';


const ItemsAccordionItem = (props) => {
  const {
    devices, standaloneAccessories, cqContent,
  } = props;
  const deviceName = (device) => (<p><span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} /> {device.color && <span>in {device.color}</span>}</p>);

  const deviceFee = (device) => (
    <div>
      <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_ACTIVATION_FEE.replace('$AMOUNT$', device.activationFee)}</span>
      <ToolTip
        className="margin3 onlyLeftMargin displayInlineBlock"
        ariaLabel="Activation fee information tooltip"
        text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_ACTIVATION_FEE_TOOLTIP}
        noRenderHTML
      />
    </div>
  );
  return (
    <AccordionItem
      className="accordionItem border_black borderSize_4 onlyTopBorder pad6 onlyTopPad"
      expanded={standaloneAccessories}
    >
      <AccordionItemTitle>
        <SummaryRow
          description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_ITEMS}</p>}
          dueToday={`$${props.subtotalDueToday}`}
          dueMonthly={`$${devices.dueMonthly.toFixed(2)}`}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {devices.items && devices.items.map((device, index) => (
          <div className="margin24 onlyBottomMargin" key={`accordionDevice-${index}`}>
            <SummaryRow
              description={deviceName(device)}
              dueToday={`$${device.dueToday}`}
              dueMonthly={`$${device.dueMonthly}`}
              dueTodayDiscounted={device.dueTodayDiscounted}
              dueTodayOriginal={`$${device.dueTodayOriginal}`}
              dueMonthlyDiscounted={device.dueMonthlyDiscounted}
              dueMonthlyOriginal={`$${device.dueMonthlyOriginal}`}
              promotionsList={device.devicePromotionList}
            />

            {device.edgeUpBuyOutAmount > 0 &&
              <SummaryRow
                description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_EDGE_BUY_OUT}</p>}
                dueToday={`$${device.edgeUpBuyOutAmount.toFixed(2)}`}
                dueMonthly="-"
              />
            }

            {parseFloat(device.edgeItemDownPaymentAmount) > 0 &&
              <SummaryRow
                description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_DOWNPAYMENT}</p>}
                dueToday={`$${device.edgeItemDownPaymentAmount}`}
                dueMonthly="-"
              />
            }

            {device.optionalFeatures && device.optionalFeatures.map((feature, featureIndex) => (
              <SummaryRow
                key={`accordionOptionalFeatures-${featureIndex}`}
                description={<p>{feature.name}</p>}
                dueToday="-"
                dueMonthly={`$${feature.price}`}
                dueMonthlyDiscounted={feature.hasEcpdDiscount}
                dueMonthlyOriginal={`$${feature.originalPrice}`}
                promoMessage={feature.promoMessage}
              />))
            }

            {device.protectionFeature &&
              <SummaryRow
                description={<p>{device.protectionFeature.name}</p>}
                dueToday="-"
                dueMonthly={device.protectionFeature.price !== '-' ? `$${device.protectionFeature.price}` : '-'}
                dueMonthlyDiscounted={device.protectionFeature.price !== '-' && device.protectionFeature.originalPrice !== '-' && device.protectionFeature.hasEcpdDiscount}
                dueMonthlyOriginal={device.protectionFeature.originalPrice !== '-' && `$${device.protectionFeature.originalPrice}`}
                promoMessage={device.protectionFeature.promoMessage}
              />
            }

            {(device.flow === 'AAL' || device.flow === 'NSO') &&
              <SummaryRow
                description={deviceFee(device)}
                dueToday="-"
                dueMonthly="-"
              />
            }
          </div>
        ))}

        {parseFloat(props.depositAmount) > 0 &&
          <SummaryRow
            description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_DEPOSIT}</p>}
            dueToday={`$${props.depositAmount}`}
            dueMonthly="-"
          />
        }

        {standaloneAccessories ?
          (<StandaloneAccessories
            cqContent={cqContent}
            accessories={props.accessories}
          />)
          :
          (<Accessories
            cqContent={cqContent}
            accessories={props.accessories}
            accessoriesBundle={props.accessoriesBundle}
          />)
        }

      </AccordionItemBody>
    </AccordionItem>
  );
};

ItemsAccordionItem.propTypes = {
  devices: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  cqContent: PropTypes.object,
  subtotalDueToday: PropTypes.string,
  depositAmount: PropTypes.string,
};

export default ItemsAccordionItem;
