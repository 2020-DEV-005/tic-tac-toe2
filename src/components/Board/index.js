import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/';
import { AppConst } from '../../constants/';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filledBoxes: []
        };
    }

    _getBoxes = () => {
        const totalBoxes = AppConst.TOTAL_BOXES;
        let boxList = []
        for (let i = 0; i < totalBoxes; i++) {
            boxList.push(<li key={i}><Box onClick={this.fillTheBox.bind(this, i)} value={this.getFilledValue(i)} disabled={this.isBoxDisabled(i)}/></li>);
        }
        return boxList;
    }

    getFilledValue = (boxIndex) => {
        return this.state.filledBoxes[boxIndex] || "";
    }

    fillTheBox = (boxIndex) => {
        let filledBoxes = this.state.filledBoxes;
        filledBoxes[boxIndex] = this.props.activePlayer;
        this.setState(() => ({
            filledBoxes: filledBoxes
        }));
        this.props.changeActivePlayer();    
    }

    isBoxDisabled = (boxIndex) => {
        return this.state.filledBoxes[boxIndex] ? true : false;
    }
    
    render = () => {
        return (<ul className="board">
            {this._getBoxes()}
        </ul>);
    }
}

Board.propTypes = {
    activePlayer: PropTypes.string.isRequired,
    changeActivePlayer: PropTypes.func.isRequired
};

export default Board;
