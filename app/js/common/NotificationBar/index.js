/**
 * Created by hmahad on 1/24/2017.
 */

/* TODO:Will be split to component and containers*/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import * as actions from './actions';

import './../../../css/modules/notification.scss';

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.currentPage = props.page;
    this.hideNotification = this.hideNotification.bind(this);
  }

  componentDidMount() {
    this.props.checkNotification(this.currentPage);
    // this.hideNotificationAfterDelay({ isNotificationVisible: this.props.isNotificationVisible });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isNotificationVisible) {
      // this.hideNotificationAfterDelay({ isNotificationVisible: nextProps.isNotificationVisible });
    }
  }

  shouldComponentUpdate(nextProps) {
    return !Object.is(this.props, nextProps);
  }

  hideNotificationAfterDelay(obj) {
    if (obj.isNotificationVisible) {
      setTimeout(() => {
        this.props.hideNotification();
      }, 6000);
    }
  }

  hideNotification() {
    this.props.hideNotification();
  }

  render() {
    const { isNotificationVisible, type, message, page, section, targetSection } = this.props;
    if (this.currentPage !== page) {
      this.props.checkNotification(page);
      this.currentPage = page;
    }

    // const _message = (typeof message !== typeof undefined) ? message : '<span></span>';
    let html = <div />;
    if (isNotificationVisible && section === targetSection) {
      html = (type === 'error' ?

        (<div key="120" role="alertdialog" className={`notification m-warning ${section}`}>
          <div className="notification_wrap grid">
            <span className="notification_iconwrap">
              <span className="notification_icon m-warning fontTextMedium" />
            </span>

            <div className="notification_content fontTextMedium">
              <p dangerouslySetInnerHTML={{ __html: message }} />
            </div>
          </div>
          <span role="button" tabIndex="0" aria-label="Close" className="notification_close" onClick={this.hideNotification} />
        </div>) :
        (<div key="121" role="alertdialog" className="notification m-info">
          <div className="notification_wrap grid noSidePad">
            <span className="notification_iconwrap">
              <span className="notification_icon m-info fontTextMedium" />
            </span>
            <div className="notification_content fontTextMedium">
              <p dangerouslySetInnerHTML={{ __html: message }} />

            </div>
          </div>
          <span role="button" tabIndex="0" aria-label="Close" className="notification_close" onClick={this.hideNotification} />
        </div>));
    }
    return (
      <div
        className="notification_wrap clearfix" role="alertdialog"
      >
        {html}
      </div>
    );
  }
}

NotificationBar.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  checkNotification: PropTypes.func,
  hideNotification: PropTypes.func,
  isNotificationVisible: PropTypes.bool,
  page: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  type: PropTypes.string,
  section: PropTypes.string.isRequired,
  targetSection: PropTypes.string,
};

/** TODO:Take state from reducer instead of ES6 default props*/
const mapStateToProps = (state, props) => ({
  isNotificationVisible: state.get('notification').isNotificationVisible,
  message: state.get('notification').message,
  type: state.get('notification').type,
  section: props.section,
  targetSection: state.get('notification').section,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
