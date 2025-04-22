import React from 'react';
import PropTypes from 'prop-types';
import { Line } from "rc-progress";

const Progress = ({ percetage }) => {
  return (
    <>
      <Line
        style={{ height: "10px", marginBottom: "20px" }}
        strokeWidth={2}
        strokeColor={percetage === 100 ? "#00a626" : "#2db7f5"}
        percent={percetage}
      />
    </>
  );
};

Progress.propTypes = {
  percetage: PropTypes.number.isRequired
};

export default Progress;