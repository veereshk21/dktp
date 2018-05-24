import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizePhoneNumber } from '../../../common/validation';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';

class ShippingAddress extends Component {
  onClickEdit = () => {
    // Check for SMS Auth
    // Redirect to SMS Auth
    // SMS Auth Call action to set master state to edit
    this.props.updateEditState(EDIT_STATE.SHIPPING, true);
  }

  render() {
    const { cqContent, addressInfo } = this.props;
    return (
      <div>
        {/* Title */}
        <div className="margin12 onlyBottomMargin">
          <h3 className="fontSize_5 displayInlineBlock verticalBottom">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE}</h3>
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
      </div>
    );
  }
}

ShippingAddress.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  updateEditState: PropTypes.func,
};
export default ShippingAddress;
