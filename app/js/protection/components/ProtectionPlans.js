import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Col, Row } from 'react-flexbox-grid';
import Anchor from './../../common/A/A';
import AsyncComponent from './../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';
import RadioButton from '../../common/RadioButton/index';

const TMPMultiDeviceDropdDown = AsyncComponent(() => import('./TMPMultiDeviceDropdDown'));
const SingDeviceProtection = AsyncComponent(() => import('./SingDeviceProtection'));
const AppleCare = AsyncComponent(() => import('./AppleCare'));
const AccessoryBundle = AsyncComponent(() => import('./AccessoryBundle.js'));

const DeviceProtectionDetails = AsyncComponent(() => import('../components/DeviceProtectionDetails'));
const AddTotalMobileProtectionModal = AsyncComponent(() => import('../components/addTotalMobileProtectionModal'));
const RemoveTotalMobileProtectionModal = AsyncComponent(() => import('../components/removeTotalMobileProtectionModal'));

class ProtectionPlans extends Component {
  constructor(props) {
    super(props);
    const preSelectedItem = props.protectionPlans.find((item) => item.preSelected);
    this.state = {
      showAllPlans: false,
      selectedOption:
        typeof preSelectedItem !== typeof undefined
          ? preSelectedItem.sfoSkuId
          : null,
      showDetails: false,
      showAddProtectionModal: false,
      showRemoveProtectionModal: false,
      selectedPlanDetails:
        typeof preSelectedItem !== typeof undefined
          ? preSelectedItem
          : {},
      prevSelectedProtectionOption: {},
      presentSelectedProtectionDetails: {},
      prevSelectedProtectionDetails: {},
      selectedBundleDetails: props.bundleItemInCart ? { displayName: props.bundleItemInCart.displayName, skuId: props.bundleItemInCart.skuId } : null,
      selectedAppleCareOpt: (this.props.appleCare && this.props.appleCare.incart) ? this.props.appleCare.skuid : 'None',
      appleCareSelected: (this.props.appleCare && this.props.appleCare.incart) ? this.props.appleCare : 'None',
    };
    this.toggleView = this.toggleView.bind(this);
    this.closeTcModal = this.closeTcModal.bind(this);
    this.onShowAllProtectionClickHandler = this.onShowAllProtectionClickHandler.bind(this);
    this.onGotoPrevTabHandler = this.onGotoPrevTabHandler.bind(this);
    this.submitProtectionHandler = this.submitProtectionHandler.bind(this);
    this._appleCareOnChange = this._appleCareOnChange.bind(this);
  }
  componentDidMount() {
    const preSelectedItem = this.props.protectionPlans.find((item) => item.preSelected);
    if (this.props.tapExist || (preSelectedItem && preSelectedItem.tmpMdPlan)) {
      this.setDefaultTapSelections();
    }
  }

  onClaimSelection(e) {
    // In case of TMP MD and user changes the claim option
    const tmpMdPlanObj = this.state.selectedPlanDetails;
    tmpMdPlanObj.quantity = e.target.value;
    tmpMdPlanObj.claimsSkuId = this.state.selectedPlanDetails.additionalTapList.filter((claim) => claim.devices === e.target.value)[0].skuId;
    tmpMdPlanObj.additionalTAPFeatureAvailable = this.state.selectedPlanDetails.additionalTapList.filter((claim) => claim.devices === e.target.value)[0].additionalTAPFeatureAvailable;
    this.setState({ selectedPlanDetails: tmpMdPlanObj });
  }

  onGotoPrevTabHandler() {
    // history.back();
    window.history.back();
  }

  onShowAllProtectionClickHandler(evt) {
    evt.preventDefault();
    const showAllPlans = !this.state.showAllPlans;
    this.setState({ showAllPlans });
  }

