import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import Sticky from 'react-stickynode';
import Anchor from './../../common/A/A';
import Loader from '../../common/Loader/Loader';
import Notification from './../../common/Notification/Notification';
import AsyncComponent from '../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';

const Modal = AsyncComponent(() => import('../../common/Modal/index'));
const DeviceDetails = AsyncComponent(() => import('./../containers/DeviceDetails'));
const OrderSummary = AsyncComponent(() => import('./../containers/OrderSummary'));

const ContinueShoppingModal = AsyncComponent(() => import('./ContinueShoppingModal'));
const ClearCartModal = AsyncComponent(() => import('./ClearCartModal'));
class Index extends Component {
  state = {
    showLandingModal: true,
  }

  componentDidMount() {
    /*
    FETCH RECOMMENDED ACCESSORIES
     */
    if (this.props.accessoryGWURL) this.props.getRecommendedAcc(this.props.accessoryGWURL);

    window.hideLoader();
  }

  /*
   TOGGLE CLEAR CART MODAL
   */
  onToggleClearCartModal = () => {
    this.props.toggleModal('ClearCart');
  }

  /*
    TOGGLE LANDING MODAL
   */
  onToggleLandingModal = () => {
    this.props.toggleModal('LandingModal');
  }

  /*
  TOGGLE CONTINUE SHIPPING
   */
  onToggleContinueShopping = (evt) => {
    evt.preventDefault();
    this.props.toggleModal('ContinueShopping');
  }

  onCartBack = (e) => {
    e.preventDefault();
    history.back();
  }

  redirectToTradeIn() {
    window.location = this.props.tradeInUrl;
  }

  continueShoppingHandler = (flow) => {
    const { aalUrl, eupUrl, byodUrl } = this.props; //eslint-disable-line
    const gwUrl = '/od/smartphones/'; // fallout redirection
    if (flow === 'aal') {
      window.location = aalUrl || gwUrl;
    } else if (flow === 'eup') {
      window.location = eupUrl || gwUrl;
    } else if (flow === 'byod') {
      window.location = byodUrl || '/od/cust/auth/shop?flow=NSO';
    }
  }

