import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form/immutable';
import AsyncComponent from '../../../common/AsyncComponent';
import { EDIT_STATE } from '../../constants';
// import { normalizePhoneNumber } from '../../../common/validation';
// import MSelect from '../../../common/Select/index';
import EditButton from '../../../common/EditButton/index';

const StoreDetails = AsyncComponent(() => import('./storeDetails'));

const ISPUDetails = (props) => {
  const { cqContent, contactInfo } = props;
  return (
    <div>
      <Row>
        <Col
          xs={6}
          style={{ wordWrap: 'break-word' }}
        >
          <StoreDetails
            cqContent={cqContent}
            edit={props.editState[EDIT_STATE.SHIPPING]}
            updateEditState={props.updateEditState}
            ispudetailsInfo={props.ispudetailsInfo}
          />
        </Col>
        <Col xs={6}>
          <div>
            {contactInfo.phoneNumber &&
              <div>
                <h3 className="fontSize_5 displayInlineBlock verticalBottom">Contact Information</h3>
                <EditButton onClick={() => props.updateEditState(EDIT_STATE.SHIPPING, true)} />
                <p className="margin12 noSideMargin">Phone number (for order updates): {contactInfo.phoneNumber}</p>
              </div>}
            {contactInfo.emailAddress && <p>Email: {contactInfo.emailAddress}</p>}
          </div>
        </Col>
      </Row>
    </div>
  );
};


ISPUDetails.propTypes = {
  cqContent: PropTypes.object,
  updateEditState: PropTypes.func,
  ispudetailsInfo: PropTypes.object,
  editState: PropTypes.object,
  contactInfo: PropTypes.object,
  // activeSMSCapableMtnList: PropTypes.array,
};

export default reduxForm({
  form: 'ispuContactInfo',
  destroyOnUnmount: false,
})(ISPUDetails);

