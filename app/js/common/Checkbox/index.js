import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/lib/immutable';
import '../../../css/modules/checkbox.scss';

class Checkbox extends Component { // eslint-disable-line
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    name: PropTypes.string,
    disabled: PropTypes.bool,
    checkboxClass: PropTypes.string,
    labelClass: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    type: 'checkbox',
    disabled: false,
    children: '',
    name: '',
    checkboxClass: 'col span_1_of_5 textAlignCenter',
    labelClass: 'col span_4_of_5',
  };

  render() {
    // Don't use events handlers unless absolutly necessary, use redux forms reducer/actions
    const { id, disabled, name, value, checkboxClass, labelClass, children, ...rest } = this.props;
    return (
      <label htmlFor={id}>
        <div className={checkboxClass}>
          <Field
            component="input"
            type="checkbox"
            id={id}
            disabled={disabled}
            className={`checkbox ${disabled ? 'disabled' : ''}`}
            value={value}
            name={name}
            {...rest}
          />
          <label className="displayInlineBlock" htmlFor={id} />
        </div>
        <div className={labelClass}>
          <label htmlFor={id} >{children}</label>
        </div>
      </label>
    );
  }
}

export default Checkbox;