  render() {
    // const {
    //   cqContent, totalItems, asyncCallStatus, cartMessages, emptyCartFlag, emailResponse, lastIntent, accountMember,
    // } = this.props;
    // const { isContinueShoppingVisible, showClearCartModal, showLandingModal } = this.props.modalStatus;
    const {
      cqContent,
      totalItems,
      asyncCallStatus,
      cartMessages,
      emptyCartFlag,
      emailResponse,
      accountMember,
      allowAAL,
      allowEUP,
    } = this.props;
    const {
      isContinueShoppingVisible,
      showClearCartModal,
    } = this.props.modalStatus;
    // const LandingModal = AsyncComponent(() => import('./LandingModal'));
    // const landingModalCheck = (showLandingModal && !accountMember && lastIntent) || false;

    return (<div className="section group grid positionRelative color_333">
      {asyncCallStatus.isFetching === true && <Loader />}
      <Modal
        mounted={isContinueShoppingVisible}
        closeFn={this.onToggleContinueShopping.bind(this)}
        style={{ width: '40%' }}
        showCloseX
      >
        <ContinueShoppingModal
          cqContent={cqContent}
          allowAAL={allowAAL}
          allowEUP={allowEUP}
          onContinueShoppingHandler={this.continueShoppingHandler}
        />
      </Modal>

      {/* <Modal
        mounted={landingModalCheck}
        closeFn={() => this.onToggleLandingModal()}
        style={{ width: '40%' }}
        showCloseX
      >
        <LandingModal
          cqContent={cqContent}
          lastIntent={lastIntent}
          redirectToTradeIn={() => this.redirectToTradeIn()}
          closeFn={() => this.onToggleLandingModal()}
        />
      </Modal> */}
      <Modal
        mounted={showClearCartModal}
        closeFn={() => this.onToggleClearCartModal()}
        style={{ width: '40%' }}
        showCloseX
      >
        <ClearCartModal cqContent={cqContent} onToggleClearCartModal={this.onToggleClearCartModal} onClearCart={this.props.clearCart} />
      </Modal>
      <div className="border_e6 noTopBorder pad12">
        <Row middle="xs">
          <Col md={9} lg={9}>
            <Anchor
              className="block bold fontSize_4 textDecNone continueShop_link"
              onClick={this.onCartBack}
            >
              {cqContent.label.DT_OD_CART_BACK_LINK}
            </Anchor>
          </Col>
          <Col md={3} lg={3}>
            <ChatAndC2C />
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md={8} lg={9} sm={9} style={{ paddingRight: 0 }}>
            <div className="border_e6 noTopBorder">
              <div className="border_e6 onlyBottomBorder pad12">
                <div className="margin12">
                  <Row bottom="md">
                    <Col className="margin12 onlyBottomMargin">
                      <h1
                        className="fontSize_13 displayInline"
                      >{cqContent.label.DT_OD_CART_TITLE}
                      </h1>
                    </Col>
                    <Col className="margin12 onlyBottomMargin pad12 onlyLeftPad">
                      <span className="displayInline fontSize_5">&nbsp;{`${totalItems} ${cqContent.label.DT_OD_CART_ITEMS_TEXT}`}</span>
                    </Col>
                    <Col className="margin12 onlyBottomMargin">
                      {emptyCartFlag === false && <Anchor className="margin12 onlyLeftMargin fontSize_5" onClick={this.onToggleClearCartModal}>{cqContent.label.DT_OD_CART_CLEAR_CART_LINK}</Anchor>}
                    </Col>
                  </Row>
                  {/* <Anchor href="" className="floatRight fontSize_4 margin25 onlyTopMargin bold textDecUnderline textAlignRight">{cqContent.label.DT_OD_CART_BRING_YOUR_OWN_DEVICE}</Anchor> */}
                </div>
                {!accountMember &&
                  <div className="margin24 onlyTopMargin">
                    <div className="margin12 onlySideMargin">
                      <Row middle="md">
                        <Col className="margin12 onlyBottomMargin">
                          <button type="button" onClick={this.onToggleContinueShopping} className="button secondary margin15 onlyRightMargin">{cqContent.label.DT_OD_CART_SHOP_DEVICE_TEXT}</button>
                        </Col>
                        <Col className="margin12 onlyBottomMargin">
                          <button type="button" onClick={() => { window.location.href = this.props.accessoryShopURL; }} className="button secondary margin15 onlyRightMargin">{cqContent.label.DT_OD_CART_SHOP_ACCESSORIES_TEXT}</button>
                        </Col>
                        <Col className="margin12 onlyBottomMargin">
                          <Anchor href={this.props.byodUrl} className="fontSize_4 margin25 onlyTopMargin bold textDecUnderline">{cqContent.label.DT_OD_CART_BYOD_TEXT}</Anchor>
                        </Col>
                      </Row>
                    </div>
                  </div>
                }
                {cartMessages && cartMessages.message && cartMessages.message.length > 0 && <div className="margin12 onlyTopMargin">
                  {emailResponse && emailResponse.cartSaved ?
                    <Notification type={`${cartMessages.cartReadyforCheckout ? 'info' : 'error'}`} message={emailResponse.cartSavedMessage} />
                    :
                    <Notification type={`${cartMessages.cartReadyforCheckout ? 'info' : 'error'}`} message={cartMessages.message} />
                  }
                </div>}
              </div>
              <DeviceDetails />
            </div>
          </Col>
          <Col md={4} lg={3} sm={3} style={{ paddingLeft: 0 }}>
            <Sticky bottomBoundary="#app">
              <div className="border_e6 noTopBorder pad12" >
                <OrderSummary />
              </div>
            </Sticky>
          </Col>
        </Row>
      </div>
    </div>);
  }
}
Index.propTypes = {
  cqContent: PropTypes.object,
  asyncCallStatus: PropTypes.object,
  totalItems: PropTypes.number,
  cartMessages: PropTypes.object,
  emptyCartFlag: PropTypes.bool,
  clearCart: PropTypes.func,
  modalStatus: PropTypes.object,
  toggleModal: PropTypes.func,
  tradeInUrl: PropTypes.string,
  accessoryGWURL: PropTypes.string,
  getRecommendedAcc: PropTypes.func,
  aalUrl: PropTypes.string,
  eupUrl: PropTypes.string,
  emailResponse: PropTypes.object,
  // lastIntent: PropTypes.string,
  accountMember: PropTypes.bool,
  byodUrl: PropTypes.string,
  accessoryShopURL: PropTypes.string,
  allowAAL: PropTypes.bool,
  allowEUP: PropTypes.bool,
};
export default Index;
