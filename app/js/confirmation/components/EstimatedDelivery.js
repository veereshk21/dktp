import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable arrow-body-style */
const EstimatedDelivery = ({ text }) => {
  return (
    <div className="fontSize_3 fontTextBold">
      {text}
    </div>
  );
};

EstimatedDelivery.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EstimatedDelivery;
