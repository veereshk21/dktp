import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';
import Device from './device';
import ChatAndC2C from '../../common/ChatAndC2C';

const HomePage = (props) => {
  const { cqContent } = props;

  return (
    <div className="border_e6 noTopBorder">
      <div className="border_e6 onlyBottomBorder pad12">
        <a href={props.cartRedirectUrl} className="secondaryCTA m-back color_000 bold fontSize_5 pad12 noSidePad">{cqContent.label.DT_OD_DOWNPAYMENT_BACK_BUTTON}</a>
        <span className="floatRight">
          <ChatAndC2C />
        </span>
      </div>
      <div className="pad24">
        <div>
          <h1 className="margin20 noSideMargin">{props.title}</h1>
          <p className="margin20 noSideMargin">{props.titleDescription}</p>
        </div>
        <div className="margin12 noSideMargin">
          <div className="margin-10 onlySideMargin">
            <Row>
              {props.devices && props.devices.map((device, index) => (
                <Device
                  key={`device-${index}`}
                  cqContent={cqContent}
                  device={device}
                  multiLine={props.devices.length > 1}
                />
              ))}
            </Row>
          </div>
          <div className="margin48 noSideMargin">
            <a
              href={props.cartRedirectUrl}
              className="margin15 onlyRightMargin"
            >
              {cqContent.label.DT_OD_DOWNPAYMENT_CANCEL_BUTTON}
            </a>
            <button
              className="button primary"
              onClick={() => props.initiateCheckout(props.checkoutRedirectUrl)}
            >
              {cqContent.label.DT_OD_DOWNPAYMENT_CONTINUE_WITH_DOWNPAYMENT_BUTTON}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  cqContent: PropTypes.object,
  checkoutRedirectUrl: PropTypes.string,
  cartRedirectUrl: PropTypes.string,
  title: PropTypes.string,
  titleDescription: PropTypes.string,
  devices: PropTypes.array,
  initiateCheckout: PropTypes.func,
};

export default HomePage;
