import PropTypes from 'prop-types';
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
// import Button from '../../common/Button/Button';
// import Loader from '../../common/Loader/Loader';

// import Anchor from './../../common/A/A';
import AsyncComponent from '../../common/AsyncComponent';
import ChatAndC2C from '../../common/ChatAndC2C';

const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Anchor = AsyncComponent(() => import('./../../common/A/A'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));

export default class InEligible extends React.Component {
  static propTypes = {
    inEligibleDetails: PropTypes.object,
    onButtonClick: PropTypes.func,
    loader: PropTypes.boolean,
    cqJSON: PropTypes.object,
    openAALPendingModal: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.linkClass = (this.props.inEligibleDetails.linkText ? '' : 'is-hidden');
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.props.onButtonClick(`${this.props.inEligibleDetails.cancelPlanChangeURL}`);
  }

  render() {
    const { inEligibleDetails, loader, cqJSON } = this.props;
    return (
      <Grid>
        {loader && <Loader />}
        <Row className="pad20 noSidePad">
          <Col md={12} xs={12}>
            <Row>
              <Col xs={9}>
                <h1>{cqJSON.label.DT_OD_MDN_PENDING_AAL_TITLE}</h1>
              </Col>
              <Col xs={3}>
                <ChatAndC2C />
              </Col>
            </Row>
            <Row className="margin30 noSideMargin">
              <Col md={12} xs={12}>
                <Row>
                  <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_ORDER_NO_LABEL}</Col>
                  <Col md={10} xs={10}>{inEligibleDetails.orderNumber}</Col>
                </Row>
                <Row>
                  <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_LINES_LABEL}</Col>
                  <Col md={10} xs={10}>{inEligibleDetails.dateSubmitted}</Col>
                </Row>
                <Row>
                  <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_LINES_LABEL}</Col>
                  <Col md={10} xs={10}>{inEligibleDetails.lines}</Col>
                </Row>
                <Row>
                  <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_DESC}</Col>
                  <Col md={10} xs={10}>{inEligibleDetails.description}</Col>
                </Row>
                <Row>
                  <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_DEVICES_LABEL}</Col>
                  <Col md={10} xs={10}>{inEligibleDetails.devices}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Anchor href={inEligibleDetails.doNotCancelPlanChangeURL} className="color_333 textDecUnderline fontSize_4 margin18 onlyRightMargin pad15 onlyTopPad"><span>{cqJSON.label.DT_OD_MDN_PENDING_AAL_NO_THANKS_LABEL}</span></Anchor>
              <Button className={inEligibleDetails.accountMember ? 'disabled' : ''} disabled={inEligibleDetails.accountMember ? 'disabled' : ''} onClick={this.props.openAALPendingModal}>{cqJSON.label.DT_OD_MDN_PENDING_AAL_CANCEL_BUTTON}</Button>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
