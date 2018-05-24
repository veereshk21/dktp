import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import TextUpdates from './textUpdates';
import IspuEditDetails from './ispuEditDetails';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import NotificationBar from '../../../common/NotificationBar';
import AsyncComponent from '../../../common/AsyncComponent';

const ShippingAddress = AsyncComponent(() => import('./shippingAddress'));
const ShippingAddressEdit = AsyncComponent(() => import('../../containers/shipping/shippingAddressEdit'));
const IspuDetails = AsyncComponent(() => import('./ispuDetails'));
const ShippingMethod = AsyncComponent(() => import('../../containers/shipping/shippingMethod'));

class ShippingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddressType: '',
    };
  }

  render() {
    const { cqContent, editState, activeSMSCapableMtnList, ISPUSelected, checkoutStates } = this.props;
    const textUpdateNumber = activeSMSCapableMtnList && activeSMSCapableMtnList.length > 0 ? activeSMSCapableMtnList[0] : null;

    if (!checkoutStates.showShippingAddress && !checkoutStates.showDeliveryMethod) {
      return null;
    }

    return (
      <div id="shippingSection">
        <NotificationBar section={NOTIFICATIONS.SHIPPING} />
        <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
          <h2 className="h1 margin24 onlyBottomMargin"> {cqContent.label.DT_OD_CHECKOUT_SHIPPING_TITLE} </h2>


          {/* Shipping Address */}
          {!(editState[EDIT_STATE.SHIPPING] || ISPUSelected) && checkoutStates.showShippingAddress &&
            <div>
              <Row>
                <Col
                  xs={6}
                  style={{ wordWrap: 'break-word' }}
                >
                  <ShippingAddress
                    cqContent={cqContent}
                    addressInfo={this.props.addressInfo}
                    updateEditState={this.props.updateEditState}
                  />
                </Col>
                <Col xs={6}>
                  <TextUpdates
                    cqContent={cqContent}
                    activeSMSCapableMtnList={activeSMSCapableMtnList}
                    initialValues={{
                      optInMtn: textUpdateNumber,
                      optInShippingSMS: activeSMSCapableMtnList && activeSMSCapableMtnList.length > 0,
                      optInPaperFree: true,
                    }}
                  />
                </Col>
              </Row>
              <div className="margin24 noSideMargin">
                <p>{cqContent.label.DT_OD_CHECKOUT_SIGNATURE_REQUIRED_DISCLAIMER}</p>
              </div>
            </div>
          }

          {/* Shipping Address Edit */}
          {editState[EDIT_STATE.SHIPPING] && (!ISPUSelected || (ISPUSelected && this.props.ispuChangeToShip)) && checkoutStates.showShippingAddress &&
            <ShippingAddressEdit />
          }

          {/* ISPU */}
          {ISPUSelected && !editState[EDIT_STATE.SHIPPING] &&
            <IspuDetails
              {...this.props}
              initialValues={{
                email: this.props.contactInfo.emailAddress,
                phoneNumber: this.props.contactInfo.phoneNumber,
                shippingAddressType: 'ISPU',
              }}
            />
          }

          {/* Edit ISPU */}
          {ISPUSelected && !this.props.ispuChangeToShip && editState[EDIT_STATE.SHIPPING] &&
            <IspuEditDetails
              {...this.props}
              initialValues={{
                email: this.props.contactInfo.emailAddress,
                phoneNumber: this.props.contactInfo.phoneNumber,
                shippingAddressType: 'ISPU',
              }}
            />
          }
          {/* Shipping Methods */}
          {!editState[EDIT_STATE.SHIPPING] && checkoutStates.showDeliveryMethod &&
            <div>
              <hr className="margin36 noSideMargin border_black" aria-hidden />
              <ShippingMethod />
            </div>
          }
        </div>
      </div>
    );
  }
}

ShippingSection.propTypes = {
  cqContent: PropTypes.object,
  editState: PropTypes.object,
  activeSMSCapableMtnList: PropTypes.array,
  ISPUSelected: PropTypes.bool,
  addressInfo: PropTypes.object,
  updateEditState: PropTypes.func,
  contactInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
  ispuChangeToShip: PropTypes.bool,
};
export default ShippingSection;
