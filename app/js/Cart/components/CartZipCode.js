import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import {
  Field,
  reduxForm,
} from 'redux-form/immutable';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { renderTextField } from './../../common/TextField';

const validate = (values) => {
  const errors = {};

  const zipcode = values.get('zipcode');

  if (!zipcode) {
    errors.zipcode = 'Required';
  }
  return errors;
};

class ZipCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.onZipChange = this.onZipChange.bind(this);
    this.onZipSave = this.onZipSave.bind(this);
    this.state = {
      zipCode: props.zipCode ? props.zipCode : '',
      validZipCode: true,
    };

    this.allowOnlyNumbers = this.allowOnlyNumbers.bind(this);
  }

  // material-ui specific method
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillReceiveProps(detail) {
    const newProps = detail.asyncCallStatus;
    if (!newProps.isFetching) {
      window.hideLoader();
    }
    if ((typeof newProps.data !== 'undefined') && newProps.data.hasOwnProperty('validZip')) { // eslint-disable-line no-prototype-builtins
      const validZipCode = newProps.data.validZip;
      if (!validZipCode) {
        this.props.invalidateAsyncFetch();
      } else {
        this.setState({ validZipCode: false });
      }
    }
  }

  onZipChange(event) {
    const zipc = event.target.value;
    const isValidCode = /(^\d{5}(?:[-\s]\d{4})?$)/g.test(zipc);

    if (!isValidCode) {
      this.setState({ zipCode: event.target.value, validZipCode: false });
      return;
    }
    this.setState({ zipCode: zipc, validZipCode: true });
  }

  onZipSave(event) {
    /* TODO:Make an async call to service to update promo and display on Summary page */
    event.preventDefault();
    this.props.changeZipCode(this.state.zipCode);
  }

  allowOnlyNumbers(value) {
    return value.replace(/[^\d]/g, '');
  }

  render() {
    let cartErrorMessageElement = '';
    const {
      cq, valid, submitting, cartMessages,
    } = this.props;
    const { validZipCode } = this.state;

    if (cartMessages && !cartMessages.cartReadyforCheckout) {
      cartErrorMessageElement =
        <p className="color_red pad6">{cartMessages.message}</p>;
    } else if (!this.state.validZipCode) {
      cartErrorMessageElement =
        <p className="color_red pad6">Not a Valid zipcode</p>;
    } else {
      cartErrorMessageElement = <p />;
    }

    return (
      <div className="">
        <form action="POST" name="zipCodeform" className="clearfix">
          <section className="margin10 onlyTopMargin">
            <h4
              className="inlineBlock clearLeft bold fontSize_5 noSideMargin"
              dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CART_ESTIMTD_TAX }}
            />
            <Row className="clearfix margin20 onlyTopMargin">
              <Col
                className="floatLeft margin5 onlyTopMargin"
                xs={6}
              >
                <Field
                  onChange={this.onZipChange}
                  value={this.state.zipCode}
                  placeholder="Zip code"
                  maxLength="5"
                  hintStyle="leftAlign fontSize_5 setInlinePad"
                  name="zipcode"
                  id="zipcode"
                  component={renderTextField}
                  type="text"
                  autoFocus
                  pattern="[0-9]*"
                  normalize={this.allowOnlyNumbers}
                />
                {cartErrorMessageElement}
              </Col>

              <Col
                className="floatLeft margin5 onlyTopMargin pad10 onlyLeftPad"
                xs={6}
              >
                <button
                  className="button width100 primary"
                  type="submit"
                  disabled={!valid || submitting || !validZipCode}
                  onClick={this.onZipSave}
                  dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CART_ZIP_CHANGE_CTA }}
                />
              </Col>
            </Row>
          </section>
        </form>
      </div>);
  }
}

ZipCodeComponent.propTypes = {
  cartMessages: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  cq: PropTypes.object,
  changeZipCode: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  zipCode: PropTypes.string,
  // asyncCallStatus: PropTypes,
};

ZipCodeComponent.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'zipCodeForm',
  validate,
  touchOnBlur: false,
})(ZipCodeComponent);
