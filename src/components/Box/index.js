import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';

function Box(props) {
    return (<button className="box-btn" onClick={props.onClick}>{props.value}</button>);
}

Box.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default Box;
