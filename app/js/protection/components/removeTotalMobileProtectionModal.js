import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Modal from '../../common/Modal';

export default class RemoveTotalMobileProtectionModal extends Component {
  static propTypes ={
    removeTotalMobileProtection: PropTypes.func,
  }
  closeModal = (data) => {
    this.props.removeTotalMobileProtection(data);
  }

  render() {
    const { showModal, cqContent, stateProps } = this.props;

    return (
      <Modal
        mounted={showModal}
        closeFn={this.closeModal.bind(this, 'REJECT')}
        style={{ background: 'white', width: '500px' }}
        showCloseX
      >
        <Row>
          <Col xs={12}>
            <h3 className="border_black onlyBottomBorder pad6 onlyBottomPad">
              {stateProps.selectedPlanDetails.sorSfoType === 'INSUR,D' ? cqContent.label.DT_OD_PROTECTION_SD_OPT_TITLE : cqContent.label.DT_OD_PROTECTION_DEC_MD_OPT_TITLE}
            </h3>
          </Col>
        </Row>
        <Row className="pad18 noSidePad">
          <Col xs={12}>
            {stateProps.selectedPlanDetails.sorSfoType === 'INSUR,D' ? cqContent.label.DT_OD_PROTECTION_DEC_MD_OPT_CONTENT : cqContent.label.DT_OD_PROTECTION_SD_OPT_CONTENT}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <button type="button" onClick={() => this.closeModal('ACCEPT')} className="button button primary large onlyTopMargin">{cqContent.label.DT_OD_PROTECTION_SD_OPT_PROCEED} </button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

RemoveTotalMobileProtectionModal.propTypes = {
  showModal: PropTypes.func,
  cqContent: PropTypes.object,
  stateProps: PropTypes.object,
};
