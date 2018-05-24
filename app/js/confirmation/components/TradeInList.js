import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

class TradeListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { featureTypeText: 'Show', featureTypeCSS: 'hide', displayFeatureType: false };
  }

DeviceListFeatureData = (e) => {
  e.preventDefault();
  this.setState({ displayFeatureType: !this.state.displayFeatureType });

  if (this.state.featureTypeText === 'Show') {
    this.setState({ featureTypeText: 'Hide' });
    this.setState({ featureTypeCSS: 'block' });
  } else {
    this.setState({ featureTypeText: 'Show' });
    this.setState({ featureTypeCSS: 'hide' });
  }
}

print(e) {
  e.preventDefault();
  window.print();
}
render() {
  const {
    cqKeys,
    tradeInList,
  } = this.props;
  const imageWidthHeight = '&wid=110&hei=130';
  return (
    <section className="tradeInContainer">
      <h1 className="pad10 noSidePad">{cqKeys.label.DT_OD_CONFIMARTION_TRADE_IN_TITLE}</h1>
      {tradeInList.map((tradeInItem, i) => {
        const deviceName = `${tradeInItem.deviceBrand ? tradeInItem.deviceBrand : ''} ${tradeInItem.displayName ? tradeInItem.displayName : ''}`;
        return (
          <Row key={i}>
            <Col md={2} lg={2} >
              {tradeInItem.modelImage && <div className="textAlignLeft">
                <img src={`${tradeInItem.modelImage}${imageWidthHeight}`} alt={tradeInItem.displayName} />
              </div>}
            </Col>

            <Col md={10} lg={10} >
              <section>
                {cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_SHIPPING_INFO}
                <section className="margin12 noSideMargin">
                  <Row>
                    <Col md={3} lg={3} >
                      <div className="bold textAlignLeft">
                        {cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_DEVICE_TITLE}
                      </div>
                      <div className="bold textAlignLeft margin10 noSideMargin" dangerouslySetInnerHTML={{ __html: deviceName }} />
                    </Col>
                    <Col md={3} lg={3} >
                      <div className="bold textAlignLeft">
                        {cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_MARKET_TITLE}
                      </div>
                      <div className="bold textAlignLeft margin10 noSideMargin">
                        {tradeInItem.originalAppraisalPrice ? '$' + tradeInItem.originalAppraisalPrice : '--'}
                      </div>
                    </Col>
                    <Col md={3} lg={3} >
                      <div className="bold textAlignLeft">
                        {cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_PROMOTIONAL_TITLE}
                      </div>
                      <div className="bold textAlignLeft margin10 noSideMargin">
                        {tradeInItem.originalAppraisalPrice > 0 && tradeInItem.tradeInCredit > tradeInItem.originalAppraisalPrice ? '$' + tradeInItem.tradeInCredit : '--'}
                      </div>
                    </Col>
                    <Col md={3} lg={3} >
                      <div className="bold textAlignLeft">
                        {cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_SUBMISSION_TITLE}
                      </div>
                      <div className="bold textAlignLeft margin10 noSideMargin">
                        {tradeInItem.submissionId ? tradeInItem.submissionId : '--'}
                      </div>
                    </Col>
                    <Col md={12} lg={12} >
                      <div className="clearfix" />
                      {tradeInItem.maxPrice &&
                        <div>
                          {cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_APPRAISED_VZW_VALUE}${tradeInItem.maxPrice}
                        </div>
                      }
                      {tradeInItem.maxPrice &&
                        <div className="pad20 onlyTopPad">
                          {cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_TOTAL_APPRAISED_VZW_VALUE}${tradeInItem.maxPrice}
                        </div>
                      }
                      <p>{cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_CONDITION}</p>
                    </Col>
                  </Row>
                </section>
              </section>
            </Col>
            <Col md={12} lg={12}>
              <div className="bold margin10 noSideMargin">
                <a
                  href="d"
                  onClick={this.print.bind(this)}
                  target="_blank"
                  className="textDecUnderline margin10 onlyRightMargin"
                ><span dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_PRINT_RECEIPT }} />
                </a>
                <a
                  href=" /support/transfer-contacts-and-media/"
                  target="_blank"
                  className="textDecUnderline margin10 onlyRightMargin"
                ><span dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_MORE }} />
                </a>
                <a
                  href=" /support/transfer-contacts-and-media/"
                  target="_blank"
                  className="textDecUnderline margin10 onlyRightMargin"
                ><span dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIRMATION_TRADE_IN_FAQ }} />
                </a>
              </div>
            </Col>
          </Row>);
      })
      }
    </section>
  );
}
}

TradeListWrapper.propTypes = {
  cqKeys: PropTypes.object,
  tradeInList: PropTypes.array,
};

export default TradeListWrapper;

