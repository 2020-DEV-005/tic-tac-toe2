import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';

function Box(props) {
    return (<button className="box-btn" onClick={props.onClick} disabled={props.disabled}>{props.value}</button>);
}

Box.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string,
    disabled:PropTypes.bool.isRequired
};

export default Box;
