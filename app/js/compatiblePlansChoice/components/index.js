import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getParameterByName } from './../actions';
import * as Constants from './../constants';
import AsyncComponent from '../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';
// import Loader from '../../common/Loader/Loader';
// import Notification from './../../common/Notification/Notification';
// import NotificationBar from './../../common/NotificationBar';

const SinglePlanComponent = AsyncComponent(() => import('../components/SinglePlanComponent'));
const MultiPlanComponent = AsyncComponent(() => import('../components/MultiPlanComponent'));
const CartsummaryComponent = AsyncComponent(() => import('../components/CartSummary/index'));
const Modal = AsyncComponent(() => import('./../../common/Modal/index'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Notification = AsyncComponent(() => import('./../../common/Notification/Notification'));
const NotificationBar = AsyncComponent(() => import('./../../common/NotificationBar'));


class CompatiblePlans extends Component {
  static propTypes = {
    updatePlanPromptInfo: PropTypes.object.isRequired,
    cq: PropTypes.object.isRequired,
    additionalPlanDetails: PropTypes.object,
    setAdditionalPlanDetails: PropTypes.func,
    asyncFetch: PropTypes.func,
    isFetching: PropTypes.bool,
    isPlanDetailsShow: PropTypes.bool,
    location: PropTypes.object,
    isSingleDevice: PropTypes.bool,
    keepCurrentPlanURL: PropTypes.string,
    singleLinePlans: PropTypes.array,
    dataOnlyPlans: PropTypes.array,
    multiLinePlans: PropTypes.array,
    multiUpgradeCheck: PropTypes.func,
    isMultiUpgrade: PropTypes.bool,
    multiUpgradeContent: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.singleLinePlans = props.singleLinePlans;
    this.multiLinePlans = props.multiLinePlans;
    this.dataOnlyPlans = props.dataOnlyPlans;
    this.onPlantypeChangeHandler = this.onPlantypeChangeHandler.bind(this);
    let selectedPlan = null;
    if (props.isSingleDevice) {
      const recommendedPlan = this.singleLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.singleLinePlans[0];
    } else {
      const recommendedPlan = this.multiLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.multiLinePlans[0];
    }
    this.state = {
      planSelectionType: props.isSingleDevice ? 'single_device' : 'multi_device',
      cartSummaryObj: selectedPlan,
      selectedPlanSorId: selectedPlan.planSorId,
      modalOpen: false,
      modalContent: '',
      viewState: props.isSingleDevice,
    };
    this.updatePlanContinue = this.updatePlanContinue.bind(this);
    this.keepCurrentPlan = this.keepCurrentPlan.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  onImpPlanInfo = (evt) => {
    evt.preventDefault();
    this.setState({
      modalOpen: true,
    });
    this.setState({
      modalContent: this.props.cq.html.DT_OD_IMPORTANT_PLAN_INFO_HTML,
    });
  }

  onImpDataSvcInfo = (evt) => {
    evt.preventDefault();
    window.open(this.props.cq.serviceUrls.DT_OD_BROADBAND_INTERNET_SERVICES_LNK, '_blank');
  }

  onPlantypeChangeHandler(type) {
    let selectedPlan = null;
    if (type === Constants.SINGLE_LINE) {
      const recommendedPlan = this.singleLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.singleLinePlans[0];
    } else {
      const recommendedPlan = this.multiLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.multiLinePlans[0];
    }
    this.setState({ viewState: type === Constants.SINGLE_LINE, cartSummaryObj: selectedPlan, selectedPlanSorId: selectedPlan.planSorId });
  }

  seePlanFeatures = (evt) => {
    evt.preventDefault();
    this.setState({
      modalOpen: true,
    });
    this.setState({
      modalContent: this.props.cq.html.DT_OD_PLAN_FEATURES,
    });
  }

  modalClose = () => {
    this.setState({
      modalOpen: false,
    });
  }

  updatePlanContinue() {
    if (this.state.selectedPlanSorId) {
      const { updatePlanPromptInfo } = this.props;
      const { selectedPlanSorId } = this.state;
      let url = `${updatePlanPromptInfo.acceptURL}?planSorId=${selectedPlanSorId}`;

      const editPlan = getParameterByName('editPlan');
      const flow = getParameterByName('flow');
      const planCommId = getParameterByName('planCommId');

      if (editPlan !== null) url += `&editPlan=${editPlan}`;
      if (flow !== null) url += `&flow=${flow}`;
      if (planCommId !== null) url += `&planCommId=${planCommId}`;

      this.props.asyncFetch();
      window.location.href = url;
    }
  }

  formatPlanInfo(planObj) {
    const planList = planObj.info.split('<br />').map((item) => <li>{item}</li>);
    return <ul>{planList}</ul>;
  }

  keepCurrentPlan(event) {
    event.preventDefault();
    const { keepCurrentPlanURL } = this.props.updatePlanPromptInfo;
    const { isMultiUpgrade, multiUpgradeCheck, multiUpgradeContent } = this.props;
    if (isMultiUpgrade) {
      multiUpgradeCheck(keepCurrentPlanURL, multiUpgradeContent);
    } else {
      window.location = keepCurrentPlanURL;
    }
  }

  render() {
    const {
      updatePlanPromptInfo,
      setAdditionalPlanDetails,
      additionalPlanDetails,
      isPlanDetailsShow,
      cq,
      isFetching,
      multiUpgradeCheck,
      isMultiUpgrade,
      multiUpgradeContent,
    } = this.props;

    return (
      <Row className="section clearfix">
        <Modal
          mounted={this.state.modalOpen}
          closeFn={this.modalClose}
          style={{ margin: 'auto', background: 'white', width: '50%' }}
          showCloseX
        >
          <div className="pad20">
            <div dangerouslySetInnerHTML={{ __html: this.state.modalContent }} />
            <div />
          </div>
        </Modal>
        {isFetching === true && <Loader />}
        <Grid fluid>
          <Row className="pad6">
            <Col xs={5} className="pad12 noSidePad">
              <h1>Let&apos;s choose the right plan for your {updatePlanPromptInfo.linesCount} line{updatePlanPromptInfo.linesCount > 1 && 's'}.</h1>
            </Col>
            <Col xs={7}>
              <ChatAndC2C />
            </Col>
            <Row style={{ width: '100%', marginBottom: '48px' }}>
              <Col xs={6}>
                {updatePlanPromptInfo.currentPlanName &&
                  <Row style={{ margin: 0 }}>
                    <Col xs={7} className="pad6 fontSize_4">
                      You are currently on&nbsp;<span dangerouslySetInnerHTML={{ __html: updatePlanPromptInfo.currentPlanName }} />.
                    </Col>
                    <Col xs={2} className="pad6 fontSize_4">
                      ${updatePlanPromptInfo.currentPlanPrice}/mo
                    </Col>
                    <Col xs={3} className="pad6 fontSize_4">
                      {updatePlanPromptInfo.keepCurrentPlan &&
                        <a onClick={this.keepCurrentPlan} className="textUnderline pad6 fontSize_3 pointer">{cq.label.DT_OD_KEEP_CURRENT_PLAN}</a>
                      }
                    </Col>
                  </Row>
                }
              </Col>
              <Col xs={1} />
              <Col xs={5} className="pad6 fontSize_7 textRight">
                <div className="">
                  <div className="textUnderline inlineBlock planInfo fontSize_3 pointer" onClick={this.onImpPlanInfo}>{cq.label.DT_OD_IMP_PLAN_INFO_TEXT}</div>
                  <div className="textUnderline inlineBlock fontSize_3 pointer8 pointer" onClick={this.onImpDataSvcInfo}>{cq.label.DT_OD_IMP_DATA_INFO_TEXT}</div>
                </div>
              </Col>
            </Row>
            <Col xs={12} className="centerBlock">
              <NotificationBar page={this.props.location.pathname} />
              {/*  Warning msg notification bar goes here  */}
            </Col>

            <Col xs={12}>
              {updatePlanPromptInfo.restricedZipcode &&
                <div className="margin36 onlyBottomMargin">
                  <Notification message={cq.html.DT_OD_SIM_RESTRICTION_INFO} type="error" noClose noIcon />
                </div>
              }

              {this.props.isSingleDevice &&
                <Row style={{ margin: 0, paddingBottom: '48px' }}>
                  <div className="planSelectionTab">
                    <Col xs={6} className={`pad12 ${this.state.viewState && 'highlighted'}`}>
                      <Row
                        style={{ cursor: 'pointer', padding: 0 }}
                        onClick={this.onPlantypeChangeHandler.bind(this, Constants.SINGLE_LINE)}
                        onKeyPress={this.onPlantypeChangeHandler.bind(this, Constants.SINGLE_LINE)}
                        role="button"
                        tabIndex="0"
                      >
                        <Col xs={7} style={{ padding: 0 }}>
                          <div className="bold fontSize_9">
                            Plans for a single smartphone
                          </div>
                          <div>
                            The best value for one smartphone and up to two additional device types.
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={6} className={`pad12 ${!this.state.viewState && 'highlighted'}`}>
                      <Row
                        style={{ cursor: 'pointer', padding: 0 }}
                        onClick={this.onPlantypeChangeHandler.bind(this, Constants.MULTI_LINE)}
                        onKeyPress={this.onPlantypeChangeHandler.bind(this, Constants.MULTI_LINE)}
                        role="button"
                        tabIndex="0"
                      >
                        <Col xs={7} style={{ padding: 0 }}>
                          <div className="bold fontSize_9">
                            Plans for multiple devices
                          </div>
                          <div>
                            Flexible plans to share between up to 10 smartphones and devices.
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Row>
              }
              <Row className="margin24 onlyBottomMargin">
                {this.state.viewState &&
                  (this.singleLinePlans && this.singleLinePlans.length > 0) &&
                    <SinglePlanComponent
                      singleLinePlans={this.singleLinePlans}
                      comparePlansEnabled={updatePlanPromptInfo.comparePlansEnabled}
                      setAdditionalPlanDetails={setAdditionalPlanDetails}
                      additionalPlanDetails={additionalPlanDetails}
                      isPlanDetailsShow={isPlanDetailsShow}
                      onPlanSelected={(plan) => this.setState({ cartSummaryObj: plan, selectedPlanSorId: plan.planSorId })}
                      cq={cq}
                      selectedPlanSorId={this.state.selectedPlanSorId}
                    />
                }
                {!this.state.viewState &&
                  (this.multiLinePlans && this.multiLinePlans.length > 0) &&
                    <MultiPlanComponent
                      singleLinePlans={this.singleLinePlans}
                      multiLinePlans={this.multiLinePlans}
                      dataOnlyPlans={this.dataOnlyPlans}
                      updatePlanPromptInfo={updatePlanPromptInfo}
                      setAdditionalPlanDetails={setAdditionalPlanDetails}
                      additionalPlanDetails={additionalPlanDetails}
                      isPlanDetailsShow={isPlanDetailsShow}
                      onPlanSelected={(plan) => this.setState({ cartSummaryObj: plan, selectedPlanSorId: plan.planSorId })}
                      cq={cq}
                      selectedPlanSorId={this.state.selectedPlanSorId}
                    />
                }
              </Row>
            </Col>

            <Col xs={12}>
              <CartsummaryComponent
                planSorId={this.state.selectedPlanSorId}
                updatePlanPromptInfo={this.state.cartSummaryObj}
                lacInfo={updatePlanPromptInfo.lacMap}
                cq={cq}
                keepCurrentPlan={updatePlanPromptInfo.keepCurrentPlan}
                keepCurrentPlanURL={updatePlanPromptInfo.keepCurrentPlanURL}
                seePlanFeatures={this.seePlanFeatures}
                multiUpgradeCheck={multiUpgradeCheck}
                isMultiUpgrade={isMultiUpgrade}
                multiUpgradeContent={multiUpgradeContent}
              />
            </Col>
          </Row>
          <footer className="footerContent width100 margin36 noSideMargin textAlignCenter" />
        </Grid>
      </Row>
    );
  }
}

export default CompatiblePlans;
