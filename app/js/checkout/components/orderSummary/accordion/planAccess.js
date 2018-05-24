import React from 'react';
import PropTypes from 'prop-types';
import SummaryRow from './summaryRow';

const PlanAccessAccordionItem = (props) => {
  const {
    plans, cqContent,
  } = props;

  return (
    <div className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <div>
        <SummaryRow
          description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PHONE_PLAN_ACCESS}</p>}
          isTitle
        />
      </div>
      <div>
        {plans && plans.items && plans.items.map((plan, planIndex) => (
          (plan.lineAccessCharges && plan.lineAccessCharges.map((lac, lacIndex) => (
            <div key={`lac-${planIndex}-${lacIndex}`}>
              <SummaryRow
                description={<p dangerouslySetInnerHTML={{ __html: `${lac.name ? lac.name : ''}` }} />}
                dueToday="-"
                dueMonthly={`$${lac.price}`}
                dueMonthlyDiscounted={lac.hasEcpdDiscount}
                dueMonthlyOriginal={`$${lac.wasPrice}`}
                promoMessage={lac.promoMessage}
              />
            </div>
          )))
        ))}
      </div>
    </div>

  );
};

PlanAccessAccordionItem.propTypes = {
  plans: PropTypes.object,
  cqContent: PropTypes.object,
};

export default PlanAccessAccordionItem;
