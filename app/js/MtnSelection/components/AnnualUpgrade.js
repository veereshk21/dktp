import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as Constants from '../constants';
// import Button from '../../common/Button/Button';
// import Loader from '../../common/Loader/Loader';

import deviceImgNA from '../../../images/device_placeHolder.svg';
import AsyncComponent from '../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';


const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));

export default class AnnualUpgrade extends Component {
  static propTypes = {
    selectedMDN: PropTypes.object,
    submitAgreement: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      loader: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }
  onButtonClick() {
    this.state.loader = true;
    if (this.props.selectedMDN.loanInfo) {
      hashHistory.push({
        pathname: 'dppAgreement',
        query: {
          mdn: `${this.props.selectedMDN.mtn}`,
        },
      });
      this.setState({
        loader: true,
      });
    } else {
      this.props.submitAgreement(this.props.selectedMDN.mtn, Constants.UPGRADE, this.props.selectedMDN.deviceType, this.props.selectedMDN.brand, this.props.selectedMDN.deviceId);
      this.setState({
        loader: true,
      });
    }
  }
  onCancelClick() {
    hashHistory.push('/');
  }
  render() {
    if (this.state.loader) {
      return (<Loader />);
    }
    const { selectedMDN } = this.props;
    return (
      <section className="section group grid">
        <Grid fluid>
          <Row>
            <Col xsOffset={9} xs={3}>
              <ChatAndC2C />
            </Col>
          </Row>
          <Row>
            <Col sm={4} md={4} lg={4}>
              <div className="section group border_CC noRightBorder background_gray_one min-height500">
                <Row className="min-height500 justifyContentCenter pad36 onlyTopPad" center="xs">
                  <Col xs={12}>
                    <div>
                      <div className="margin5 onlyBottomMargin">
                        <Row className="fontSize_5 bold justifyContentCenter">
                          {selectedMDN.nickname}&apos;s <span className="pad5 onlyLeftPad" dangerouslySetInnerHTML={{ __html: selectedMDN.displayDeviceName }} />
                        </Row>
                        <Row className="pad10 onlyBottomPad fontSize_4 justifyContentCenter">
                          <span className="pad5 block onlyTopPad">{selectedMDN.displayMtn}</span>
                        </Row>
                      </div>

                      <div>
                        <img src={(selectedMDN.imageUrl !== null) ? `${selectedMDN.imageUrl}&wid=165&hei=300` : deviceImgNA} alt="Selected Device" className={(selectedMDN.imageUrl === null) ? 'mtnDefaultImg' : ''} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <div>
                <Row className="pad24 margin36 onlyTopMargin clearfix noTopPad">
                  <Col xs={12} className="">
                    <h1 className="fontSize_8 color_orange">{selectedMDN.annualUpgradeMessage.title}</h1>
                    <p className="fontSize_6 bold margin10 onlyTopMargin">{selectedMDN.annualUpgradeMessage.subTitle}</p>
                    <div className="margin48 onlyTopMargin textAlignCenter">
                      <Button
                        className="button secondary large margin12 onlyRightMargin"
                        onClick={this.onCancelClick}
                      >{selectedMDN.annualUpgradeMessage.cancelButtonText}
                      </Button>
                      <Button
                        className="button primary large"
                        onClick={this.onButtonClick}
                      >{selectedMDN.annualUpgradeMessage.acceptButtonText}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}
