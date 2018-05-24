import { Row, Col } from 'react-flexbox-grid';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getParameterByName } from './../../actions';

import AsyncComponent from './../../../common/AsyncComponent';

const Button = AsyncComponent(() => import('./../../../common/Button/Button'));
const NewPhones = AsyncComponent(() => import('./NewPhones'));
const Modal = AsyncComponent(() => import('../../../common/Modal/index'));
const ModalContent = AsyncComponent(() => import('./ModalContent'));
const OtherPhones = AsyncComponent(() => import('./OtherPhones'));
const NewDevices = AsyncComponent(() => import('./NewDevices'));
const OtherDevice = AsyncComponent(() => import('./OtherDevices'));
const DiscountContent = AsyncComponent(() => import('./DiscountContent'));
const AutoPayOffer = AsyncComponent(() => import('./AutoPayOffer'));
const UpgradedDevices = AsyncComponent(() => import('./UpgradedDevices'));
const PlanCost = AsyncComponent(() => import('./PlanCost'));


/* import Button from './../../../common/Button/Button';
import NewPhones from './NewPhones';
import Modal from '../../../common/Modal/index';
import ModalContent from './ModalContent';
import OtherPhones from './OtherPhones';
import NewDevices from './NewDevices';
import OtherDevice from './OtherDevices';
import DiscountContent from './DiscountContent';
import AutoPayOffer from './AutoPayOffer';
import UpgradedDevices from './UpgradedDevices';
import PlanCost from './PlanCost';*/


class CartSummaryComponent extends Component {
  static propTypes = {
    updatePlanPromptInfo: PropTypes.object,
    cq: PropTypes.object.isRequired,
    planSorId: PropTypes.string,
    keepCurrentPlan: PropTypes.bool,
    keepCurrentPlanURL: PropTypes.string,
    seePlanFeatures: PropTypes.func,
    isMultiUpgrade: PropTypes.bool,
    multiUpgradeContent: PropTypes.object,
    multiUpgradeCheck: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.updatePlanProceed = this.updatePlanProceed.bind(this);
    this.keepPlanProceed = this.keepPlanProceed.bind(this);
    this.state = {
      modalOpen: false,
    };
  }
  /* updateSelectedPlan = (planSorId, index) => {
    this.setState({ planSorId, index });
  } */
  updatePlanContinue = () => {
    this.setState({ modalOpen: true });
  };

  keepPlanProceed = () => {
    const { isMultiUpgrade, keepCurrentPlanURL, multiUpgradeCheck, multiUpgradeContent } = this.props;
    if (isMultiUpgrade) {
      multiUpgradeCheck(keepCurrentPlanURL, multiUpgradeContent);
    } else {
      window.location = keepCurrentPlanURL;
    }
  };

  modalClose = () => {
    this.setState({ modalOpen: false });
  };

  updatePlanProceed() {
    const { planSorId } = this.props;
    if (planSorId) {
      const acceptURL = window.compatiblePlansJSON.output.acceptURL;
      let url = `${acceptURL}?planSorId=${planSorId}`;
      const editPlan = getParameterByName('editPlan');
      const flow = getParameterByName('flow');
      const planCommId = getParameterByName('planCommId');

      if (editPlan !== null) url += `&editPlan=${editPlan}`;
      if (flow !== null) url += `&flow=${flow}`;
      if (planCommId !== null) url += `&planCommId=${planCommId}`;

      const { isMultiUpgrade, multiUpgradeCheck, multiUpgradeContent } = this.props;
      if (isMultiUpgrade) {
        multiUpgradeCheck(url, multiUpgradeContent);
      } else {
        window.location = url;
      }
    }
  }

  render() {
    const { updatePlanPromptInfo, cq, keepCurrentPlan } = this.props;

    return (
      <section>
        <Modal
          mounted={this.state.modalOpen}
          closeFn={this.modalClose}
          style={{ background: 'white', width: '580px' }}
          showCloseX
        >
          {/* Modal Content */}
          <ModalContent
            cq={cq}
            updatePlanProceed={this.updatePlanProceed}
            keepCurrentPlan={keepCurrentPlan}
            keepPlanProceed={this.keepPlanProceed}
          />
        </Modal>
        <Row style={{ margin: '0 0 36px 0' }}>
          <p>{cq.label.DT_OD_ONCE_YOU_CHANGE_TEXT}</p>
        </Row>
        <Row>
          <Col xs={7}>
            <Row>
              <Col xs={4}>
                <Button
                  className="planVerticalCenter secondaryBtnWidth primary "
                  type="button"
                  disabled={!this.props.planSorId}
                  onClick={this.updatePlanContinue}
                  style={{ width: '100%' }}
                >
                  Select this plan
                </Button>
              </Col>
              {updatePlanPromptInfo.jaxPlan &&
                <Col xs={4}>
                  <Button
                    className="planVerticalCenter secondaryBtnWidth secondary "
                    type="button"
                    onClick={this.props.seePlanFeatures.bind(this)}
                    style={{ width: '100%' }}
                  >
                    See details
                  </Button>
                </Col>
              }
            </Row>
            <Row>
              <Col xs={11} className="fontSize_1 margin36 onlyTopMargin">
                {cq.label.DT_OD_TOTAL_DUE_TEXT}
              </Col>
            </Row>
          </Col>
          <Col xs={5} style={{ paddingLeft: '30px' }}>
            <Accordion className="width100">
              {
                <AccordionItem className="accordionItem">
                  <AccordionItemTitle className="textCenter noOutline pointer accordion__title">
                    <div style={{ width: '90%', display: 'inline-block' }}>
                      <Row>
                        <Col xs={8}>
                          <span className="bold fontSize_9 orderSummarySidebar_mainHeading color_00">
                            {cq.label.DT_OD_PLAN_DUE_MONTHLY_TEXT}:
                          </span>
                        </Col>
                        {updatePlanPromptInfo.discounted && updatePlanPromptInfo.totalDiscountedPlanPrice ?
                          <Col xs={4} className="textRight">
                            <span className="bold fontSize_9 orderSummarySidebar_mainHeading color_00 textAlignRight">${updatePlanPromptInfo.totalDiscountedPlanPrice}</span>
                          </Col> :
                          <Col xs={4} className="textRight">
                            <span className="bold fontSize_9 orderSummarySidebar_mainHeading color_00 textAlignRight">${updatePlanPromptInfo.totalPlanPrice}</span>
                          </Col>
                        }
                      </Row>
                    </div>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <div className="section group min-height500" style={{ width: '100%' }} >
                      <Row className=" min-height500">
                        <Col xs={12}>
                          {/* Promo Content */}
                          <AutoPayOffer updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />

                          {/* Plan Cost for non Jax plans */}
                          <PlanCost updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />

                          {/* New Phones */}
                          <NewPhones updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />

                          {/* New Devices */}
                          <NewDevices updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />

                          {/* Upgraded Devices */}
                          <UpgradedDevices updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />

                          {/* Other Phones */}
                          <OtherPhones updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />

                          {/* Other Devices */}
                          <OtherDevice updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />

                          {/* Discount Content */}
                          <DiscountContent updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} />
                        </Col>
                      </Row>
                    </div>
                  </AccordionItemBody>
                </AccordionItem>
              }
            </Accordion>
          </Col>
        </Row>
      </section>
    );
  }
}

export default CartSummaryComponent;
