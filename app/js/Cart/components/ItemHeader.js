import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const ItemHeader = (props) => {
  const {
    title, showPricingTitles, children, cqContent,
  } = props;
  return (
    <div className="pad12">
      <div className="border_e6 onlyBottomBorder margin24 onlyBottomMargin">
        <Row bottom="xs">
          <Col xs={2}>
            <Row bottom="xs">
              <Col xs={12}>
                <div className=" noSideMargin">
                  <h2 className="fontSize_10">{title}</h2>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={10}>
            <Row bottom="xs">
              {showPricingTitles === true && <Col xsOffset={7} xs={5}>
                <Row bottom="xs">
                  { props.standaloneAccessories ?
                    <Col xs={6} className="textAlignCenter" /> :
                    <Col md={6} lg={6} className="textAlignCenter">
                      <span className="bold fontSize_4">{cqContent.label.DT_OD_CART_DUE_MONTHLY_TEXT}</span>
                    </Col>
                  }
                  <Col md={6} lg={6} className="textAlignCenter">
                    <span className="bold fontSize_4">{cqContent.label.DT_OD_CART_DUE_TODAY_TEXT}</span>
                  </Col>
                </Row>
              </Col>}
            </Row>
          </Col>
        </Row>
      </div>
      {children}
    </div>
  );
};

ItemHeader.defaultProps = {
  showPricingTitles: true,
};

ItemHeader.propTypes = {
  title: PropTypes.string,
  showPricingTitles: PropTypes.bool,
  cqContent: PropTypes.object,
  children: PropTypes.element.isRequired,
  standaloneAccessories: PropTypes.bool,
};

export default ItemHeader;
