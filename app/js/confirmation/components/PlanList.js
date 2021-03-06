import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import SelectListItem from './SelectListItem';
import Modal from './../../common/Modal/index';

class DeviceListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, modalContent: '', featureTypeText: 'Show', featureTypeCSS: 'hide', displayFeatureType: false };
  }

  onImpPlanInfo = (evt) => {
    evt.preventDefault();
    this.setState({
      modalOpen: true,
    });
    this.setState({
      modalContent: this.props.cqKeys.html.DT_OD_IMPORTANT_PLAN_INFO_HTML,
    });
  }

  modalClose = () => {
    this.setState({
      modalOpen: false,
    });
  }

DeviceListFeatureData = (e) => {
  e.preventDefault();
  this.setState({ displayFeatureType: !this.state.displayFeatureType });

  if (this.state.featureTypeText === 'Show') {
    this.setState({ featureTypeText: 'Hide' });
    this.setState({ featureTypeCSS: 'block' });
  } else {
    this.setState({ featureTypeText: 'Show' });
    this.setState({ featureTypeCSS: 'hide' });
  }
}

render() {
  const {
    cqKeys,
    plans,
    cpcOrder,
  } = this.props;
  const imageWidthHeight = '&wid=110&hei=130';
  const { displayFeatureType } = this.state;
  const deviceCount = cpcOrder ? plans.upgradeDevices.length + plans.newDevices.length + plans.existingDevices.length : '';
  return (
    <section className="">
      {cpcOrder ? <div className="">
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
        {plans.items.map((plan) => (
          <Row>
            <Col md={2} lg={2} >
              {plan.planImageURL && <div className="textAlignCenter">
                <img src={`${plan.planImageURL}${plan.planImageURL.indexOf('?') === -1 ? '?' + imageWidthHeight : imageWidthHeight}`} alt={plan.planDisplayName} />
              </div>}
            </Col>
            <Col md={6} lg={6} >
              <div className="pad10 onlySidePad">
                <p className="bold fontSize_6">{plan.planDisplayName}</p>
                <p className="fontSize_4 color_cc" dangerouslySetInnerHTML={{ __html: plan.planDescription }} />
                <p>Your monthly plan cost is ${plan.accountAccess.hasEcpdDiscount ? plans.discountedDueMonthlyPlanWithLAC : plans.dueMonthlyPlanWithLAC}, which includes ${plan.accountAccess.hasEcpdDiscount ? plan.accountAccess.discountPrice : plan.accountAccess.price} for {deviceCount} phones</p>
                <div className="pad5 noSidePad">
                  <SelectListItem className={displayFeatureType ? 'expanded' : ''} title={this.state.featureTypeText ? this.state.featureTypeText + cqKeys.label.DT_OD_CONFIMARTION_PLAN_TOGGLE : 'Show' + cqKeys.label.DT_OD_CONFIMARTION_PLAN_TOGGLE} onClickMethod={this.DeviceListFeatureData.bind(this)} />
                </div>
                <div className={'clearfix pad10 features-content ' + (this.state.featureTypeCSS)}>
                  {plans.existingDevices.length > 0 && <span className="bold">Existing devices</span>}
                  {plans.existingDevices.map((device, i) => (
                    <div key={i} className="clearfix features-content-inner">
                      <div className="clearfix color_666 pad5">
                        <div className="width70 floatLeft" dangerouslySetInnerHTML={{ __html: device.name }} />
                        <div className="width30 floatLeft">
                          {device.hasEcpdDiscount ?
                            <div>
                              <span>${device.discountPrice}</span>
                              <span className="textDecLineThrough">${device.price}</span>
                            </div>
                            :
                            <span>${device.price}</span>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={'clearfix pad10 features-content ' + (this.state.featureTypeCSS)}>
                  {plans.newDevices.length > 0 && <span className="bold">New devices</span>}
                  {plans.newDevices.map((device, i) => (
                    <div key={i} className="clearfix features-content-inner">
                      <div className="clearfix color_666 pad5">
                        <div className="width70 floatLeft" dangerouslySetInnerHTML={{ __html: device.name }} />
                        <div className="width30 floatLeft">
                          {device.hasEcpdDiscount ?
                            <div>
                              <span>${device.discountPrice}</span>
                              <span className="textDecLineThrough">${device.price}</span>
                            </div>
                            :
                            <span>${device.price}</span>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={'clearfix pad10 features-content ' + (this.state.featureTypeCSS)}>
                  {plans.upgradeDevices.length > 0 && <span className="bold">Upgrade devices</span>}
                  {plans.upgradeDevices.map((device, i) => (
                    <div key={i} className="clearfix features-content-inner">
                      <div className="clearfix color_666 pad5">
                        <div className="width70 floatLeft" dangerouslySetInnerHTML={{ __html: device.name }} />
                        <div className="width30 floatLeft">
                          {device.hasEcpdDiscount ?
                            <div>
                              <span>${device.discountPrice}</span>
                              <span className="textDecLineThrough">${device.price}</span>
                            </div>
                            :
                            <span>${device.price}</span>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="bold textDecUnderline color_000 clearfix pointer" onClick={this.onImpPlanInfo.bind(this)}>{cqKeys.label.DT_OD_CONFIMARTION_IMPORTANT_PLAN_INFO}</p>
              </div>
            </Col>
            <Col md={4} lg={4} className="fontSize_5">
              <div>
                <div className="textAlignRight bold color_666">{cqKeys.label.DT_OD_CONFIMARTION_DUE_MONTHLY_TITLE}</div>
                {(plans.discountedDueMonthlyPlanWithLAC > 0 && plans.dueMonthlyPlanWithLAC > plans.discountedDueMonthlyPlanWithLAC) ?
                  <div>
                    <span className="textDecLineThrough">{plan.dueMonthlyPlanWithLAC}</span>
                    <span className="block bold">{plan.discountedDueMonthlyPlanWithLAC}</span>
                  </div>
                  :
                  <div className="textAlignRight color_666">${plans.dueMonthlyPlanWithLAC}</div>
                }
              </div>
            </Col>
          </Row>
        ))}
        <hr className="margin20 noSideMargin" />
      </div>
        :
        ''
      }
      {!cpcOrder && (plans && (plans.items && plans.items.length > 0) && (plans.items[0].lineAccessCharges && plans.items[0].lineAccessCharges.length > 0)) ? <div className="">
        <div className="pad5 noSidePad">
          <SelectListItem className={displayFeatureType ? 'expanded' : ''} title={this.state.featureTypeText ? this.state.featureTypeText + ` ${cqKeys.label.DT_OD_CONFIMARTION_PLAN_ONLY_TOGGLE}` : `Show ${cqKeys.label.DT_OD_CONFIMARTION_PLAN_ONLY_TOGGLE}`} onClickMethod={this.DeviceListFeatureData.bind(this)} />
        </div>
        <div className={'clearfix pad48 onlySidePad features-content ' + (this.state.featureTypeCSS)}>
          {plans.items.map((plan) => (plan.lineAccessCharges.map((planItem, i) => (<div key={i} className="clearfix features-content-inner">
            <div className="clearfix color_666 pad5 noSidePad">
              <Row>
                <Col md={2} lg={2}>
                  <div className="textAlignLeft" dangerouslySetInnerHTML={{ __html: `${planItem.name ? planItem.name : ''}` }} />
                </Col>
                <Col md={10} lg={10}>
                  <div className="textAlignLeft">
                    {planItem.hasEcpdDiscount ?
                      <div>
                        <span>${planItem.discountPrice}</span>
                        <span className="textDecLineThrough">${planItem.price}</span>
                      </div>
                      :
                      <span>${planItem.price}</span>
                    }
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          )
          )
          ))}
        </div>
        <hr className="margin20 noSideMargin" />
      </div>
        :
        ''
      }
    </section>
  );
}
}


DeviceListWrapper.propTypes = {
  cqKeys: PropTypes.object,
  plans: PropTypes.object,
  cpcOrder: PropTypes.bool,
};
export default DeviceListWrapper;
