/**
 * Created by sgumma on 22-02-2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';

export default class ActionButton extends React.Component {
  onBtnClick() {
    if (this.props.cta.ajax) {
    //  bind ajax call
      this.props.onAjaxRequest(`${this.props.cta.ajaxUrl}`);
      return false;
    }
    return false;
  }
  render() {
    const { cta, btnType } = this.props;
    if (cta.link) {
      return (<a className={`${btnType} margin12`} href={cta.link}>{cta.label}</a>);
    }
    return (
      <Button className={`${btnType} margin12`} onClick={this.onBtnClick.bind(this)}>{cta.label}</Button>
    );
  }
}

ActionButton.propTypes = {
  cta: PropTypes.object,
  onAjaxRequest: PropTypes.func,
  btnType: PropTypes.string,

};