  setDefaultTapSelections() {
    let item = this.props.protectionTypes.multi[0];
    const claimList = this.getClaimsList(item);
    const selectedClaim = claimList ? claimList.filter((claim) => claim.additionalTAPFeatureAvailable === true) : [];
    if (selectedClaim.length) {
      item = Object.assign({}, item, { claimsSkuId: selectedClaim[0].skuId, quantity: selectedClaim[0].devices, additionalTAPFeatureAvailable: selectedClaim[0].additionalTAPFeatureAvailable });
    } else if (!selectedClaim.length && item.additionalTapList) {
      item = Object.assign({}, item, { claimsSkuId: item.additionalTapList[0].skuId, quantity: item.additionalTapList[0].devices, additionalTAPFeatureAvailable: item.additionalTapList[0].additionalTAPFeatureAvailable });
    }
    // eslint-disable-next-line
    (this.state.selectedOption === item.sfoSkuId) ? this.setState({ selectedPlanDetails: item }) : this.setState({ selectedPlanDetails: this.state.prevSelectedProtectionDetails });
    // To set default value in dropdown
    this.props.initialize({
      claims: item.quantity,
    });
  }

  setTmpMdStates(obj) {
    // In case of TMP MD
    const prevSelected = this.state.selectedPlanDetails;

    if (obj.tmpMdPlan) {
      this.setState({ showAddProtectionModal: true });
    } else if (prevSelected.tmpMdPlan) {
      this.setState({ showRemoveProtectionModal: true });
    }
  }

  getClaimsList(item) {
    // In case of TMP MD- claims Drop down needs to be displayed

    if (item.additionalTapList) {
      item.additionalTapList.forEach((claim) => {
        claim.label = claim.devices + ' Devices, ' + claim.claims + ' Claims for - ' + claim.price;  // eslint-disable-line
        claim.value = claim.devices; // eslint-disable-line
      });
    }

    return item.additionalTapList;
  }

  pushAppleCareRequest(requestParams) {
    const { appleCare } = this.props;
    let accessoriesParams = {};
    //  construction of apple care request params
    if (this.props.appleCare) {
      accessoriesParams = {
        action: 'add',
        accQty: '1',
        accName: appleCare.name,
        accProdId: appleCare.productid,
        accSkuId: appleCare.skuid,
        incart: appleCare.incart,
        commerceItemId: appleCare.commerceItemId,
      };
      accessoriesParams.action = 'add';
      switch (this.props.appleCare.incart) { // true/false
        case true:
          if (this.state.appleCareSelected === 'None') {
            accessoriesParams.action = 'remove';
          } /* else {
          } */
          break;
        case false:
          if (this.state.appleCareSelected === 'None') {
            accessoriesParams.action = 'remove';
          } /* else {
          } */
          break;
        default:
          break;
      }
      requestParams.accessories.push(accessoriesParams);
    }
  }

  pushBundleBuilderRequest(requestParams) {
    let accessoriesParams = {};
    // construction of accessories bundle requirest params
    if (this.props.bundleItemInCart) {
      if (!this.state.selectedBundleDetails || (this.state.selectedBundleDetails && (this.state.selectedBundleDetails.skuId !== this.props.bundleItemInCart.skuId))) {
        accessoriesParams = {
          action: 'remove',
          accQty: '1',
          accName: this.props.bundleItemInCart.displayName,
          accProdId: this.props.bundleItemInCart.skuId,
          accSkuId: this.props.bundleItemInCart.skuId,
          incart: true,
          commerceItemId: this.props.bundleItemInCart.commerceItemId,
        };
        requestParams.accessories.push(accessoriesParams);
      }
      if (this.state.selectedBundleDetails && (this.state.selectedBundleDetails.skuId !== this.props.bundleItemInCart.skuId)) {
        accessoriesParams = {
          action: 'add',
          accQty: '1',
          accName: this.state.selectedBundleDetails.displayName,
          accProdId: this.state.selectedBundleDetails.skuId,
          accSkuId: this.state.selectedBundleDetails.skuId,
          incart: false,
          commerceItemId: '',
        };
        requestParams.accessories.push(accessoriesParams);
      }
    } else if (this.state.selectedBundleDetails && this.state.selectedBundleDetails.skuId) {
      accessoriesParams = {
        action: 'add',
        accQty: '1',
        accName: this.state.selectedBundleDetails.displayName,
        accProdId: this.state.selectedBundleDetails.skuId,
        accSkuId: this.state.selectedBundleDetails.skuId,
        incart: false,
        commerceItemId: '',
      };
      requestParams.accessories.push(accessoriesParams);
    }
  }

