import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { hashHistory } from './../../store';
import A from '../../common/A/A';
import ChatAndC2C from '../../common/ChatAndC2C';

export default class CancelOrderFailure extends Component {
  static propTypes = {
    orderResponse: PropTypes.object,
    cqJSON: PropTypes.object,
  };

  componentWillMount() {
    if (this.props.orderResponse === null) {
      hashHistory.push('/');
      window.location.reload();
    }
  }
  onButtonClick() {
    hashHistory.goBack();
  }
  render() {
    const { orderResponse, cqJSON } = this.props;
    const response = orderResponse.output.pageDetailsVO;
    return (
      <div className="pad48 onlyTopPad vh60">
        <div className="pad36 noSidePad">
          <Row>
            <Col xsOffset={9} xs={3}>
              <ChatAndC2C />
            </Col>
          </Row>
          <div className="textAlignCenter">
            <i className="f-icon_sad" />
            <div className="pad20">
              <h1>{response.title}</h1>
              <p className="pad12 noSidePad">{response.subTitle}</p>
            </div>
          </div>
          <div className="textAlignCenter ">
            <A className="button secondary large" onClick={this.onButtonClick}>{cqJSON.label.DT_OD_MDN_CANCEL_ORDER_FAIL_BACK_TEXT}</A>
          </div>
        </div>
      </div>
    );
  }
}
