import { reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

// import Loader from '../../common/Loader/Loader';
// import RadioButton from './../../common/RadioButton';
// import ToolTip from '../../common/ToolTip/index';
import { parsePrice } from './../../common/Helpers';
import AsyncComponent from '../../common/AsyncComponent';

const ToolTip = AsyncComponent(() => import('../../common/ToolTip/index'));
const RadioButton = AsyncComponent(() => import('./../../common/RadioButton'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));

class MDNDetails extends React.Component {
  static propTypes = {
    cqJSON: PropTypes.object,
    mdnDetails: PropTypes.object,
    selectedDevice: PropTypes.number,
    transferUpgrade: PropTypes.object,
    transferUpgradeCall: PropTypes.func,
    redoTransferMdn: PropTypes.func,
    accountLevelInEligibleDetails: PropTypes.object,
    selectedNumber: PropTypes.string,
    showErrorNotification: PropTypes.func,
    hideNotification: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };
  }

  render() {
    const mdnDetails = this.props.transferUpgrade ? this.props.transferUpgrade : this.props.mdnDetails.toJS();
    const { cqJSON, accountLevelInEligibleDetails, selectedNumber, showErrorNotification, hideNotification } = this.props;

    if (selectedNumber) {
      if (mdnDetails.loanInfo && !mdnDetails.loanInfo.displayReturnOption && mdnDetails.loanInfo.deviceMismatchText) {
        showErrorNotification(mdnDetails.loanInfo.deviceMismatchText);
      } else {
        hideNotification();
      }
    }

    const isLineLevelEligible = mdnDetails.upgradeEligbile === true || (mdnDetails.inEligibleCode === '08' || mdnDetails.inEligibleCode === '12' || mdnDetails.inEligibleCode === '11' || mdnDetails.inEligibleCode === '10');
    const isAccLevelEligible = (accountLevelInEligibleDetails === null || (accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails && (accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '12' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '08' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER')) || (accountLevelInEligibleDetails.accountLevelAALInEligibleDetails && (accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '12' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '08' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER')));
    const upgradeEligbile = isAccLevelEligible && isLineLevelEligible;

    let mdnImgUrl = mdnDetails.imageUrl;
    let defaultImgClass = '';

    const { estimatedTradeInValue, tradeinPromoInfo } = mdnDetails;

    if (mdnImgUrl) {
      mdnImgUrl += '&wid=200&hei=200';
    } else {
      mdnImgUrl = '';
      defaultImgClass = ' mtnDefaultImg';
    }
    const isDisabled = (mdnDetails.mtnAddedToTheCart) || !upgradeEligbile || (mdnDetails.showTransferUpgrade && mdnDetails.transferUpgradeInProgress);

    return (
      <div className={isDisabled ? 'background_gray_three' : ''}>
        <Row>
          {this.state.isFetching && <Loader />}
          <Col md={1} xs={1} className="deviceRow_radio">
            <RadioButton
              id={'check' + this.props.selectedDevice}
              name="mdnSelection"
              value={mdnDetails.mtn}
              disabled={isDisabled}
              checked={selectedNumber && !isDisabled}
            />
          </Col>
          <Col md={1} xs={1}>
            <div className="deviceRow_img">
              <img className={'' + defaultImgClass} src={mdnImgUrl} srcSet={`${mdnImgUrl} 2x`} alt={mdnDetails.brand + ' Phone'} style={{ width: '100%' }} />
            </div>
          </Col>
          <Col md={2} xs={2} className="verticalMiddle">
            <div className="fontSize_4">
              {mdnDetails.nickname}
            </div>
            {(mdnDetails.showTransferUpgrade && !mdnDetails.transferUpgradeInProgress) &&
              <div className="margin12 onlyTopMargin fontSize_4 bold">
                <span
                  dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_MDN_UPGRADE_INFO_TOOLTIP_LABEL }}
                  className="textDecUnderline cursorPointer"
                  onClick={this.props.transferUpgradeCall.bind(this, mdnDetails)}
                  role="button"
                  tabIndex="0"
                  onKeyPress={this.props.transferUpgradeCall.bind(this, mdnDetails)}
                />
                <ToolTip
                  id="transfer-upgrade-tooltip"
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="transfer upgrade information tooltip"
                  text={cqJSON.label.DT_OD_MDN_UPGRADE_INFO_TOOLTIP_DESCRIPTION}
                  noRenderHTML
                />
              </div>
            }
            {(mdnDetails.showTransferUpgrade && mdnDetails.transferUpgradeInProgress) &&
              <div className="margin12 onlyTopMargin fontSize_4 bold">
                <span
                  dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_MDN_REDO_UPGRADE_INFO_TOOLTIP_LABEL }}
                  className="textDecUnderline cursorPointer"
                  onClick={this.props.redoTransferMdn.bind(this, mdnDetails)}
                  role="button"
                  tabIndex="0"
                  onKeyPress={this.props.redoTransferMdn.bind(this, mdnDetails)}
                />
              </div>
            }
            {(!mdnDetails.showTransferUpgrade && mdnDetails.transferUpgradeInProgress && mdnDetails.transferredFromMtn) &&
              <div className="fontSize_4 bold margin12 onlyTopMargin">{cqJSON.label.DT_OD_MDN_UPGRADE_TRANSFER_DESCRIPTION}&nbsp;{mdnDetails.transferredFromMtn}</div>
            }
            <div>{mdnDetails.upgradeMessage}</div>
          </Col>
          <Col md={4} xs={4} className="verticalMiddle">
            <div className="fontSize_4 margin12 onlyBottomMargin">
              <span>{mdnDetails.displayMtn}</span>
            </div>
            <div className="fontSize_4">
              <span dangerouslySetInnerHTML={{ __html: mdnDetails.displayDeviceName }} />
            </div>
          </Col>
          {!mdnDetails.loanInfo ?
            <Col md={4} xs={4} className="verticalMiddle">
              {parsePrice(estimatedTradeInValue) > 0 &&
                <div className="fontSize_4 margin12 onlyTopMargin">
                  <span>{cqJSON.label.DT_OD_MDN_TRADE_IN_TITLE}</span>
                  &nbsp;
                  <span className="bold">${estimatedTradeInValue}</span>
                </div>
              }
              {mdnDetails.myOffersPromoText &&
                <div className="margin12 onlyTopMargin fontSize_4 bold">
                  <span dangerouslySetInnerHTML={{ __html: mdnDetails.myOffersPromoText }} />
                </div>
              }
              {tradeinPromoInfo && <div className="margin12 onlyTopMargin">
                <span className="bold">{tradeinPromoInfo.promoMessage}</span>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInline"
                  ariaLabel="Trade in promo legal tooltip"
                  text={tradeinPromoInfo.legalText}
                  noRenderHTML
                />
              </div>}
            </Col> :
            <Col md={4} xs={4} className="verticalMiddle">
              {mdnDetails.loanInfo.returnOptionAmt &&
                <div className="fontSize_4">
                  <span>{cqJSON.label.DT_OD_MDN_RETURN_AMOUNT_TEXT}&nbsp;</span>
                  <span className="bold">{mdnDetails.loanInfo.returnOptionAmt}</span>
                </div>
              }
              {mdnDetails.loanInfo.keepOptionAmt &&
                <div className="fontSize_4 margin12 onlyTopMargin">
                  <span>{cqJSON.label.DT_OD_MDN_KEEP_AMOUNT_TEXT}&nbsp;</span>
                  <span className="bold">{mdnDetails.loanInfo.keepOptionAmt}</span>
                </div>
              }
            </Col>
          }
        </Row>
      </div>
    );
  }
}

export default reduxForm({
  form: 'chooseMDN',
  // validate,
})(MDNDetails);
