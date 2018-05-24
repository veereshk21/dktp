import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import ToolTip from './../../common/ToolTip/index';

const shippingWrapper = (props) => {
  const {
    data,
    cq,
  } = props;

  return (
    <section id="shippingOffers" className="pad8">
      {/* data.output.isFreeShipInStore &&
          <div className="shipping-offer icon-truck fontSize_3">
            <div className="fontSize_3 displayInlineBlock margin10 onlyTopMargin verticalTop">{cq.label.DT_OD_CART_FREESHIP_TITLE}</div>
            <div className="displayInlineBlock margin10 onlyTopMargin verticalTop">
              <ToolTip direction="top" className="margin3 onlyLeftMargin fontSize_4 font-icon_tooltip" header="" text={cq.html.DT_OD_CART_FREE_SHIP_STORE_PICKUP_TITLE}></ToolTip>
            </div>
          </div>
      */}
      {data.output.targetter.freeShippingText && data.output.targetter.freeShippingDesc &&
      <Row className="pad5 onlyBottomPad fontSize_3">
        <Col xs={2}>
          <span className="shipping-offer icon-truck width100" />
        </Col>
        <Col className="margin10 onlyTopMargin" xs={10} >
          <section>
            <span className="fontSize_3">{data.output.targetter.freeShippingText}</span>
            <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.freeShippingDesc} />
          </section>
        </Col>
      </Row>
      }

      {data.output.targetter.nextDayText && data.output.targetter.nextDayDesc &&
      <Row className="clearfix pad5 onlyBottomPad fontSize_3">
        <Col xs={2}>
          <span className="shipping-offer icon-truck width100" />
        </Col>
        <Col xs={10}>
          <span>{cq.label.DT_OD_CART_NEXT_DAY_TITLE}</span>
          <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.nextDayDesc} />
        </Col>
      </Row>
      }

      {/* data.output.isSameDayDelivery && <Row xs={12} sm={12} md={12} lg={12} className="clearfix shipping-offer icon-package fontSize_3">
          <Col className="floatRight pad10 noSidePad"  xs={9} sm={9} md={9} lg={9}>
              <span>{cq.label.DT_OD_CART_SAME_DAY_DELIVERY}</span>
              <ToolTip direction="top" className="margin3 onlyLeftMargin fontSize_4  font-icon_tooltip" header="" text={cq.html.DT_OD_CART_SAME_DAY_DELIVERY}></ToolTip>
          </Col>
        </Row> */}

      {data.output.targetter.contentText && data.output.targetter.contentDesc &&
      <Row xs={12} className="clearfix pad5 onlyBottomPad fontSize_3">
        <Col xs={2}>
          <span className="shipping-offer icon-content-transfer width100" />
        </Col>
        <Col className="margin10 onlyTopMargin" xs={10}>
          <span>{data.output.targetter.contentText}</span>
          <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.contentDesc} />
        </Col>
      </Row>
      }

      {data.output.targetter.returnPolicyText && data.output.targetter.returnPolicyDesc &&
      <Row xs={12} className="clearfix pad5 onlyBottomPad fontSize_3">
        <Col xs={2}>
          <span className="shipping-offer icon-return-policy width100" />
        </Col>
        <Col className="margin10 onlyTopMargin" xs={10}>
          <section>
            <span>{data.output.targetter.returnPolicyText}</span>
            <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.returnPolicyDesc} />
          </section>
        </Col>
      </Row>
      }

      {/* data.output.isTransferContent && <Row xs={12} sm={12} md={12} lg={12} className="clearfix shipping-offer icon-transfer fontSize_3 pad12 onlyBottomPad">
            <Col className="floatRight pad5 noSidePad" xs={9} sm={9} md={9} lg={9}>
                <span>{cq.label.DT_OD_CART_TRANSFER_CONTENT_TITLE}</span>
                <ToolTip direction="top" className="margin3 onlyLeftMargin fontSize_4  font-icon_tooltip" header="" text={cq.html.DT_OD_CART_TRANSFER_CONTENT_TITLE}></ToolTip>
            </Col>
        </Row> */}
    </section>
  );
};

shippingWrapper.propTypes = {
  data: PropTypes.object,
  cq: PropTypes.object,
};

export default shippingWrapper;
