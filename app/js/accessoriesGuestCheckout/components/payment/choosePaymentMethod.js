import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Row, Col } from 'react-flexbox-grid';
import * as validation from '../../../common/validation';
import AddNewCardForm from './addNewCard';
import BillingAddressForm from './billingAddressForm';
import GiftCards from '../../containers/payment/giftCards';
import Button from '../../../common/Button/Button';
import { EDIT_STATE } from '../../constants';

class ChoosePaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.cardinalInit = false;
  }

  componentDidMount = () => {
    const {
      handle3dPaymentValidated, dispatchErrorNotification, authInfo, cqContent,
    } = this.props;
    const _this = this;
    const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };

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
            _this.cardinalInit = true;
            window.cardinalInit = true;
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
                  dispatchErrorNotification(cqContent.error.DT_OD_CHECKOUT_PAYMENT_3D_SECURE_FAILURE);
                  window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
                  break;

                case 'ERROR': // Handle service level error
                  // eslint-disable-next-line no-console
                  console.log('ERROR');
                  dispatchErrorNotification(cqContent.error.DT_OD_CHECKOUT_PAYMENT_3D_SECURE_FAILURE);
                  window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
                  break;

                default:
                  break;
              }
            } else {
              _this.cardinalInit = false;
            }
          });
        } catch (e) {
          // An error occurred
          _this.cardinalInit = false;
          // eslint-disable-next-line no-console
          console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
        }
      }
    }
  }

  componentWillUnmount() {
    if (window.Cardinal) {
      // eslint-disable-next-line no-console
      console.log('Component UnMounted from ChoosePaymentMethod ::: RD');
      window.Cardinal.off('payments.validated');
    }
  }
  onCancel = () => {
    this.props.updateEditState(EDIT_STATE.PAYMENT, false);
  }
  onChoosePaymentMethod = () => {
    const {
      addNewCard,
      forms,
      pieEnabled,
      giftCardList,
      authInfo,
      billingAddress,
    } = this.props;

    // New Card
    // Checking for Cardinal's 3D Secure JS
    if (window.Cardinal && authInfo) {
      // 3D Secure initialization and registering Event Handlers
      try {
        if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
          window.Cardinal.trigger('accountNumber.update', forms.addNewCard.values.card_number.slice(0, 6));
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
      }
    }
    addNewCard({ ...forms.addNewCard.values, card_zip: billingAddress.zipcode, cardType: validation.getCardType(forms.addNewCard.values.card_number), billingAddress }, false, pieEnabled, giftCardList, this.cardinalInit);
  }

  render() {
    const {
      cqContent, testVersion, forms, stepsCompleted, billingInfo, shippingAddress,
    } = this.props;

    const sameAsShipping = (forms.billingAddress && forms.billingAddress.values) ? forms.billingAddress.values.sameAsShipping === 'true' : 'false';
    const initialBillingAddress = billingInfo.billingAddress && billingInfo.billingAddress.sameAsShipping ? shippingAddress : billingInfo.billingAddress;

    if (window.page) {
      window.page.testVersion = testVersion;
    }
    return (
      <div>
        <div className="border_grayThree onlyBottomBorder pad12 onlyBottomPad">
          <AddNewCardForm
            cqContent={cqContent}
            billingInfo={billingInfo}
            initialValues={{
              card_zip: billingInfo && billingInfo.billingAddress ? billingInfo.billingAddress.zipcode : null,
            }}
          />

          <BillingAddressForm
            cqContent={cqContent}
            states={this.props.states}
            sameAsShipping={sameAsShipping}
            initialValues={{ ...initialBillingAddress, sameAsShipping: billingInfo.billingAddress.sameAsShipping ? 'true' : 'false' }}
            shippingAddress={shippingAddress}
          />

          <GiftCards />

        </div>

        <div className="width100 margin24 onlyTopMargin clearfix">
          {stepsCompleted.paymentInfo &&
            <button
              className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
              onClick={this.onCancel}
            >
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_CANCEL}
            </button>
          }
          <Button
            className="primary button large"
            type="submit"
            disabled={!(forms.addNewCard && !forms.addNewCard.syncErrors && forms.giftCardsForm && !forms.giftCardsForm.syncErrors && forms.billingAddress && !forms.billingAddress.syncErrors)}
            onClick={this.onChoosePaymentMethod}
          >
            {cqContent.label.DT_OD_CHECKOUT_PAYMENT_BUTTON_TEXT}
          </Button>

        </div>
      </div>
    );
  }
}

ChoosePaymentMethod.propTypes = {
  cqContent: PropTypes.object,
  testVersion: PropTypes.string,
  handle3dPaymentValidated: PropTypes.func,
  dispatchErrorNotification: PropTypes.func,
  authInfo: PropTypes.object,
  billingInfo: PropTypes.object,
  updateEditState: PropTypes.func,
  addNewCard: PropTypes.func,
  forms: PropTypes.object,
  pieEnabled: PropTypes.bool,
  giftCardList: PropTypes.array,
  stepsCompleted: PropTypes.object,
  states: PropTypes.array,
  shippingAddress: PropTypes.object,
  billingAddress: PropTypes.object,
};
export default ChoosePaymentMethod;