  submitProtectionHandler() {
    const requestParams = {
      additionalTAPFeatureAvailable: this.state.selectedPlanDetails.additionalTAPFeatureAvailable,
      quantity: this.state.selectedPlanDetails.quantity,
      featureSkuId: this.state.selectedOption ? this.state.selectedOption : '',
      featureType: this.state.selectedPlanDetails.tmpMdPlan ? 'SPO' : 'INSURANCE',
      commerceItemId: this.props.commerceItemId ? this.props.commerceItemId : '',
      deviceSkuId: this.props.deviceSkuId ? this.props.deviceSkuId : '',
      existingFeature: false,
      deviceProtectionRequired: this.props.deviceProtectionRequired,
      fromEditDeviceForEUP: this.props.fromEditDeviceForEUP,
      mtn: this.props.mtn ? this.props.mtn : '',
      tapExist: this.props.tapExist,
      tapEligible: this.props.tapEligible,
      editProtection: this.props.editProtection ? this.props.editProtection : false,
      claimsSkuId: this.state.selectedPlanDetails.claimsSkuId,
      isTmpMdPlan: this.state.selectedPlanDetails.tmpMdPlan,
      editCart: this.props.editCart,
      bundleSkuId: this.state.selectedBundleDetails && this.state.selectedBundleDetails.skuId,
      accessories: [],
    };
    this.pushAppleCareRequest(requestParams);
    this.pushBundleBuilderRequest(requestParams);

    this.props.addSelectedProtection(
      this.props.saveUrl,
      requestParams,
      this.props.legacyPlanFlag,
      this.props.cpcskip
    );
  }

  addTotalMobileProtection = (data) => {
    this.setState({ showAddProtectionModal: false });
    if (data === 'REJECT') {
      this.setState({ selectedOption: this.state.prevSelectedProtectionOption, selectedPlanDetails: this.state.prevSelectedProtectionDetails });
    } else {
      this.setState({ selectedPlanDetails: this.state.presentSelectedProtectionDetails });
    }
  };

  removeTotalMobileProtection = (data) => {
    this.setState({ showRemoveProtectionModal: false });
    if (data === 'REJECT') {
      this.setState({ selectedOption: this.state.prevSelectedProtectionOption, selectedPlanDetails: this.state.prevSelectedProtectionDetails });
    } else {
      this.setState({ selectedPlanDetails: this.state.presentSelectedProtectionDetails });
    }
  };


  _showAllPlans() {
    this.setState({ showAllPlans: true });
  }

  closeTcModal = () => {
    this.setState({ showDetails: false });
  };

  toggleView(event) {
    event.preventDefault();
    this.setState({ showDetails: true });
  }

  _protectionOptionChange = (obj) => {
    this.setState({ prevSelectedProtectionOption: this.state.selectedOption, presentSelectedProtectionDetails: obj, prevSelectedProtectionDetails: this.state.selectedPlanDetails });
    this.setTmpMdStates(obj);
    this.setState({ selectedOption: obj.sfoSkuId, selectedPlanDetails: obj });
    if (obj.tmpMdPlan) this.setDefaultTapSelections();
  };

  _appleCareOnChange = (obj) => {
    const selectedOpt = (typeof obj === 'object' ? obj.skuid : obj);
    this.setState({
      appleCareSelected: obj,
      selectedAppleCareOpt: selectedOpt,
    });
  };

  renderModals() {
    const { cqContent } = this.props;
    let modalHTML;
    if (this.state.showAddProtectionModal) {
      modalHTML = (
        <div>
          <AddTotalMobileProtectionModal
            addTotalMobileProtection={this.addTotalMobileProtection}
            showModal="true"
            cqContent={cqContent}
          />
        </div>);
    } else if (this.state.showRemoveProtectionModal) {
      modalHTML = (
        <div>
          <RemoveTotalMobileProtectionModal
            removeTotalMobileProtection={this.removeTotalMobileProtection}
            showModal="true"
            cqContent={cqContent}
            stateProps={this.state}
          />
        </div>);
    } else if (this.state.showDetails) {
      modalHTML =
        (<DeviceProtectionDetails
          cqHTML={cqContent.html}
          cqLabel={cqContent.label}
          closeModal={this.closeTcModal}
          showModal="true"
        />);
    }
    return modalHTML;
  }

