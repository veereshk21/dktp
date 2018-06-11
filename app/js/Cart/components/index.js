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
  constructor(props) {
    super(props);
    this.onToggleClearCartModal = this.onToggleClearCartModal.bind(this);
    this.onToggleLandingModal = this.onToggleLandingModal.bind(this);
    this.onToggleContinueShopping = this.onToggleContinueShopping.bind(this);
    this.continueShoppingHandler = this.continueShoppingHandler.bind(this);
  }
  /*
   TOGGLE CLEAR CART MODAL
   */
  onToggleClearCartModal() {
    this.props.toggleModal('ClearCart');
  }

  /*
    TOGGLE LANDING MODAL
   */
  onToggleLandingModal() {
    this.props.toggleModal('LandingModal');
  }

  /*
  TOGGLE CONTINUE SHIPPING
   */
  onToggleContinueShopping(evt) {
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

  continueShoppingHandler(flow) {
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
  componentDidMount() {//eslint-disable-line
    /*
     FETCH RECOMMENDED ACCESSORIES
     */
    if (this.props.accessoryGWURL) this.props.getRecommendedAcc(this.props.accessoryGWURL);
    window.hideLoader();
    //
    const { authInfo, masterpass3DSecure, handle3dPaymentValidated, cqContent } = this.props;

    // Checking for Cardinal's 3D Secure JS
    if (window.Cardinal) {
      // 3D Secure initialization and registering Event Handlers
      if (authInfo) {
        try {
          window.Cardinal.configure({
            logging: {
              level: 'verbose',
            },
          });

          window.Cardinal.setup('init', {
            jwt: authInfo.clients.CARDINAL3DSECURE.token,
          });

          window.Cardinal.on('payments.setupComplete', () => {
            // eslint-disable-next-line no-console
            console.log('Cardinal setup Complete');
            window.cardinalInit = true;
            // Trigger 3D Secure flow for Masterpass card, exisitng cards are handled in the actions.js
            if (masterpass3DSecure) {
              window.Cardinal.continue(
                'cca',
                {
                  AcsUrl: masterpass3DSecure.acsUrl,
                  Payload: masterpass3DSecure.payload,
                },
                {
                  OrderDetails: {
                    TransactionId: masterpass3DSecure.transId,
                  },
                }
              );
            }
          });

          window.Cardinal.on('payments.validated', (data, jwt) => {
            // eslint-disable-next-line no-console
            console.log('Trigger::: ChoosePaymentMethod RD', data);

            if (typeof data.Payment !== 'undefined' && data.Payment.Type !== undefined) {
              switch (data.ActionCode) {
                case 'SUCCESS': // Handle successful authentication scenario and validate the signature on the JWT
                  // eslint-disable-next-line no-console
                  console.log('Trigger::: ChoosePaymentMethod RD ::: SUCCESS');
                  handle3dPaymentValidated(data, jwt);// dispatches handle3dPaymentValidated action
                  break;

                case 'NOACTION': // Handle unenrolled scenario
                  // eslint-disable-next-line no-console
                  console.log('Trigger::: ChoosePaymentMethod RD :: NOACTION');
                  handle3dPaymentValidated(data, jwt);
                  break;

                case 'FAILURE': // Handle authentication failed or error encounter scenario
                  // eslint-disable-next-line no-console
                  console.log('FAILURE');
                  this.props.showErrorNotification(cqContent.error.DT_OD_CART_PAYMENT_3D_SECURE_FAILURE);
                  break;

                case 'ERROR': // Handle service level error
                  // eslint-disable-next-line no-console
                  console.log('ERROR');
                  this.props.showErrorNotification(cqContent.error.DT_OD_CART_PAYMENT_3D_SECURE_FAILURE);
                  break;

                default:
                  break;
              }
            }
          });
        } catch (e) {
          // An error occurred
          // eslint-disable-next-line no-console
          console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
        }
      }
    }
  }
  render() {
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
      standaloneAccessories,
      accGuestCheckoutEnabled,
      authenticated,
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
        closeFn={this.onToggleContinueShopping}
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
        closeFn={this.onToggleClearCartModal}
        style={{ width: '40%' }}
        showCloseX
      >
        <ClearCartModal cqContent={cqContent} onToggleClearCartModal={this.onToggleClearCartModal} onClearCart={this.props.clearCart} />
      </Modal>
      <div className="border_e6 noTopBorder pad12">
        <Row>
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
                {!accountMember && (authenticated && !accGuestCheckoutEnabled) &&
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
            {standaloneAccessories && !authenticated && accGuestCheckoutEnabled &&
              <Row className="pad60 onlyTopPad">
                <Col xs={12} >
                  <p className="legal margin18 onlyBottomMargin">{cqContent.label.DT_OD_STANDALONE_ACCESSORY_CART_POBO_DISCLAIMER}</p>
                  <p className="legal margin18 onlyBottomMargin">{cqContent.label.DT_OD_STANDALONE_ACCESSORY_CART_TAX_DISCLAIMER}</p>
                  <p className="legal margin18 onlyBottomMargin">{cqContent.label.DT_OD_STANDALONE_ACCESSORY_CART_AVAILABILITY_DISCLAIMER}</p>
                </Col>
              </Row>
            }
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
  authInfo: PropTypes.object,
  masterpass3DSecure: PropTypes.object,
  handle3dPaymentValidated: PropTypes.func,
  showErrorNotification: PropTypes.func,
  standaloneAccessories: PropTypes.bool,
  accGuestCheckoutEnabled: PropTypes.bool,
  authenticated: PropTypes.bool,
};
export default Index;
