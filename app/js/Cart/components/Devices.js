import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import { parsePrice } from './../../common/Helpers';
import DeviceEditRemovePrompt from './DeviceEditRemovePrompt';
import ToolTip from '../../common/ToolTip/index';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = { showTermsConditionModal: false };
  }
  editItem(editDeviceUrl) {
    window.location = editDeviceUrl;
  }

  removeItem() {
    const { commerceItemId, flow } = this.props.deviceInfo;
    const { totalDevices, accessories } = this.props;

    const standaloneAccessory = accessories.filter((accessory) => (accessory.standaloneAccessory === true));

    // If only 1 device and no standalone Accessories
    if (totalDevices === 1 && standaloneAccessory.length === 0) {
      this.props.clearCart();
    } else {
      this.props.removeDevice({ commerceItemId, flow });
    }
    return true;
  }
  toggleTermsModal() {
    const isVisible = this.state.showTermsConditionModal;
    this.setState({ showTermsConditionModal: !isVisible });
  }

  render() {
    const {
      cqContent, deviceInfo, protectionURL, cpcSucessful, tmpMd,
    } = this.props;

    const getSbdOfferPrice = () => (deviceInfo.sbdOffer &&
      <div>
        <span className="bold">${deviceInfo.sbdOffer.sbdItemMonthlyAmount}</span><br />
        <span className="textDecLineThrough">${deviceInfo.sbdOffer.itemMonthlyPrice}</span>
      </div>
    );

    const getReducedDueMonthly = () => (deviceInfo.hasReducedDueMonthly &&
      <div><span>${deviceInfo.price}</span></div>);

    const getBICPrice = () => (deviceInfo.bicOfferApplied && deviceInfo.sbdOffer &&
      <div>
        <span className="bold">${deviceInfo.sbdOffer.bicDiscountedContractPrice}</span>
        <span className="textDecLineThrough block">${deviceInfo.sbdOffer.price}</span>
      </div>
    );

    const getMonthlyPrice = () => (
      <div>
        {deviceInfo.originalPrice > deviceInfo.price ?
          <div>
            <span className="bold">${deviceInfo.price}</span>
            <span className="textDecLineThrough block">${deviceInfo.originalPrice}</span>
          </div>
          :
          <span className="bold">{deviceInfo.price ? '$' + deviceInfo.price : '--'}</span>
        }
      </div>
    );

    return (
      <div className="fontSize_4">
        {/* <Modal
          mounted={this.state.showTermsConditionModal}
          closeFn={() => { this.toggleTermsModal(); }}
          showCloseX
        />*/}
        <Row className="pad60 onlyBottomPad">
          <Col md={2} lg={2} className="textAlignLeft">
            <img
              className="maxWidth100"
              src={deviceInfo.deviceImageUrlLarge}
              alt={`${deviceInfo.deviceManufactureName} ${deviceInfo.deviceProductDisplayName} ${deviceInfo.capacity} in ${deviceInfo.colorName}`}
              itemProp="image"
            />
            {deviceInfo.displayMtn !== null &&
              <p className="fontSize_2 margin6 onlyTopMargin textAlignCenter">{deviceInfo.displayMtn}</p>
            }
          </Col>
          <Col md={10} lg={10}>
            <Row>
              <Col xs={6}>
                <p
                  className="bold fontSize_7"
                  dangerouslySetInnerHTML={{ __html: `${deviceInfo.deviceManufactureName} ${deviceInfo.deviceProductDisplayName}` }}
                />
              </Col>
            </Row>


            <div className="margin6 onlyTopMargin">
              {deviceInfo.capacity && <span>{deviceInfo.capacity},&nbsp;</span>}
              {deviceInfo.colorName && <span>{deviceInfo.colorName}</span>}
            </div>

            {deviceInfo.sbdOffer &&
              <Row>
                <Col md={7} className="margin18 onlyTopMargin">
                  <div className="clearfix positionRelative color_blue">
                    <span className="fontSize_3" dangerouslySetInnerHTML={{ __html: deviceInfo.sbdOffer.sbdHeaderMsgHTML }} />
                  </div>
                </Col>
              </Row>
            }

            {deviceInfo.humCarDetails &&
            <p className="margin6 onlyTopMargin" >
              <span className="">{deviceInfo.humCarDetails.year}</span>
              <span className="pad3  onlyLeftPad">{deviceInfo.humCarDetails.make}</span>
              <span className="pad3  onlyLeftPad">{deviceInfo.humCarDetails.model}</span>
              <span className="pad3  onlyLeftPad">-</span>
              <span className="pad3  onlyLeftPad">{deviceInfo.humCarDetails.color}</span>
            </p>
            }


            {deviceInfo.priceForFullRetailPriceListID > 0 &&
              <div>
                <span>{cqContent.label.DT_OD_CART_RETAIL_PRICE_TEXT}:&nbsp;</span>
                {(parsePrice(deviceInfo.priceForFullRetailPriceListID) > parsePrice(deviceInfo.discountedEdgeRetailPrice)) ?
                  <span>
                    <span className="textDecLineThrough"> ${deviceInfo.priceForFullRetailPriceListID}</span>
                    <span className="bold">&nbsp;${deviceInfo.discountedEdgeRetailPrice} </span>
                  </span>
                  :
                  <span className="bold">${deviceInfo.priceForFullRetailPriceListID}</span>}
              </div>
            }

            {/* {deviceInfo.totalSavings && deviceInfo.totalSavings > 0 &&
              <div className="margin12 onlyTopMargin color_blue">
                <span className="bold">{cqContent.label.DT_OD_CART_TOTAL_SAVINGS_TEXT}:&nbsp;</span>
                <span>&nbsp;${deviceInfo.totalSavings}</span>
              </div>
            } */}

            {deviceInfo.poboAvailableDate &&
              <div className="margin12 onlyTopMargin">
                <span className="pad10 displayInlineBlock background_yellow">
                  {cqContent.label['DT_OD_CART_' + deviceInfo.inventoryStatus + '_LABEL']}{deviceInfo.poboAvailableDate}
                </span>
              </div>
            }

            {
              deviceInfo.numberShareDevice === false && deviceInfo.totalNumberShareExtension > 0 && <p className="margin12 onlyTopMargin">{`${deviceInfo.totalNumberShareExtension} NumberShare Extension(s)`}</p>
            }

            <div className="margin18 onlyTopMargin">
              {(parsePrice(deviceInfo.price) > 0 && (deviceInfo.contractTerm === '0' || deviceInfo.contractTerm === '24')) ?
                <Row>
                  <Col md={7} lg={7}>
                    <p className="bold">{deviceInfo.priceText}</p>
                    <p>{deviceInfo.priceSubTitle}</p>
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">
                          <span>--</span>
                        </div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">
                          <span>${deviceInfo.price}</span>
                          {parsePrice(deviceInfo.originalPrice) > parsePrice(deviceInfo.price) &&
                            <div className="textAlignCenter">
                              <span className="textDecLineThrough">${deviceInfo.originalPrice}</span>
                            </div>}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                :
                <Row>
                  <Col md={7} lg={7}>
                    <p className="bold">{deviceInfo.priceText}</p>
                    <p dangerouslySetInnerHTML={{ __html: deviceInfo.priceSubTitle }} />
                    {deviceInfo.sbdOffer && <span>{deviceInfo.sbdOffer.sbdPromoMsg}</span>}
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter">
                          {deviceInfo.sbdOffer && getSbdOfferPrice()}
                          {!deviceInfo.sbdOffer && deviceInfo.hasReducedDueMonthly && getReducedDueMonthly()}
                          {!deviceInfo.sbdOffer && !deviceInfo.hasReducedDueMonthly && deviceInfo.bicOfferApplied && getBICPrice()}
                          {!deviceInfo.sbdOffer && !deviceInfo.hasReducedDueMonthly && !deviceInfo.bicOfferApplied && getMonthlyPrice()}
                        </div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold"><span>--</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              {parsePrice(deviceInfo.edgeItemDownPaymentAmount) > 0 &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>{cqContent.label.DT_OD_CART_DUE_TODAY_DOWN_PAYMENT}</Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">--</div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">${deviceInfo.edgeItemDownPaymentAmount}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              {deviceInfo.deviceEdgeBuyOutAmount > 0 &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>{cqContent.label.DT_OD_CART_REMAINING_BALANCE_TEXT}</Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">--</div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">${deviceInfo.deviceEdgeBuyOutAmount}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              {deviceInfo.deviceEdgeUpAmount > 0 &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>{cqContent.label.DT_OD_CART_DUE_TODAY_EARLY_UPGRADE_BALANCE}</Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">--</div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">${deviceInfo.deviceEdgeUpAmount}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              {deviceInfo.numberShareDevice &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>
                    <p className="pad12 onlyRightPad">
                      <span className="bold block">{cqContent.label.DT_OD_CART_SHARING_TEXT}</span>
                      <span>{deviceInfo.numberSharedMtn}</span>
                      {(deviceInfo.deviceNickName !== null && deviceInfo.numberSharedMtn !== null) && ', '}
                      <span dangerouslySetInnerHTML={{ __html: deviceInfo.deviceNickName }} />
                    </p>
                  </Col>
                </Row>
              }
              <div className="margin12 onlyTopMargin">
                <DeviceEditRemovePrompt
                  cqContent={cqContent}
                  showEdit={deviceInfo.flow !== 'NSO'}
                  onEdit={() => {
                    this.editItem(deviceInfo.editDeviceUrl);
                  }}
                  onRemove={() => { this.removeItem(); }}
                  promptMsg={`Are you sure you want to remove ${deviceInfo.deviceManufactureName} ${deviceInfo.deviceProductDisplayName} ${deviceInfo.capacity || ''} ${deviceInfo.colorName ? `in ${deviceInfo.colorName}` : ''} and all of its features from your cart?`}
                />
              </div>

              {deviceInfo.additionalFeatures && deviceInfo.additionalFeatures.length > 0 && <div className="margin18 onlyTopMargin">
                <p className="bold">Features</p>
                {deviceInfo.additionalFeatures.map((feature, index) => (
                  <Row key={'feature-' + index} className={`${index !== deviceInfo.additionalFeatures.length - 1 ? 'margin6 onlyBottomMargin' : ''}`}>
                    <Col md={7} lg={7}>
                      <span>{feature.name}</span>
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignCenter bold"><span>${feature.price}</span></div>
                        </Col>
                        <Col md={6} lg={6}>
                          <div className="textAlignCenter bold"><span>--</span></div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>}

              {deviceInfo.upgradeFee > 0 &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>
                    <span>{cqContent.label.DT_OD_CART_UPGRADE_FEE_TEXT}(${deviceInfo.upgradeFee})</span>
                    <ToolTip
                      id="upgradeFee-tooltip"
                      className="margin3 onlyLeftMargin displayInlineBlock"
                      ariaLabel="Upgrade fee information tooltip"
                      text={cqContent.label.DT_OD_CART_ONE_TIME_UPGRADE_FEE_TOOLTIP_TEXT}
                      noRenderHTML
                    />
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold"><span>--</span></div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold"><span>${deviceInfo.upgradeFee}</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              {tmpMd && deviceInfo.flow !== 'NSO' &&
                <div className="margin18 onlyTopMargin">
                  <Row>
                    <Col md={7} lg={7}>
                      <span className="bold">{cqContent.label.DT_OD_CART_EQUIPMENT_PROTECTION_TEXT}</span>
                      <form
                        name="protectionOptionForm"
                        id="protectionOptionForm"
                        method="POST"
                        action={protectionURL + '?ts=' + Date.now() + '&deviceProdId=' + deviceInfo.deviceProdId + '&deviceSkuId=' + deviceInfo.deviceSkuId}
                      >
                        <div>
                          <div className="margin5 onlyTopMargin">
                            {tmpMd.name}
                            <span className="pad5 onlyLeftPad relative">
                              {(!tmpMd.hideEditProtection &&
                                <input
                                  className="background_transparent noPad borderSize_0 textDecUnderline fontSize_4"
                                  type="submit"
                                  value="Edit"
                                />
                              )}
                            </span>
                          </div>
                        </div>
                        <input type="hidden" name="sfoskuId" value={tmpMd.featureSkuId} />
                        <input type="hidden" name="deviceSkuId" value={deviceInfo.deviceSkuId} />
                        <input type="hidden" name="mtn" value={deviceInfo.mtn} />
                        <input type="hidden" name="upgradeDeviceMTN" value={deviceInfo.mtn} />
                        {deviceInfo.flow === 'AAL' ?
                          <input type="hidden" name="deviceSORId" value={deviceInfo.deviceSORId} />
                          :
                          <input type="hidden" name="upgradeDeviceSORId" value={deviceInfo.deviceSORId} />
                        }
                        <input type="hidden" name="editFlag" value="true" />
                        <input type="hidden" name="commerceItemId" value={deviceInfo.commerceItemId} />
                        <input type="hidden" name="flow" value={deviceInfo.flow} />
                      </form>
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignCenter bold">
                            {!tmpMd.hideEditProtection && this.props.index === 1 ?
                              <span>${tmpMd.price}</span>
                              :
                              <span>--</span>
                            }
                          </div>
                        </Col>
                        <Col md={6} lg={6}>
                          <div className="textAlignCenter bold"><span>--</span></div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              }
              {deviceInfo.protectionOption && deviceInfo.protectionOption !== null && !tmpMd &&
                <div>
                  <div className="margin18 onlyTopMargin">
                    <Row>
                      <Col md={7} lg={7}>
                        <div className="verticalAlignMiddle">
                          <span className="bold">{cqContent.label.DT_OD_CART_EQUIPMENT_PROTECTION_TEXT}</span>
                          <form
                            className="margin12 onlyLeftMargin displayInlineBlock verticalBottom"
                            name="protectionOptionForm"
                            id={'protectionOptionForm' + deviceInfo.deviceProdId}
                            method="POST"
                            action={protectionURL + '?ts=' + Date.now() +
                              '&deviceProdId=' + deviceInfo.deviceProdId +
                              '&deviceSkuId=' + deviceInfo.deviceSkuId}
                          >
                            <div className="floatLeft col span_4_of_5">
                              {(deviceInfo.protectionOption.featureType !== 'SPO') &&
                                <span className="pad5 onlyLeftPad relative">
                                  <input
                                    className="background_transparent noPad borderSize_0 textDecUnderline fontSize_4"
                                    type="submit"
                                    value="Edit"
                                  />
                                </span>
                              }
                            </div>

                            <input
                              type="hidden"
                              name="sfoskuId"
                              value={deviceInfo.protectionOption.sfoskuId}
                            />
                            <input
                              type="hidden"
                              name="deviceSkuId"
                              value={deviceInfo.deviceSkuId}
                            />
                            <input type="hidden" name="mtn" value={deviceInfo.mtn} />
                            <input
                              type="hidden"
                              name="upgradeDeviceMTN"
                              value={deviceInfo.mtn}
                            />
                            {deviceInfo.flow === 'AAL' ?
                              <input
                                type="hidden"
                                name="deviceSORId"
                                value={deviceInfo.deviceSORId}
                              />
                              : <input
                                type="hidden"
                                name="upgradeDeviceSORId"
                                value={deviceInfo.deviceSORId}
                              />
                            }
                            <input type="hidden" name="editFlag" value="true" />
                            <input
                              type="hidden"
                              name="commerceItemId"
                              value={deviceInfo.commerceItemId}
                            />
                            <input
                              type="hidden"
                              name="flow"
                              value={deviceInfo.flow}
                            />
                          </form>
                        </div>
                        <p>{deviceInfo.protectionOption.name}</p>
                        {deviceInfo.protectionOption.displayMsg !== null &&
                          <p className="margin6 onlyTopMargin" dangerouslySetInnerHTML={{ __html: deviceInfo.protectionOption.displayMsg }} />
                        }
                        {/* <Anchor
                        className="color_333 block textDecUnderline margin6 onlyTopMargin fontSize_4"
                        onClick={() => { this.toggleTermsModal(); }}
                      >{cqContent.label.DT_OD_CART_TERMS_AND_CONDITIONS_CTA_TEXT}
                      </Anchor> */}
                      </Col>
                      <Col md={5} lg={5}>
                        <Row>
                          <Col md={6} lg={6}>
                            <div className="textAlignCenter bold">
                              <span>
                                {(deviceInfo.protectionOption.featureType === 'SPO' && deviceInfo.protectionOption.hideEditProtection) ?
                                  '--'
                                  :
                                  '$' + deviceInfo.protectionOption.price
                                }
                              </span>
                            </div>
                          </Col>
                          <Col md={6} lg={6}>
                            <div className="textAlignCenter bold"><span>--</span></div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              }
            </div>

            {!cpcSucessful && deviceInfo.lacPrice && parsePrice(deviceInfo.lacPrice) > 0 &&
              <div className="margin18 onlyTopMargin ">
                <Row>
                  <Col md={7} lg={7}>
                    <div>
                      <span className="bold">
                        {deviceInfo.numberShareDevice ? deviceInfo.lacText : cqContent.label.DT_OD_CART_PLAN_ACCESS_TEXT}
                      </span>
                      {deviceInfo.promoLACMessage && <p dangerouslySetInnerHTML={{ __html: deviceInfo.promoLACMessage }} />}
                    </div>
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold">
                          <span>${deviceInfo.lacPrice}</span>
                        </div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignCenter bold"><span>--</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            }

            {deviceInfo.flow === 'NSO' && deviceInfo.simDetails !== null &&
            <div className="margin18 onlyTopMargin ">
              <Row>
                <Col md={7} lg={7}>
                  <div>
                    <p className="bold">{cqContent.label.DT_OD_SIM_CART_TEXT}</p>
                    <p>{deviceInfo.simDetails.displayName}</p>
                  </div>
                </Col>
                <Col md={5} lg={5}>
                  <Row>
                    <Col md={6} lg={6}>
                      <div className="textAlignCenter bold">
                        <span>--</span>
                      </div>
                    </Col>
                    <Col md={6} lg={6}>
                      <div className="textAlignCenter bold">
                        <span>FREE</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            }

            {deviceInfo.flow === 'NSO' && deviceInfo.displayImeiId !== null &&
              <div className="margin18 onlyTopMargin">
                <Row>
                  <Col md={7} lg={7}>
                    <span>{`${cqContent.label.DT_OD_DEVICE_ID_ENDING_TEXT} ${deviceInfo.displayImeiId}`}</span>
                  </Col>
                </Row>
              </div>
            }


            {(deviceInfo.flow === 'AAL' || deviceInfo.flow === 'NSO') && deviceInfo.activationFee > 0 &&
              <div className="margin18 onlyTopMargin">
                <p className="bold">{cqContent.label.DT_OD_CART_OTHER_TEXT}</p>
                {(deviceInfo.flow === 'AAL' || deviceInfo.flow === 'NSO') && parsePrice(deviceInfo.activationFee) > 0 && <div className="block"><span>{cqContent.label.DT_OD_CART_ONE_TIME_ACT_FEE_TEXT} (${deviceInfo.activationFee})</span><ToolTip
                  id="activationFee-tooltip"
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Activation Fee information tooltip"
                  text={cqContent.label.DT_OD_CART_ONE_TIME_ACT_FEE_TOOLTIP_TEXT}
                  noRenderHTML
                /></div>}
              </div>
            }
            {(deviceInfo.flow === 'AAL' || deviceInfo.flow === 'NSO') && deviceInfo.activationFeeWaived &&
              <div className="margin18 onlyTopMargin">
                <p className="bold">{cqContent.label.DT_OD_CART_OTHER_TEXT}</p>
                <div className="block"><span>{cqContent.label.DT_OD_CART_WAIVED_ACTIVATION_FEE_TEXT} (${deviceInfo.originalActivationFee})</span><ToolTip
                  id="activationFee-tooltip"
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Activation Fee information tooltip"
                  text={'$' + deviceInfo.originalActivationFee + cqContent.label.DT_OD_CART_WAIVED_ACT_FEE_TOOLTIP_TEXT}
                  noRenderHTML
                /></div>
              </div>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

Devices.propTypes = {
  cqContent: PropTypes.object,
  deviceInfo: PropTypes.object,
  protectionURL: PropTypes.string,
  cpcSucessful: PropTypes.bool,
  totalDevices: PropTypes.number,
  accessories: PropTypes.array,
  clearCart: PropTypes.func,
  removeDevice: PropTypes.func,
  tmpMd: PropTypes.object,
  index: PropTypes.number,
};
export default Devices;
