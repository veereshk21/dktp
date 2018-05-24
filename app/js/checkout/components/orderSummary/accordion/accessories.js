import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import SummaryRow from './summaryRow';

const Accessories = (props) => {
  const {
    accessories, accessoriesBundle, cqContent,
  } = props;

  return (
    <div>
      {/* Accessories and Bundled Accessories */}
      {((accessories && accessories.length > 0) || (accessoriesBundle && accessoriesBundle.length > 0)) &&

        <Row>
          <Col xs={6}>
            <p className="bold">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_ACCESSORIES}</p>
          </Col>
        </Row>
      }
      <div>
        {accessories.map((accessory, index) => (
          <div key={`accessory-${index}`}>
            <SummaryRow
              description={<p dangerouslySetInnerHTML={{ __html: accessory.name }} />}
              dueToday={`$${accessory.price}`}
              dueTodayDiscounted={accessory.discounted}
              dueTodayOriginal={<strong>${accessory.wasPrice}</strong>}
              promoMessage={
                accessory.discounted &&
                <div className="margin-6 onlyLeftMargin positionRelative">
                  <p className="margin6 onlyTopMargin">
                    <span className="font-icon_tag pad24 onlyRightPad" />
                    <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.discountPercentage)}</span>
                  </p>
                </div>}
            />

          </div>
        ))}
        {accessoriesBundle.map((accessory, index) => (
          <div key={`accessoryBundle-${index}`}>
            <SummaryRow
              description={<p dangerouslySetInnerHTML={{ __html: accessory.displayName }} />}
              dueToday={`$${accessory.discounted ? accessory.discountedPrice : accessory.regularPrice}`}
              dueTodayDiscounted={accessory.discounted}
              dueTodayOriginal={<strong>${accessory.regularPrice}</strong>}
              promoMessage={
                accessory.discounted &&
                <div className="margin-6 onlyLeftMargin positionRelative">
                  <p className="margin6 onlyTopMargin">
                    <span className="font-icon_tag pad24 onlyRightPad" />
                    <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.discountPercentage)}</span>
                  </p>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Accessories.propTypes = {
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  cqContent: PropTypes.object,
};

export default Accessories;
