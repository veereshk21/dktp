import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import ToolTip from './../../common/ToolTip';
import SelectListItem from './SelectListItem';
import { normalizePhoneNumber } from './../../common/validation';

const onDeviceListFeatureData = (_self, elId, e) => {
  e.preventDefault();
  const items = _self.state.toggler;
  items[elId].displayFeatureType = !items[elId].displayFeatureType;
  if (items[elId].featureTypeText === 'Show') {
    items[elId].featureTypeText = 'Hide';
    items[elId].featureTypeCSS = 'Show';
  } else {
    items[elId].featureTypeText = 'Show';
    items[elId].featureTypeCSS = 'Hide';
  }
  _self.setState({
    items,
  });
};
/* eslint-disable arrow-body-style */
class DeviceListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: [],
    };
  }
  render() {
    const {
      cqKeys,
      devices,
      deviceConfigInfo,
    } = this.props;
    const imageWidthHeight = '&wid=110&hei=130';
    const deviceConfigInfoDevices = deviceConfigInfo && deviceConfigInfo.devices;
    return (
      <section className="">
        {
          devices && devices.items && devices.items.map((deviceDetails, id) => {
            const eleObj = {};
            eleObj.featureTypeText = 'Show';
            eleObj.featureTypeCSS = 'hide';
            eleObj.displayFeatureType = false;
            eleObj.eleId = id;
            this.state.toggler.push(eleObj);
            return (<Row key={deviceDetails.id} className="margin20 onlyBottomMargin">
              <Col md={2} lg={2} >
                {deviceDetails.deviceImageUrl &&
                  <div className="textAlignCenter">
                    <img src={`${deviceDetails.deviceImageUrl}${deviceDetails.deviceImageUrl.indexOf('?') === -1 ? '?' + imageWidthHeight : imageWidthHeight}`} alt={deviceDetails.deviceName} />
                    {(deviceConfigInfoDevices && ((deviceConfigInfoDevices[id].flow === 'AAL' || deviceConfigInfoDevices[id].flow === 'NSO') && deviceConfigInfoDevices[id].npaNxxnumber)) ?
                      <p className="color_666">{deviceConfigInfoDevices[id].npaNxxnumber}</p>
                      :
                      ''
                    }
                    {(deviceConfigInfoDevices && (deviceConfigInfoDevices[id].flow === 'EUP' && deviceConfigInfoDevices[id].mtnNumber)) ?
                      <p className="color_666">{normalizePhoneNumber(deviceConfigInfoDevices[id].mtnNumber)}</p>
                      :
                      ''
                    }
                  </div>
                }
              </Col>

              <Col md={6} lg={6} >
                <div className="pad10 onlySidePad">
                  <p dangerouslySetInnerHTML={{ __html: deviceDetails.manufactureName + ' ' + deviceDetails.deviceName + ' ' + (deviceDetails.size || '') + (deviceDetails.color ? (' in ' + deviceDetails.color) : '') }} />
                  {deviceDetails.color &&
                    <div className="color pad5 noSidePad">
                      <span className="color-box displayInlineBlock gridBorder" style={{ backgroundColor: deviceDetails.colorCode ? deviceDetails.colorCode : '' }} />
                      <span className="clearfix displayInlineBlock pad5 onlySidePad color_666"> {deviceDetails.color} </span>
                    </div>
                  }
                  {(deviceConfigInfoDevices && deviceConfigInfoDevices[id].numberShareDevice && deviceConfigInfoDevices[id].numberSharedMtn) &&
                    <div className="numberShareData pad5 noSidePad">
                      <div className="color_666">
                        <p className="pad12 onlyRightPad">
                          <span className="bold block">{cqKeys.label.DT_OD_CONFIRMATION_SHARING_TEXT}</span>
                          <span>{deviceConfigInfoDevices[id].numberSharedMtn}</span>
                          {(deviceConfigInfoDevices[id].deviceNickName && deviceConfigInfoDevices[id].numberSharedMtn) ? ', ' : ''}
                          <span dangerouslySetInnerHTML={{ __html: deviceConfigInfoDevices[id].deviceNickName }} />
                        </p>
                      </div>
                    </div>
                  }
                  {deviceDetails.displayImeiId &&
                    <div className="deviceIdData pad5 noSidePad">
                      <div className="color_666">
                        <p className="pad12 onlyRightPad">
                          <span className="bold">{cqKeys.label.DT_OD_CONFIRMATION_DEVICEID_TEXT}</span>
                          &nbsp;<span>{deviceDetails.displayImeiId}</span>
                        </p>
                      </div>
                    </div>
                  }
                  <div className="paymentData pad5 noSidePad">
                    {deviceDetails.contractTerm === '99' && <p className="bold color_666">{cqKeys.label.DT_OD_CONFIMARTION_MONTHLY_DEVICE_PAY}</p>}
                    <div className="color_666">
                      <span dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIRMATION_RETAIL_PRICE }} />
                      {deviceDetails.promoApplied ?
                        <span>
                          <span className="textDecLineThrough">${deviceDetails.edgeRetailPrice}</span>
                          <span>&nbsp;${deviceDetails.installmentBalance}</span>
                        </span>
                        :
                        <span className="pad5 onlySidePad">${deviceDetails.edgeRetailPrice}</span>
                      }
                    </div>
                  </div>
                  {deviceDetails.contractTerm === '99' && <p className="bold pad5 noSidePad color_666">{cqKeys.label.DT_OD_CONFIMARTION_INSTALLMENT_TEXT}</p>}
                  {deviceDetails.poboDateLabel && <p className="bold pad5 noSidePad color_666">{deviceDetails.poboDateLabel}</p>}
                  {(deviceDetails.activationFee && deviceDetails.activationFee > 0) ?
                    <div>
                      <span className="activationFees color_666">{cqKeys.label.DT_OD_CONFIMARTION_ACTIVATION_TEXT} ${deviceDetails.activationFee}</span>
                      <ToolTip
                        className="margin3 onlyLeftMargin displayInlineBlock"
                        header=""
                        text={cqKeys.label.DT_OD_CONFIMARTION_ACTIVATION_TOOLTIP}
                      />
                    </div>
                    :
                    ''
                  }
                  {(deviceDetails.upgradeFee && deviceDetails.upgradeFee > 0) ?
                    <div>
                      <span className="activationFees color_666">{cqKeys.label.DT_OD_CONFIMARTION_UPGRADE_FEE_TEXT} ${deviceDetails.upgradeFee}</span>
                      <ToolTip
                        className="margin3 onlyLeftMargin displayInlineBlock"
                        header=""
                        text={cqKeys.label.DT_OD_CONFIMARTION_UPGRADE_FEE_TOOLTIP}
                      />
                    </div>
                    :
                    ''
                  }

                  {deviceDetails.protectionFeature &&
                    <div className="pad5 noSidePad">
                      <SelectListItem
                        className={this.state.toggler[id].displayFeatureType ? 'expanded' : ''}
                        title={this.state.toggler[id].featureTypeText ? this.state.toggler[id].featureTypeText + cqKeys.label.DT_OD_CONFIMARTION_FEATURE_LIST : 'Show' + cqKeys.label.DT_OD_CONFIMARTION_FEATURE_LIST}
                        onClickMethod={(evt) => (onDeviceListFeatureData(this, id, evt))}
                      />
                    </div>
                  }

                  {this.state.toggler[id].displayFeatureType &&
                    <div className={'features-content ' + (this.state.toggler[id].featureTypeCSS)}>
                      {deviceDetails.protectionFeature &&
                        <div className="features-content-inner pad5 noSidePad">
                          {/* <h4 className="pad5 onlyTopPad bold">Equipment Protection</h4> */}
                          <div className="clearfix pad5 onlySidePad color_666">
                            <div className="width70 floatLeft">{deviceDetails.protectionFeature.name}</div>
                            {deviceDetails.protectionFeature.hasEcpdDiscount ?
                              <div>
                                <span>{deviceDetails.protectionFeature.price !== '-' ? `$${deviceDetails.protectionFeature.price}` : '-'}</span>
                                {deviceDetails.protectionFeature.originalPrice !== '-' &&
                                  <span className="textDecLineThrough">${deviceDetails.protectionFeature.originalPrice}</span>
                                }
                              </div>
                              :
                              <div>
                                {deviceDetails.protectionFeature.price !== '-' ? <div className="width30 floatLeft">${deviceDetails.protectionFeature.price}</div> : '-'}
                              </div>
                            }
                          </div>
                        </div>
                      }
                      {deviceDetails.optionalFeatures && deviceDetails.optionalFeatures.map((feature, i) => (
                        <div className="features-content-inner pad5 noSidePad" key={i}>
                          {/* <h4 className="pad5 onlyTopPad bold">Equipment Protection</h4> */}
                          <div className="clearfix pad5 onlySidePad color_666">
                            <div className="width70 floatLeft">{feature.name}</div>
                            {feature.hasEcpdDiscount ?
                              <div>
                                <span>{feature.price !== '-' ? `$${feature.price}` : '-'}</span>
                                {feature.originalPrice !== '-' &&
                                  <span className="textDecLineThrough">${feature.originalPrice}</span>
                                }
                              </div>
                              :
                              <div>
                                {feature.price !== '-' ? <div className="width30 floatLeft">${feature.price}</div> : '-'}
                              </div>
                            }
                          </div>
                        </div>))
                      }
                    </div>
                  }
                </div>
              </Col>

              <Col md={4} lg={4} className="fontSize_5">
                {deviceDetails.dueToday &&
                  <div className="color_666">
                    <div className="textAlignRight bold">Due today*</div>
                    <div className="textAlignRight">${deviceDetails.dueToday}</div>
                  </div>}
                {deviceDetails.dueMonthly &&
                  <div className="color_666">
                    <div className="textAlignRight bold">Due Monthly</div>
                    {deviceDetails.dueMonthlyDiscounted ?
                      <div className="textAlignRight">
                        <div className="textDecLineThrough">${deviceDetails.dueMonthlyOriginal}</div>
                        <div>${deviceDetails.dueMonthly}</div>
                      </div>
                      :
                      <div className="textAlignRight">${deviceDetails.dueMonthly}</div>
                    }
                  </div>}
              </Col>
            </Row>
            );
          }
          )}
      </section>
    );
  }
}


DeviceListWrapper.propTypes = {
  cqKeys: PropTypes.object,
  devices: PropTypes.object,
  deviceConfigInfo: PropTypes.object,
};
export default DeviceListWrapper;

