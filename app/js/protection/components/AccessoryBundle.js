import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';

class AccessoryBundle extends React.Component {
  handleOptionChange(data) {
    let params;
    if (data !== null) {
      params = {
        skuId: data.skuID,
        displayName: data.displayName,
      };
    } else {
      params = null;
    }
    this.props.onBundleSelected(params);
  }

  toFixedLength(value) {
    const val = parseFloat(value);
    return val.toFixed(2);
  }

  render() {
    const { cqContent, defaultSelection } = this.props;
    return (
      <Row>
        <Col sm={12} md={12}>
          <Row>
            <Col sm={12} md={12}>
              <h2 className="pad18 onlyTopPad fontSize_7">
                {cqContent.label.DT_OD_PROTECTION_BUNDLE_TITLE}
              </h2>
              <h5 className="fontSize_4 margin10 onlyTopMargin">
                {cqContent.label.DT_OD_PROTECTION_BUNDLE_SUB_TITLE}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              {this.props.bundleData.map((item, index) => (
                <Row key={`item${index}`} className="border_black onlyBottomBorder pad30 noSidePad">
                  <Col sm={4} md={4} className="textAlignCenter">
                    <h3 className="pad12 onlyBottomPad fontSize_4" style={{ padding: '5px 36px 12px' }}>{item.displayName}</h3>
                    <img src={item.imgUrl} alt={item.displayName} />
                  </Col>
                  <Col sm={8} md={8}>
                    <Row className="noSidePad">
                      <Col sm={12} md={12}>
                        <Row>
                          <Col sm={10} md={10}>
                            <Row>
                              <RadioButton
                                name="BundleBuilder"
                                id={'Bundle' + index}
                                value={item.displayName}
                                containerClassName=" "
                                labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad width90"
                                checked={defaultSelection === item.skuID}
                                onChange={this.handleOptionChange.bind(this, item)}
                              >
                                <div className="fontSize_4">
                                  <p tabIndex={index} className="bold pad5 onlyTopPad">
                                    {item.displayName}
                                  </p>
                                </div>
                              </RadioButton>
                            </Row>
                          </Col>
                          <Col sm={2} md={2}>
                            <div className="pad5 onlyLeftPad">
                              {item.savedPrice > 0 ?
                                <div>
                                  <p className="fontSize_4 bold textRight">${this.toFixedLength(item.discountedPrice)}</p>
                                  <p className="textDecLineThrough fontSize_4 textRight">${this.toFixedLength(item.regularPrice)}</p>
                                </div>
                                :
                                <p className="bold fontSize_4 textRight">${this.toFixedLength(item.regularPrice)}</p>
                              }
                            </div>
                          </Col>
                        </Row>
                        {item.savedPrice > 0 &&
                          <Row>
                            <p style={{ padding: '30px 0 0 38px' }}>You will save <b>${item.savedPrice}</b> while purchasing this bundle. It includes:</p>
                          </Row>
                        }
                      </Col>
                    </Row>
                    <Row className="clearfix margin10 onlyTopMargin pad20 onlyLeftPad">
                      <Col sm={12} md={12}>
                        {item.bundleBreakdown.map((accessory, i) => (
                          <Row key={`acc${i}`} className={i > 0 ? 'positionRelative border_grayThree onlyTopBorder pad12 noSidePad clearfix' : 'positionRelative pad12 noSidePad clearfix'}>
                            <Col sm={12} md={12}>
                              <Row>
                                <Col sm={2} md={2}>
                                  <img src={accessory.skuDetails[0].imageUrl} width="100%" alt={accessory.displayName} />
                                </Col>
                                <Col sm={8} md={8}>
                                  <p className="pad24 onlyTopPad">{accessory.displayName}</p>
                                </Col>
                                <Col sm={2} md={2}>
                                  <div>
                                    {accessory.skuDetails[0].discountedPrice > 0 ?
                                      <div>
                                        <p className="bold textRight">${this.toFixedLength(accessory.skuDetails[0].discountedPrice)}</p>
                                        <p className="textDecLineThrough textRight">${this.toFixedLength(accessory.skuDetails[0].price)}</p>
                                      </div>
                                      :
                                      <p className="bold textRight">${this.toFixedLength(accessory.skuDetails[0].price)}</p>
                                    }
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
              <Row key={`item${this.props.bundleData.length}`} className="pad30">
                <Col xs={4} />
                <Col xs={8}>
                  <Row className="margin12 onlyLeftMargin">
                    <Col sm={12} md={12}>
                      <Row>
                        <RadioButton
                          name="BundleBuilder"
                          id={'Bundle' + this.props.bundleData.length}
                          value={cqContent.label.DT_OD_PROTECTION_BUNDLE_NO_THANKS_TEXT}
                          containerClassName=" "
                          labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad"
                          checked={!defaultSelection}
                          onChange={this.handleOptionChange.bind(this, null)}
                        >
                          <div className="fontSize_4">
                            <p className="bold pad5 onlyTopPad">
                              {cqContent.label.DT_OD_PROTECTION_BUNDLE_NO_THANKS_TEXT}
                            </p>
                          </div>
                        </RadioButton>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

AccessoryBundle.propTypes = {
  bundleData: PropTypes.array,
  onBundleSelected: PropTypes.func,
  cqContent: PropTypes.object,
  defaultSelection: PropTypes.string,
};

export default AccessoryBundle;
