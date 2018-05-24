import { Grid, Row, Col } from 'react-flexbox-grid';
import React from 'react';
import PropTypes from 'prop-types';

import { hashHistory } from './../../store';
import * as Constants from './../constants';
// import Modal from '../../common/Modal/index';
// import Button from '../../common/Button/Button';
// import Loader from '../../common/Loader/Loader';
// import MDNDetails from './MDNDetails';
// import TransferUpgradeOptions from './TransferUpgradeOptions';
// import SharedCartModal from './SharedCartModal';
// import Anchor from './../../common/A/A';
import AsyncComponent from '../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';

const Anchor = AsyncComponent(() => import('./../../common/A/A'));
const Modal = AsyncComponent(() => import('../../common/Modal/index'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const MDNDetails = AsyncComponent(() => import('./MDNDetails'));
const TransferUpgradeOptions = AsyncComponent(() => import('./TransferUpgradeOptions'));
const SharedCartModal = AsyncComponent(() => import('./SharedCartModal'));


export default class MDNSelection extends React.Component {
  static propTypes = {
    mdnDetailsList: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    ajaxCallSelectedMTN: PropTypes.string,
    preOrderResponse: PropTypes.object,
    selectedMDN: PropTypes.object,
    ajaxCallUrl: PropTypes.string,
    getLoanInfoPreOrder: PropTypes.func,
    changeMDNSelectionView: PropTypes.func,
    changeSelectedMDN: PropTypes.func,
    submitAgreement: PropTypes.func,
    accountLevelInEligibleDetails: PropTypes.object,
    cqJSON: PropTypes.object,
    selectedMdnDetails: PropTypes.object,
    changeSelectedTransferMDN: PropTypes.func,
    transferUpgrade: PropTypes.object,
    formData: PropTypes.object,
    transferTakerMTNs: PropTypes.array,
    showModalValue: PropTypes.func,
    showErrorNotification: PropTypes.func,
    hideNotification: PropTypes.func,
    sharedCartInfo: PropTypes.object,
    clearSharedCart: PropTypes.func,
    cancelPendingOrder: PropTypes.func,
    isFetchingModal: PropTypes.bool,
    transferObject: PropTypes.object,
    transferMdnDetails: PropTypes.object,
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isDisabled: true,
      showInfo: false,
      showModal: false,
      showEUPPendingModal: false,
      showEUPPendingConfirmation: false,
    };
    this.onAddLineInit = this.onAddLineInit.bind(this);
    this.upgradeCheck = this.upgradeCheck.bind(this);
    this.selectedNumber = null;
    this.selectedTransferMdn = undefined;
    this.formDetails = undefined;
    this.mdnDetails = undefined;
    this.transferUpgradeCall = this.transferUpgradeCall.bind(this);
    this.showTransferOverlay = this.showTransferOverlay.bind(this);
    this.hideTransferOverlay = this.hideTransferOverlay.bind(this);
    this.redoTransferMdn = this.redoTransferMdn.bind(this);
    this.tranferMtn = this.tranferMtn.bind(this);
    this.clearSharedCartfunc = this.clearSharedCartfunc.bind(this);
    this.openEUPPendingModal = this.openEUPPendingModal.bind(this);
    this.cancelEUPOrder = this.cancelEUPOrder.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ showModal: newProps.showModal, showEUPPendingConfirmation: newProps.showEUPPendingConfirmation });
    this.formDetails = newProps.formData.toJS();
    this.state.showInfo = newProps.actionSelected !== null || false;
    this.state.isDisabled = this.formDetails.chooseMDN.values ? !true : true;
    this.selectedNumber = this.formDetails.chooseMDN.values && this.formDetails.chooseMDN.values.mdnSelection;
    this.selectedTransferMdn = newProps.selectedTransferMdn;

    /* if (this.selectedNumber) {
      for (const mdn in newProps.mdnDetailsList.toJS()) {
        if (newProps.mdnDetailsList.toJS()[mdn].mtn === this.selectedNumber) {
          if (!newProps.mdnDetailsList.toJS()[mdn].loanInfo.displayReturnOption) {
            newProps.showErrorNotification(newProps.mdnDetailsList.toJS()[mdn].loanInfo.deviceMismatchText);
          }
        }
      }
    } */
  }

  shouldComponentUpdate(nextProps) {
    if (typeof nextProps.preOrderResponse !== typeof undefined && nextProps.preOrderResponse != null && nextProps.preOrderResponse !== this.props.preOrderResponse) {
      this.showSummaryView(nextProps.selectedMDN);
      return false;
    }
    return true;
  }

  onAddLineInit() {
    const _AALInEligibleDetails = this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').toJS();
    if (_AALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER') {
      hashHistory.push('/pendingOrder');
    } else {
      hashHistory.push('/limitExceeded');
    }
  }

  tranferMtn() {
    const data = {};
    const { transferObject } = this.props;
    data.action = Constants.TRANSFER_ACTION;
    data.transferFromMTN = this.mdnDetails.mtn;
    data.transferToMTN = this.selectedTransferMdn;
    this.props.changeSelectedTransferMDN(data, transferObject);
  }

  clearSharedCartfunc(clearCartLink) {
    this.props.clearSharedCart(clearCartLink);
  }

  redoTransferMdn(mdnDetails) {
    const data = {};
    data.action = Constants.REDO_TRANFER_ACTION;
    data.undoTransferMTN = mdnDetails.mtn;
    this.props.changeSelectedTransferMDN(data);
  }

  transferUpgradeCall(mdnDetails) {
    this.mdnDetails = mdnDetails;
    this.showTransferOverlay();
  }

  showTransferOverlay() {
    this.props.showModalValue(true);
  }

  hideTransferOverlay() {
    this.props.showModalValue(false);
  }

  upgradeCheck() {
    this.setState({
      isFetching: true,
    });

    const mdnDetails = this.props.mdnDetailsList.toJS().filter((mdn) => mdn.mtn === this.props.formData.toJS().chooseMDN.values.mdnSelection)[0];
    const { accountLevelInEligibleDetails, ajaxCallSelectedMTN, getLoanInfoPreOrder } = this.props;

    if (((mdnDetails.inEligibleCode === '08' || mdnDetails.inEligibleCode === '10' || mdnDetails.inEligibleCode === '11' || mdnDetails.inEligibleCode === '12' || mdnDetails.inEligibleCode === 'PENDING_SWITCH_ORDER' || mdnDetails.inEligibleCode === 'PENDING_ORDER') && mdnDetails.inEligibleDetails) || (accountLevelInEligibleDetails && accountLevelInEligibleDetails.toJS().accountLevelEUPInEligibleDetails)) {
      hashHistory.push(`/pendingOrder?mdn=${mdnDetails.mtn}`);
    } else if (typeof ajaxCallSelectedMTN !== 'undefined' && ajaxCallSelectedMTN !== null) {
      getLoanInfoPreOrder(mdnDetails.encryptedMTN, ajaxCallSelectedMTN);
    } else {
      this.props.changeSelectedMDN(mdnDetails);
      if (mdnDetails.annualUpgradeWarning) {
        hashHistory.push(`/annualUpgrade?mdn=${mdnDetails.mtn}`);
      } else {
        this.showSummaryView();
      }
    }
  }

  openEUPPendingModal() {
    this.setState({
      showEUPPendingModal: true,
    });
  }

  closeEUPPendingModal() {
    this.setState({
      showEUPPendingModal: false,
    });
  }

  closeEUPConfirmModal() {
    window.location.reload();
    this.setState({
      showEUPPendingConfirmation: false,
    });
  }

  cancelEUPOrder() {
    const eupOrderInfo = this.props.accountLevelInEligibleDetails && this.props.accountLevelInEligibleDetails.toJS().accountLevelEUPInEligibleDetails;
    this.closeEUPPendingModal();
    this.props.cancelPendingOrder({ url: eupOrderInfo.accountLevelInEligibleDetails.cancelPlanChangeURL ? eupOrderInfo.accountLevelInEligibleDetails.cancelPlanChangeURL : this.props.selectedMDN.inEligibleDetails, selectedMTN: this.props.selectedMDN.mtn, orderType: 'EUP' });
    // this.setState({ isFetching: true });
  }

  showSummaryView(selectedMDN) {
    const mdnDetails = (typeof selectedMDN !== 'undefined' && selectedMDN != null) ? selectedMDN : this.props.mdnDetailsList.toJS().filter((mdn) => mdn.mtn === this.props.formData.toJS().chooseMDN.values.mdnSelection)[0];
    if (mdnDetails.loanInfo) {
      // hashHistory.push(`/alwaysEligible?mdn=${mdnDetails.mtn}`);
      hashHistory.push(`/dppAgreement?mdn=${mdnDetails.mtn}`);
    } else if (mdnDetails.alwaysEligibleForUpgrade) {
      hashHistory.push(`/alwaysEligible?mdn=${mdnDetails.mtn}`);
    } else if (mdnDetails.twoYearContract) {
      hashHistory.push(`/earlyTwoYear?mdn=${mdnDetails.mtn}`);
    } else {
      this.props.submitAgreement(mdnDetails.mtn, Constants.UPGRADE, mdnDetails.deviceType, mdnDetails.brand, mdnDetails.deviceId, this.props.ajaxCallUrl);
    }
  }

  render() {
    const {
      changeSelectedTransferMDN, selectedMdnDetails, mdnDetailsList, changeMDNSelectionView, changeSelectedMDN, submitAgreement, cqJSON, ajaxCallSelectedMTN, getLoanInfoPreOrder, sharedCartInfo,
    } = this.props;

    if (!mdnDetailsList) {
      return (<div />);
    }

    let showLoan = false;
    let showNormal = false;
    for (const mdn in mdnDetailsList.toJS()) {
      if (mdnDetailsList.toJS()[mdn].loanInfo !== null) {
        showLoan = true;
        break;
      }
    }
    for (const mdn in mdnDetailsList.toJS()) {
      if (mdnDetailsList.toJS()[mdn].loanInfo === null) {
        showNormal = true;
        break;
      }
    }

    // Main view for MDN Selection, user can choose which device to upgrade
    return (
      <div className="section group grid margin60 onlyBottomMargin">
        {this.state.isFetching && <Loader />}
        <Modal
          mounted={this.state.showEUPPendingConfirmation}
          style={{ width: '50%' }}
          showCloseX={false}
        >
          <h2>{cqJSON.label.DT_OD_MDN_EUP_PENDING_CONF_HEADER}</h2>
          <p className="pad20 onlyTopPad fontSize_2">{cqJSON.label.DT_OD_MDN_EUP_PENDING_CONF_MSG}</p>
          <Row className="pad20 noSidePad">
            <button className="button primary margin30 onlyRightMargin" onClick={this.closeEUPConfirmModal.bind(this)}>{cqJSON.label.DT_OD_MDN_EUP_PENDING_CONTINUE_BUTTON}</button>
          </Row>
        </Modal>
        <Modal
          mounted={this.state.showEUPPendingModal}
          closeFn={this.closeEUPPendingModal.bind(this)}
          style={{ width: '50%' }}
          showCloseX
        >
          <h2>{cqJSON.label.DT_OD_MDN_EUP_PENDING_HEADER}</h2>
          <p className="pad20 onlyTopPad fontSize_2">{cqJSON.label.DT_OD_MDN_EUP_PENDING_DESC}</p>
          <Row className="pad20 noSidePad">
            <button className="button primary margin30 onlyRightMargin" onClick={this.cancelEUPOrder.bind(this)}>{cqJSON.label.DT_OD_MDN_EUP_PENDING_CANCEL_BUTTON}</button>
            <Anchor className="displayInlineBlock bold margin20 onlyTopMargin textDecUnderline" href="#" onClick={this.closeEUPPendingModal.bind(this)}>{cqJSON.label.DT_OD_MDN_EUP_PENDING_NO_THANKS}</Anchor>
          </Row>
        </Modal>
        <Grid fluid>
          <Row className="pad36 noSidePad">
            <Col xs={9}>
              <h1 className="mdn_title">
                {cqJSON.label.DT_OD_MDN_MAIN_TITLE}
              </h1>
            </Col>
            <Col xs={3}>
              <ChatAndC2C />
            </Col>
          </Row>
          {showNormal &&
            <div className="border_grayThree noSideBorder noTopBorder noLeftBorder devicesRowWrap noBottomBorder pad36 onlyBottomPad" >
              <Row className="">
                <Col xs={8}>
                  <h2 className="mdn_title_replace bold" style={{ fontSize: '24px' }} >{cqJSON.label.DT_OD_MDN_REPLACE_TITLE}</h2>
                </Col>
              </Row>
              <hr style={{ border: '3px solid #000' }} />
              {
                mdnDetailsList.map((mdnDetails, idx) =>
                  // const test = selectedMdnDetails.mdnList.indexOf(mdnDetails.toJS().mtn) > -1) ? "background_gray_one": "f"
                  (mdnDetails.toJS().loanInfo === null && !Object.prototype.hasOwnProperty.call(selectedMdnDetails, 'checkState')) &&
                    <Col xs={12} className="noLeftBorder deviceColItem relative" key={idx}>
                      <MDNDetails
                        selectedDevice={idx}
                        mdnDetails={mdnDetails}
                        changeMDNSelectionView={changeMDNSelectionView}
                        changeSelectedMDN={changeSelectedMDN}
                        onMTNUpgrade={submitAgreement}
                        selectedMDN={this.props.selectedMDN}
                        cqJSON={cqJSON}
                        ajaxCallSelectedMTN={ajaxCallSelectedMTN}
                        getLoanInfoPreOrder={getLoanInfoPreOrder}
                        ajaxCallUrl={this.props.ajaxCallUrl}
                        changeSelectedTransferMDN={changeSelectedTransferMDN}
                        checked={selectedMdnDetails.mdnList.indexOf(mdnDetails.toJS().mtn) > -1}
                        transferUpgrade={this.props.transferUpgrade && this.props.transferUpgrade.mtnDetailsList[idx]}
                        transferTakerMTNs={this.props.transferUpgrade ? this.props.transferUpgrade.transferTakerMTNs : this.props.transferTakerMTNs && this.props.transferTakerMTNs.toJS()}
                        selectedNumber={this.selectedNumber === mdnDetails.toJS().mtn}
                        transferUpgradeCall={this.transferUpgradeCall}
                        redoTransferMdn={this.redoTransferMdn}
                        accountLevelInEligibleDetails={this.props.accountLevelInEligibleDetails && this.props.accountLevelInEligibleDetails.toJS()}
                        hideNotification={this.props.hideNotification}
                        cancelPendingOrder={this.props.cancelPendingOrder}
                      />
                      <hr style={{ border: '1px solid #ccc' }} />
                    </Col>)
              }
            </div>
          }
          {showLoan &&
            <div className="border_grayThree noSideBorder noTopBorder noLeftBorder devicesRowWrap noBottomBorder pad36 onlyBottomPad" >
              <Row className="pad18 onlyTopPad noSidePad">
                <Col xs={8}>
                  <h2 className="mdn_title_payoff bold" style={{ fontSize: '24px' }} >{cqJSON.label.DT_OD_MDN_PAYOFF_TITLE}</h2>
                </Col>
              </Row>
              <hr style={{ border: '3px solid #000' }} />
              {
                mdnDetailsList.map((mdnDetails, idx) =>
                  (mdnDetails.toJS().loanInfo !== null && !Object.prototype.hasOwnProperty.call(selectedMdnDetails, 'checkState')) &&
                  <Col xs={12} key={idx}>
                    <MDNDetails
                      selectedDevice={idx}
                      mdnDetails={mdnDetails}
                      changeMDNSelectionView={changeMDNSelectionView}
                      changeSelectedMDN={changeSelectedMDN}
                      onMTNUpgrade={submitAgreement}
                      selectedMDN={this.props.selectedMDN}
                      cqJSON={cqJSON}
                      ajaxCallSelectedMTN={ajaxCallSelectedMTN}
                      getLoanInfoPreOrder={getLoanInfoPreOrder}
                      ajaxCallUrl={this.props.ajaxCallUrl}
                      changeSelectedTransferMDN={changeSelectedTransferMDN}
                      checked={selectedMdnDetails.mdnList.indexOf(mdnDetails.toJS().mtn) > -1}
                      transferUpgrade={this.props.transferUpgrade && this.props.transferUpgrade[idx]}
                      transferTakerMTNs={this.props.transferUpgrade ? this.props.transferUpgrade.transferTakerMTNs : this.props.transferTakerMTNs && this.props.transferTakerMTNs.toJS()}
                      selectedNumber={this.selectedNumber === mdnDetails.toJS().mtn}
                      transferUpgradeCall={this.transferUpgradeCall}
                      redoTransferMdn={this.redoTransferMdn}
                      accountLevelInEligibleDetails={this.props.accountLevelInEligibleDetails}
                      showErrorNotification={this.props.showErrorNotification}
                      hideNotification={this.props.hideNotification}
                      cancelPendingOrder={this.props.cancelPendingOrder}

                    />
                    <hr style={{ border: '1px solid #ccc' }} />
                  </Col>)
              }
            </div>
          }
          <Row className="pad12 onlyLeftPad">
            <Button
              type="button"
              className="button primary"
              onClick={this.upgradeCheck}
              disabled={this.state.isDisabled}
            >{cqJSON.label.DT_OD_MDN_UPGRADE_CTA}
            </Button>
          </Row>
          {this.state.showModal &&
            <TransferUpgradeOptions
              transferMdnDetails={this.props.transferMdnDetails}
              mdnDetails={this.mdnDetails}
              cqJSON={cqJSON}
              hideTransferOverlay={this.hideTransferOverlay}
              tranferMtn={this.tranferMtn}
              disable={!this.selectedTransferMdn}
              transferTakerMTNs={this.props.transferUpgrade ? this.props.transferUpgrade.transferTakerMTNs : this.props.transferTakerMTNs && this.props.transferTakerMTNs.toJS()}
            />
          }
          {sharedCartInfo &&
            <SharedCartModal sharedCartInfo={sharedCartInfo.toJS()} isFetching={this.props.isFetchingModal} clearFunc={this.clearSharedCartfunc} />
          }
        </Grid>
      </div>
    );
  }
}
