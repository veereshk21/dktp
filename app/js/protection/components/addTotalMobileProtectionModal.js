import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Modal from '../../common/Modal';


export default class AddTotalMobileProtectionModal extends Component {
  static propTypes ={
    addTotalMobileProtection: PropTypes.func,
    cqContent: PropTypes.object,
    showModal: PropTypes.string,
  }

  closeModal = (data) => {
    this.props.addTotalMobileProtection(data);
  }

  render() {
    const { showModal, cqContent } = this.props;

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
              {cqContent.label.DT_OD_PROTECTION_MD_OPT_TITLE}
            </h3>
          </Col>
        </Row>
        <Row className="pad18 noSidePad">
          <Col xs={12}>
            {cqContent.label.DT_OD_PROTECTION_MD_OPT_CONTENT}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <button onClick={() => { this.closeModal('ACCEPT'); }} className="button primary">{cqContent.label.DT_OD_PROTECTION_MD_OPT_PROCEED}</button>
          </Col>
        </Row>
      </Modal>
    );
  }
}
