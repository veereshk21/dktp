import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { renderTextField } from '../../common/TextField/';
import Checkbox from './../../common/Checkbox/index';
import Button from './../../common/Button/Button';

const styles = {
  place: {
    marginLeft: 15,
    fontSize: 18,
  },
};

const validate = (values, props) => {
  const errors = {};

  const userName = values.get('userName');
  const password = values.get('password');

  if (!userName) {
    errors.userName = props.cqContent.error.DT_OD_GUEST_LOGIN_USERNAME_FIELD_REQUIRED_TEXT;
  }

  if (!password) {
    errors.password = props.cqContent.error.DT_OD_GUEST_LOGIN_PASSWORD_FIELD_REQUIRED_TEXT;
  }

  return errors;
};

class GuestLogin extends Component {
  static propTypes = {
    cqContent: PropTypes.object,
    ctadisabled: PropTypes.bool,
    submitLogin: PropTypes.func,
  };

  submitLogin = () => {
    this.props.submitLogin();
  }

  render() {
    const { cqContent, ctadisabled } = this.props;
    return (
      <Grid fluid id="guestLogin">
        <Row style={{ margin: '36px 0' }}>
          <h1>{cqContent.label.DT_OD_GUEST_LOGIN_BEGIN_TITLE}</h1>
        </Row>
        <Row style={{ margin: '12px 0 36px' }}>
          <Col xs={6} style={{ padding: 0 }}>
            <div className="background_gray_one border_CC" style={{ padding: '60px' }}>
              <div className="bold fontSize_10 margin12 onlyBottomMargin">
                {cqContent.label.DT_OD_GUEST_LOGIN_SIGN_IN_TITLE}
              </div>
              <div className="fontSize_4 margin24 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_GUEST_LOGIN_GUEST_IN_TITLE }} />
              <div>
                <div className="textTransUppercase margin6 onlyBottomMargin" style={{ color: '#808080' }}>
                  {cqContent.label.DT_OD_GUEST_LOGIN_USER_ID_TITLE}
                </div>
                <div className="background_white margin12 onlyBottomMargin">
                  <Field
                    component={renderTextField}
                    id="userName"
                    name="userName"
                    type="text"
                    hintText={cqContent.label.DT_OD_GUEST_LOGIN_USER_ID_TITLE}
                    hintStyle={styles.place}
                    autoFocus
                    pattern=""
                    maxLength=""
                    required
                  />
                </div>
                <div className="textUnderline bold margin24 noSideMargin">{cqContent.label.DT_OD_GUEST_LOGIN_USER_ID_FORGET_LINK}</div>
              </div>
              <div>
                <div className="textTransUppercase margin6 onlyBottomMargin" style={{ color: '#808080' }}>
                  {cqContent.label.DT_OD_GUEST_LOGIN_PASSWORD_TITLE}
                </div>
                <div className="background_white margin12 onlyBottomMargin">
                  <Field
                    component={renderTextField}
                    id="password"
                    name="password"
                    hintText={cqContent.label.DT_OD_GUEST_LOGIN_PASSWORD_TITLE}
                    hintStyle={styles.place}
                    autoFocus
                    pattern=""
                    maxLength=""
                    type="password"
                    required
                  />
                </div>
                <div className="textUnderline bold margin24 noSideMargin">{cqContent.label.DT_OD_GUEST_LOGIN_PASSWORD_FORGET_LINK}</div>
              </div>
              <div className="margin36 onlyBottomMargin clearfix">
                <div className="floatLeft" style={{ margin: '4px 16px 0 0' }}>
                  <Checkbox
                    name="rememberMe"
                    id="rememberMe"
                  />
                </div>
                <div className="floatLeft span_9_of_12 pad6 noLeftPad">
                  <span className="fontSize_4 style={{ color: '#808080' }}">
                    {cqContent.label.DT_OD_GUEST_LOGIN_REMEMBER_ME}&nbsp;(<span className="bold" style={{ color: '#000' }}>{cqContent.label.DT_OD_GUEST_LOGIN_PRIVACY_POLICY_LINK}</span>)
                  </span>
                </div>
              </div>
              <Row>
                <Col xs={6}>
                  <div className="textAlignCenter">
                    <Button
                      type="button"
                      className={`button primary width100 large ${!ctadisabled ? 'disabled' : ''}`}
                      disabled={!ctadisabled}
                      onClick={this.submitLogin}
                    >
                      { cqContent.label.DT_OD_GUEST_LOGIN_SIGN_IN_TITLE }
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'guestLoginForm',
  validate,
})(GuestLogin);
