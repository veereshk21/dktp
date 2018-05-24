import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

// import Button from '../../common/Button/Button';
// import AlertImage from '../../../images/Verizon_Alert_Icon.svg';
import AsyncComponent from '../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';

const Button = AsyncComponent(() => import('../../common/Button/Button'));
const AlertImage = AsyncComponent(() => import('../../../images/Verizon_Alert_Icon.svg'));

// TODO: Refactor this whole component into functional, use a href on the button instead of a manually bound click function
export default class InEligibleError extends React.Component {
  static propTypes = {
    cqJSON: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    window.location.href = window.location.pathname;
  }

  render() {
    return (
      <div>
        <div className="pad20 noSidePad">
          <Row>
            <Col xsOffset={9} xs={3}>
              <ChatAndC2C />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="pad60 textAlignCenter vh60">
                <img alt="imageDescription" className="svg-icon_alert margin20" src={`${AlertImage}`} aria-hidden="true" style={{ width: '150px' }} />
                <div>{this.props.cqJSON.label.OD_MDN_UPGRADE_INELIGIBLE}</div>
                <p className="pad12">{this.props.cqJSON.label.subTitle}</p>
              </div>
            </Col>
          </Row>
          <div className="textAlignCenter ">
            <Button className="button secondary large" onClick={this.onButtonClick} >{this.props.cqJSON.label.OD_MDN_BACK_CTA}</Button>
          </div>
        </div>
      </div>
    );
  }
}
