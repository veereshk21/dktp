import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable arrow-body-style */
const SmallDescription = ({ text }) => {
  return (
    <div className="fontSize_3  pad10 onlyTopPad color_666" dangerouslySetInnerHTML={{ __html: text }} / >
  );
};

SmallDescription.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SmallDescription;
