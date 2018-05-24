import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../css/modules/buttons.scss';
import editIcon from '../../../images/edit.svg';

const CLASS_NAME = 'editButton';

class Button extends Component { // eslint-disable-line
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    type: 'button',
    className: '',
  };
  render() {
    const { type, className, children } = this.props;
    /* Line below adds Class .button by default if its not already added */
    const classNames = !className ? CLASS_NAME : ` ${CLASS_NAME} ${className}`;
    return (
      <button
        type={type}
        {...this.props}
        className={classNames}
        style={{
          backgroundImage: "url('" + editIcon + "'), none",
        }}
      >
        {children}
      </button>
    );
  }
}

export default Button;
