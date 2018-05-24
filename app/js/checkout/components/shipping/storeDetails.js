import React from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../../common/EditButton/index';
import { EDIT_STATE } from '../../constants';

const StoreDetails = (props) => {
  const { cqContent, edit } = props;
  const { storeAddress, storeHours } = props.ispudetailsInfo;
  const storeHoursArray = [];
  if (storeHours) {
    for (const x in storeHours) {
      storeHoursArray.push(`${x}: ${storeHours[x]}`);
    }
  }
  return (
    <div>
      {/* Title */}
      <div className="margin18 onlyBottomMargin">
        <div className="margin12 onlyBottomMargin">
          <h3 className="fontSize_5 displayInlineBlock verticalBottom">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_NOTIFICATON_TITLE}</h3>
          {!edit &&
            <EditButton onClick={() => props.updateEditState(EDIT_STATE.SHIPPING, true)} />
          }
        </div>
        <p className="margin12 noSideMargin">
          {edit ? cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_NOTIFICATON_EDIT_DESCRIPTION : cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_NOTIFICATON_DESCRIPTION}
        </p>
      </div>
      <div className="margin18 noSideMargin">
        <h3 className="fontSize_5 margin12 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_STORE_ADDRESS_TITLE}</h3>
        <p>{props.ispudetailsInfo.storeName}</p>
        <p>{storeAddress.address1},</p>
        {storeAddress.address2 &&
          <p>{storeAddress.address2},</p>
        }
        <p>{storeAddress.state}, {storeAddress.city}, {storeAddress.zipcode}</p>
        <p>{storeAddress.phoneNumber}</p>
      </div>
      <div className="margin18 noSideMargin">
        <h3 className="fontSize_5 margin12 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_STORE_HOURS_TITLE}</h3>
        {storeHoursArray.map((day, index) => (
          <p key={`storeHour-${index}`}>{day}</p>
        ))}
      </div>
      {edit &&
        <button
          className="fontSize_3 link background_transparent displayInlineBlock bold borderSize_0 noPad"
          onClick={props.showIspuModal}
        >
          {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_CHANGE_STORE}
        </button>
      }
    </div>
  );
};


StoreDetails.propTypes = {
  cqContent: PropTypes.object,
  edit: PropTypes.bool,
  ispudetailsInfo: PropTypes.object,
  updateEditState: PropTypes.func, //eslint-disable-line
  showIspuModal: PropTypes.func,
};
export default StoreDetails;
