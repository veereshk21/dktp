import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: true };

    this.onCloseNotification = this.onCloseNotification.bind(this);
  }
  onCloseNotification() {
    const isVisible = this.state.isVisible;
    this.setState({ isVisible: !isVisible });
  }
  render() {
    const { type, message } = this.props;
    const { isVisible } = this.state;
    const showClose = this.props.noClose || false;
    return (
      <div className="width100">{isVisible && <div className="notification_wrap clearfix" role="alertdialog">
        <div
          key="120"
          role="alertdialog"
          className={`notification ${type === 'error' ? 'm-warning' : 'm-info'}`}
        >
          <div className="notification_wrap grid">
            <div className="notification_content fontTextMedium">
              <p dangerouslySetInnerHTML={{ __html: message }} />
            </div>
          </div>
          {!showClose &&
          <span
            role="button"
            tabIndex="0"
            aria-label="Close"
            className="notification_close" onClick={this.onCloseNotification}
          />
          }
        </div>
      </div>}</div>
    );
  }
}

Notification.defaultProps = {
  type: 'info',
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  noClose: PropTypes.bool,
};

export default Notification;