  renderClaimsList(claimsObj) {
    // In case of TMP MD- claims Drop down needs to be displayed

    const { item, claimsList } = claimsObj;
    const disableClaim = claimsList && claimsList.filter((claim) => claim.additionalTAPFeatureAvailable === true);
    return (
      item.additionalTapList && (
        <Col xs={10} className="margin20 onlyTopMargin">
          <div className="priceLabel floatNone margin40 onlyLeftMargin">
            <div className="bold margin6 onlyBottomMargin">Protect additional devices for $9/month</div>
            <form
              name="claimsForm"
              style={{
                backgroundColor: 'transparent',
                fontSize: '16px',
                height: '50px',
                display: 'inline-block',
                position: 'relative',
                lineHeight: '24px',
                fontFamily: 'Roboto, sans-serif',
                transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                cursor: 'auto',
              }}
            >
              <div className="tapClaimsDD">
                <Field
                  aria-label="Claims"
                  name="claims"
                  id="claims"
                  label="Claims"
                  className="claimsSelectDD pad12 noSidePad"
                  disabled={!(this.state.selectedOption === item.sfoSkuId) || (disableClaim.length > 0 && this.props.tapExist)}
                  options={claimsList}
                  component={TMPMultiDeviceDropdDown}
                  onChange={(e) => this.onClaimSelection(e)}
                />
              </div>
            </form>
          </div>
        </Col>
      )
    );
  }

  renderMultiDeviceProtection() {
    const { cqContent, protectionTypes } = this.props;
    const protections = (
      <div className="pad18 noBottomPad">
        <h2 className="margin6 onlyBottomMargin fontSize_7">
          {cqContent.label.DT_OD_PROTECTION_TMP_MD_TITLE}
        </h2>
        <p className="alignLeft margin24 onlyBottomMargin">{cqContent.label.DT_OD_PROTECTION_TMP_MD_SUB_TITLE}</p>
        <Row>
          <Col xs={4} className="textAlignCenter">
            <div className="bold margin6 onlyTopMargin fontSize_5">All eligible devices on account</div>
            <img className="width60 margin18 noSideMargin" src="https://www.verizonwireless.com/omni/d/i/3_Devices_TAP.png" alt="MultiDeviceImg" />
          </Col>
          <Col xs={8}>
            {protectionTypes.multi.map((protection) => { // eslint-disable-line
              return (
                <Row key={protection.index} className="pad12 noSidePad margin30 onlyBottomMargin">
                  <Col xs={10}>
                    <RadioButton
                      name="protectionOption"
                      id={'protectionRadio_' + protection.index}
                      value={protection.sfoSkuId}
                      containerClassName=" "
                      labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad width90"
                      checked={protection.sfoSkuId === this.state.selectedOption}
                      onChange={this._protectionOptionChange.bind(this, protection)}
                    >
                      <div className="fontSize_4">
                        <p tabIndex={protection.index} className="bold fontSize_5">{protection.displayName}</p>
                        <p className="pad6 onlyTopPad" tabIndex={protection.index} dangerouslySetInnerHTML={{ __html: `${protection.introText}` }} />
                      </div>
                    </RadioButton>
                  </Col>
                  <Col xs={2}>
                    <p tabIndex={protection.index} className="bold fontSize_5 textRight">
                      {protection.hasEcpdDiscount && <span><span className="textDecLineThrough normal">${protection.wasPrice}</span>&nbsp;&nbsp;</span>}${`${protection.price} ${protection.priceTerm}`}</p>
                  </Col>
                  {this.renderClaimsList({
                    item: protection,
                    claimsList: this.getClaimsList(protection),
                  })}
                </Row>
              );
            })}
          </Col>
        </Row>
      </div>
    );
    return protections;
  }

