import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

import AsyncComponent from '../../common/AsyncComponent';

/* Page Components */
import SmallDescription from './SmallDescription';
import AccessoryListComponent from './AccessoryList';

/* Page Containers */
import PageTitleContainer from '../containers/PageTitleContainer';
import EstimatedDeliveryContainer from '../containers/EstimatedDeliveryContainer';
import TradeInListContainer from '../containers/TradeInListContainer';

const OrderInfoContainer = AsyncComponent(() => import('../containers/OrderInfoContainer'));
const InfoGridDetailsContainer = AsyncComponent(() => import('../containers/InfoGridDetailsContainer'));
const DeviceListContainer = AsyncComponent(() => import('../containers/DeviceListContainer'));
const PlanListContainer = AsyncComponent(() => import('../containers/PlanListContainer'));


/* eslint-disable react/prefer-stateless-function */
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.onDoneButtonClick = this.onDoneButtonClick.bind(this);
    this.onNotNowButtonClick = this.onNotNowButtonClick.bind(this);
    this.onLearnHowButtonClick = this.onLearnHowButtonClick.bind(this);
  }

  onDoneButtonClick(event) {
    this.props.handleActionDone(event.target.value);
  }

  onNotNowButtonClick(event) {
    this.props.handleActionNotNow(event.target.value);
  }

  onLearnHowButtonClick(event) {
    this.props.handleActionLearn(event.target.value);
  }

  print(e) {
    e.preventDefault();
    window.print();
  }

  renderSaveContent() {
    const wrapperStyles = {
      textAlign: 'left',
      background: '#e3e3e3',
      height: 'auto',
      margin: '25px -46.6% 0 -50%',
      padding: '30px 46.6% 30px 50%',
      overflow: 'hidden',
    };
    return (
      <section className="background_gray_three" style={wrapperStyles}>
        <section className="pad20 noSidePad">
          <div>
            <h2 className="fontSize_11">{this.props.cqJSON.label.DT_OD_CONFIMARTION_GET_HEAD_START}</h2>
            <p className="fontSize_6 bold pad10 noSidePad" dangerouslySetInnerHTML={{ __html: this.props.cqJSON.label.DT_OD_CONFIMARTION_SAVE_DATA }} />
          </div>
          <ul className="plainList clearfix margin40 noSideMargin">
            <li className="floatLeft width50 ">
              <span className="floatLeft confirmation_circle textAlignCenter background_gray_six fontSize_11 margin20 onlyRightMargin">1</span>
              <p className="floatLeft width80">
                <span className="color_666" dangerouslySetInnerHTML={{ __html: this.props.cqJSON.label.DT_OD_CONFIMARTION_BACKUP_DATA }} />
                <a className="block textDecUnderline margin10 onlyTopMargin" href=" /support/transfer-contacts-and-media/" target="_blank" dangerouslySetInnerHTML={{ __html: this.props.cqJSON.label.DT_OD_CONFIMARTION_EASY_FILE_TRANSFER }} />
              </p>
            </li>
            <li className="floatLeft width50">
              <span className="floatLeft confirmation_circle textAlignCenter background_gray_six fontSize_11 margin20 onlyRightMargin">2</span>
              <p className="floatLeft width80">
                <span className="color_666">
                  {this.props.cqJSON.label.DT_OD_CONFIMARTION_ACTIVATE_NEW_DEVICE}
                </span>
                <a className="block textDecUnderline margin10 onlyTopMargin" href="/solutions-and-services/activate-my-device/" target="_blank">{this.props.cqJSON.label.DT_OD_CONFIMARTION_EASY_TO_ACTIVATE}</a>
              </p>
            </li>
          </ul>
        </section>
      </section>
    );
  }

  render() {
    const {
      tradeInStatus,
      transformedTradeInPromoDetails,
      confirmationEmail,
      userNote,
      cqJSON,
      billingInfo,
    } = this.props;
    return (
      <div className="margin20 onlySideMargin">

        <div className="pad20 noSidePad">
          <PageTitleContainer />
          <EstimatedDeliveryContainer />
          { tradeInStatus ?
            <div className="pad10 onlyTopPad">
              <OrderInfoContainer />
              <SmallDescription text={`${cqJSON.label.DT_OD_CONFIRMATION_MESSAGE} ${userNote}`} />
            </div> :
            <div>
              <div className="pad10 onlyTopPad">
                <p className="margin15 onlyTopMargin">You will receive a confirmation email at <span className="bold">{confirmationEmail}</span></p>
                <OrderInfoContainer />
              </div>
            </div>
          }
          {tradeInStatus ?
            <div className="">
              <SmallDescription text={`${cqJSON.label.DT_OD_CONFIRMATION_MESSAGE} ${confirmationEmail}`} />
            </div> : ''
          }
          <a
            href="d"
            onClick={this.print.bind(this)}
            className="font-icon_print textDecUnderline inlineBlock margin15 onlyTopMargin"
          ><span className="margin15 onlyLeftMargin confirmation_print" dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_CONFIRMATION_PRINT }} />
          </a>
        </div>

        <div>
          {this.renderSaveContent()}
        </div>

        <InfoGridDetailsContainer />

        <h1 className="margin40 onlyTopMargin pad10 noSidePad">{cqJSON.label.DT_OD_CONFIMARTION_ORDER_SUMMARY}</h1>
        {this.props.devices.items && <div><DeviceListContainer /> <hr className="margin20 noSideMargin" /></div>}
        {this.props.devices.accessoriesBundle.length > 0 && <div><AccessoryListComponent accessoryBundleData={this.props.devices.accessoriesBundle} cqKeys={cqJSON} /> <hr className="margin20 noSideMargin" /></div>}
        {this.props.devices.accessories.length > 0 && <div><AccessoryListComponent accessoryData={this.props.devices.accessories} cqKeys={cqJSON} /> <hr className="margin20 noSideMargin" /></div>}
        {this.props.accessories && this.props.accessories.length > 0 && <div><AccessoryListComponent accessoryData={this.props.accessories} cqKeys={cqJSON} /> <hr className="margin20 noSideMargin" /></div>}
        <PlanListContainer />
        <Row className="color_666">
          <Col md={4} lg={4} className="">
            <h4 className="textAlignLeft margin20 noSideMargin color_000"> {this.props.cqJSON.label.DT_OD_CONFIMARTION_HEADS_UP} </h4>
            <p className="floatLeft fontSize_2"> {this.props.cqJSON.label.DT_OD_CONFIRMATION_HELP_US_INFOMATION} </p>
          </Col>
          <Col md={4} lg={4} />
          <Col md={4} lg={4} className="floatRight">
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_TODAY_SUBTOTAL}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.subTotalDueToday}</Col>
            </Row>
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_DEPOSIT_AMOUNT}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.securityDepositAmount}</Col>
            </Row>
            {this.props.totalEdgeItemDownPaymentAmount > 0 && <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_TOTAL_EDGE_ITEM_DOWN_PAYMENT_AMOUNT}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.totalEdgeItemDownPaymentAmount}</Col>
            </Row>}
            {this.props.totalEdgeUpAmount > 0 && <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_TOTAL_EDGE_UP_AMOUNT}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.totalEdgeUpAmount}</Col>
            </Row>}
            {this.props.totalEdgeUpBuyOutAmount > 0 && <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_TOTAL_EDGE_UP_BUYOUT_AMOUNT}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.totalEdgeUpBuyOutAmount}</Col>
            </Row>}
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_SHIPPING_HANDLING}</Col>
              <Col md={4} lg={4} className="textAlignRight">{this.props.selectedShippingType.price ? '$' + this.props.selectedShippingType.price : 'Free'}</Col>
            </Row>
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_STATE_SALES_TAX}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.stateSalesTax}</Col>
            </Row>
            <hr className="margin40 noSideMargin" />
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft bold">{billingInfo.selectedPaymentMode === 'BTA' ? cqJSON.label.DT_OD_CONFIMARTION_ON_NEXT_BILL : cqJSON.label.DT_OD_CONFIMARTION_TOTAL_DUE_TODAY}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.totalDueToday}</Col>
            </Row>
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft bold">{cqJSON.label.DT_OD_CONFIMARTION_TOTAL_DUE_MONTHLY}</Col>
              <Col md={4} lg={4} className="textAlignRight">${this.props.totalDueMonthlyPlanAndDevice}</Col>
            </Row>
            <Row>
              <Col md={8} lg={8}><span className="fontSize_2">{cqJSON.label.DT_OD_CONFIMARTION_AMOUNT_IN_RECURRING_BILL}</span></Col>
            </Row>
            {/* <div>
              <hr className="margin40 noSideMargin" />
              <Row className="fontSize_5 margin10 noSideMargin">
                <Col md={7} lg={7} className="textAlignLeft bold">{this.props.cqJSON.label.DT_OD_CONFIRMATION_DEVICE_BUYOUT}</Col>
                <Col md={3} lg={3} className="textAlignRight">${this.props.totalDueMonthly}</Col>
                <Col md={2} lg={2} className="textAlignRight">PAID</Col>
              </Row>
            </div>}
            <Row className="fontSize_3 margin10 noSideMargin">
              <Col md={8} lg={8} className="textAlignLeft">{this.props.cqJSON.label.DT_OD_CONFIMARTION_AMOUNT_IN_RECURRING_BILL}</Col>
            </Row>
            { <div>
              <hr className="margin40 noSideMargin" />
              <Row className="fontSize_5 margin10 noSideMargin">
                <Col md={8} lg={8} className="textAlignLeft bold">{this.props.cqJSON.label.DT_OD_CONFIRMATION_MONTHLY_SAVE}</Col>
                <Col md={4} lg={4} className="textAlignRight">${this.props.totalDueMonthly}</Col>
              </Row>
            </div> */}

          </Col>
        </Row>
        <hr className="margin20 noSideMargin" />
        {(transformedTradeInPromoDetails && transformedTradeInPromoDetails.tradeInDevices && transformedTradeInPromoDetails.tradeInDevices.length > 0) ? <div><TradeInListContainer /><hr className="margin20 noSideMargin" /></div> : ''}
        <div className="textAlignLeft margin10 noSideMargin color_666">
          <p className="bold">{cqJSON.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER}</p>
          <p className="">{cqJSON.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER_DETAILS}</p>
        </div>

      </div>
    );
  }
}

