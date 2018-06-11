import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { normalizePhoneNumber } from '../../../common/validation';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';
import AsyncComponent from '../../../common/AsyncComponent';
import TextUpdates from './textUpdates';
import ShippingAddressInvalid from './shippingAddressInvalid';

const Modal = AsyncComponent(() => import('../../../common/Modal'));
const InStorePickUp = AsyncComponent(() => import('../../containers/ispu'));

const SecurePin = AsyncComponent(() => import('../securePin'));

class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSecurePin: false,
      deviceDetails: [],
      ispuModalVisible: false,
    };
  }
  componentDidMount = () => {
    if (this.props.checkoutStates.poBoxShippingAddress) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PO_BOX_ERROR);
    } else if (this.props.checkoutStates.shippingAddressValidationError) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_VALIDATION_ERROR);
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.asyncCallStatus.data.smsDevicesFetched) {
      this.setState({
        showSecurePin: true,
        deviceDetails: nextProps.asyncCallStatus.data.output.deviceDetails,
        orderID: nextProps.asyncCallStatus.data.output.orderID,
      });
      this.props.invalidateAsyncFetch();
    }
  }
  onClickEdit = () => {
    if (this.props.authEnabled && !this.props.formEnabled) {
      this.props.fetchSMSDevices();
    } else if (!this.props.authEnabled) {
      this.props.notifySecurePinIneligible();
    } else {
      this.props.updateEditState(EDIT_STATE.SHIPPING, true);
    }
  }

  closeSecurePinModal = () => {
    this.setState({ showSecurePin: false });
  }

  securePinSuccess = () => {
    this.setState({ showSecurePin: false });
    this.props.updateEditState(EDIT_STATE.SHIPPING, true);
  }

  notifySecurePinIneligible = () => {
    const { cqContent } = this.props;
    this.props.showErrorNotification(cqContent.error.DT_OD_CHECKOUT_ADDRESS_UPDATE_PROMPT_TEXT);
  }

  showIspuModal = () => {
    this.setState({ ispuModalVisible: true });
  }

  closeIspuModal = () => {
    this.setState({ ispuModalVisible: false });
  }
  ispuSuccessful = () => {
    this.setState({ ispuModalVisible: false });
  }
  submitShippingInfo = (data) => {
    const { cqContent } = this.props;
    this.props.updateShippingAddress(data.toJS(), cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_UPDATE_FAILURE_TEXT);
  }

  render() {
    const { cqContent, addressInfo, checkoutStates, activeSMSCapableMtnList } = this.props;
    return (
      <div>
        {this.state.ispuModalVisible &&
          <Modal
            mounted
            closeFn={this.closeIspuModal}
            showCloseX
            underlayColor="rgba(0,0,0,0.8)"
          >
            <InStorePickUp
              closeModal={this.ispuSuccessful}
            />
          </Modal>
        }
        {this.state.showSecurePin &&
          <Modal
            mounted
            closeFn={this.closeSecurePinModal}
            underlayColor="rgba(0,0,0,0.8)"
          >
            <SecurePin
              deviceDetails={this.state.deviceDetails}
              orderID={this.props.orderID}
              closeModal={this.closeSecurePinModal}
              initialValues={{ smsDevice: this.props.loginMTN }}
              cqContent={cqContent}
              sendSMS={this.props.sendSMS}
              validateAuthCode={this.props.validateAuthCode}
              asyncCallStatus={this.props.asyncCallStatus}
              invalidateAsyncFetch={this.props.invalidateAsyncFetch}
              securePinSuccess={this.securePinSuccess}
            />
          </Modal>
        }
        {(checkoutStates.poBoxShippingAddress || checkoutStates.shippingAddressValidationError) ?
          <ShippingAddressInvalid
            cqContent={cqContent}
            addressInfo={addressInfo}
            checkoutStates={checkoutStates}
            showIspuModal={this.showIspuModal}
            onClickEdit={this.onClickEdit}
            ispuEligibleFlag={this.props.ispuEligibleFlag}
          />
          : (
            <Row>
              <Col
                xs={6}
                style={{ wordWrap: 'break-word' }}
              >             {/* Title */}
                <div className="margin12 onlyBottomMargin">
                  <h3 className="displayInlineBlock verticalBottom">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE}</h3>
                  <EditButton onClick={this.onClickEdit} />
                </div>
                {/* Shipping Address */}
                {addressInfo.businessName &&
                  <p>{addressInfo.businessName}</p>
                }
                {(addressInfo.firstName || addressInfo.lastName) &&
                  <p> {addressInfo.firstName} {addressInfo.lastName}</p>
                }
                <p>{addressInfo.address1}</p>
                {addressInfo.address2 &&
                  <p>{addressInfo.address2}</p>
                }
                <p>{addressInfo.city}, {addressInfo.state}, {addressInfo.zipcode}</p>
                <p>{normalizePhoneNumber(addressInfo.phoneNumber)}</p>
                <p> {addressInfo.email}</p>
              </Col>
              <Col xs={6}>
                <TextUpdates
                  cqContent={cqContent}
                  activeSMSCapableMtnList={activeSMSCapableMtnList}
                  initialValues={{
                    optInMtn: this.props.textUpdateNumber,
                    optInShippingSMS: activeSMSCapableMtnList && activeSMSCapableMtnList.length > 0,
                    optInPaperFree: true,
                  }}
                />
              </Col>
            </Row>
          )}
      </div>
    );
  }
}

ShippingAddress.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  updateEditState: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  loginMTN: PropTypes.string,
  orderID: PropTypes.string,
  sendSMS: PropTypes.func,
  validateAuthCode: PropTypes.func,
  asyncCallStatus: PropTypes.object,
  fetchSMSDevices: PropTypes.func,
  showErrorNotification: PropTypes.func,
  authEnabled: PropTypes.bool,
  formEnabled: PropTypes.bool,
  notifySecurePinIneligible: PropTypes.func,
  updateShippingAddress: PropTypes.func,
  // ispuEligibleFlag: PropTypes.bool,
  checkoutStates: PropTypes.object,
  textUpdateNumber: PropTypes.string,
  activeSMSCapableMtnList: PropTypes.array,
  ispuEligibleFlag: PropTypes.bool,
};
export default ShippingAddress;