  render() {
    const { cqContent, tapExist, protectionTypes, bundleData, appleCare, bundleItemInCart, fewPlans, deviceDetails } = this.props;
    const singleDeviceProtProps = { fewPlans, cqContent, protectionTypes, deviceDetails };
    return (
      <div>
        <div>
          {this.renderModals()}
          <Row>
            <Col xs={9}>
              <h1 className="pad10 noSidePad">
                {cqContent.label.DT_OD_DEVICE_PROTECTION_HEADER}
              </h1>
            </Col>
            <Col xs={3}>
              <ChatAndC2C />
            </Col>
          </Row>
          {this.props.tmprefreshOptionAvailable &&
            <div className="width100 clearfix pad12 noSidePad background_yellow relative margin20 noSideMargin">
              <span className="width5 font-icon_info_circle margin10 onlySideMargin floatLeft" />
              <span className="width90 floatLeft fontSize_1_3 bold" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_PROTECTION_TMP_REFRESH_AVAILABLE }} />
            </div>
          }
          <div className="margin18 onlyTopMargin">
            {protectionTypes.multi && this.renderMultiDeviceProtection()}
            {!tapExist && <SingDeviceProtection {...singleDeviceProtProps} showAllPlans={this.state.showAllPlans} selectedOption={this.state.selectedOption} onShowAllProtection={this.onShowAllProtectionClickHandler} onProtectionChange={this._protectionOptionChange} />}
          </div>
          {appleCare && <AppleCare cqContent={cqContent} appleCare={appleCare} appleCareSelected={this.state.appleCareSelected} selectedAppleCareOpt={this.state.selectedAppleCareOpt} onAppleCareChange={this._appleCareOnChange} />
          }
          <Row className="border_black borderSize_4 onlyTopBorder">
            <Col sm={12} md={12}>
              {(typeof bundleData !== 'undefined' && bundleData !== null && bundleData.length > 0) && <AccessoryBundle defaultSelection={(bundleItemInCart && bundleItemInCart.skuId) ? bundleItemInCart.skuId : (this.state.selectedBundleDetails && this.state.selectedBundleDetails.skuId)} bundleData={bundleData} cqContent={cqContent} onBundleSelected={(bundle) => this.setState({ selectedBundleDetails: bundle })} />}
            </Col>
          </Row>
          {!this.state.selectedOption &&
            <Row>
              <Col sm={12} md={12} className="textAlignRight">
                <span className="displayInlineBlock background_orange color_white pad5">
                  {cqContent.label.DT_OD_PROTECTION_NOT_SELECTED}
                </span>
              </Col>
            </Row>
          }
        </div>
        <Row className="protectionNav background_gray_one border_black onlyTopBorder borderSize_4 pad60 onlyBottomPad">
          <Col xs={12}>
            <div className="margin15 noSideMargin textAlignCenter clearfix">
              <button className="button secondary large floatLeft" onClick={this.onGotoPrevTabHandler}>
                {cqContent.label.DT_OD_DEVICE_PROTECTION_BACK_BTN}
              </button>
              <Anchor onClick={this.toggleView} className="fontSize_5 color_black textDecUnderline bold displayInlineBlock margin15 onlyTopMargin cursorPointer">{cqContent.label.DT_OD_PROTECTION_TC_LINK}</Anchor>
              <button className="button primary large floatRight" disabled={this.state.selectedPlanDetails === null || Object.keys(this.state.selectedPlanDetails).length === 0 || (this.props.appleCare && !this.state.appleCareSelected)} onClick={this.submitProtectionHandler}>
                {cqContent.label.DT_OD_DEVICE_PROTECTION_SAVE_BTN_TXT}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default reduxForm({
  // eslint-disable-line no-class-assign
  form: 'claimsForm',
  enableReinitialize: true,
})(ProtectionPlans);

ProtectionPlans.propTypes = {
  cpcskip: PropTypes.node,
  protectionPlans: PropTypes.array,
  protectionTypes: PropTypes.object,
  fewPlans: PropTypes.array,
  cqContent: PropTypes.object,
  commerceItemId: PropTypes.string,
  deviceSkuId: PropTypes.string,
  legacyPlanFlag: PropTypes.bool,
  editProtection: PropTypes.bool,
  tapExist: PropTypes.bool,
  tapEligible: PropTypes.bool,
  mtn: PropTypes.string,
  addSelectedProtection: PropTypes.func,
  saveUrl: PropTypes.string,
  editCart: PropTypes.bool,
  deviceProtectionRequired: PropTypes.bool,
  fromEditDeviceForEUP: PropTypes.bool,
  tmprefreshOptionAvailable: PropTypes.bool,
  initialize: PropTypes.func,
  bundleData: PropTypes.array,
  deviceDetails: PropTypes.object,
  appleCare: PropTypes.object,
  bundleItemInCart: PropTypes.object,
};