Confirmation.defaultProps = {
  userNote: '',
  doneButtonText: null,
  doneButtonLink: null,
  notNowButtonText: null,
  notNowButtonLink: null,
  learnHowButtonText: null,
  learnHowButtonLink: null,
};

Confirmation.propTypes = {
  billingInfo: PropTypes.object,
  cqJSON: PropTypes.object,
  tradeInStatus: PropTypes.bool.isRequired,
  transformedTradeInPromoDetails: PropTypes.object,
  confirmationEmail: PropTypes.string,
  userNote: PropTypes.string,
  subTotalDueToday: PropTypes.string,
  securityDepositAmount: PropTypes.string,
  stateSalesTax: PropTypes.string,
  totalDueToday: PropTypes.string,
  totalEdgeUpBuyOutAmount: PropTypes.string,
  totalEdgeUpAmount: PropTypes.string,
  totalEdgeItemDownPaymentAmount: PropTypes.string,
  handleActionDone: PropTypes.func.isRequired,
  handleActionNotNow: PropTypes.func.isRequired,
  handleActionLearn: PropTypes.func.isRequired,
  devices: PropTypes.object,
  accessories: PropTypes.array,
  selectedShippingType: PropTypes.object,
  totalDueMonthlyPlanAndDevice: PropTypes.string,
};

export default Confirmation;
