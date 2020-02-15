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
            boxList.push(<li key={i}>
                <Box onClick={this.fillTheBox.bind(this, i)} value={this.getFilledValue(i)} disabled={this.isBoxDisabled(i)}/>
            </li>);
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
        this.isGameFinished();
        this.props.changeActivePlayer();    
    }

    isBoxDisabled = (boxIndex) => {
        return this.state.filledBoxes[boxIndex] || this.state.isGameOver ? true : false;
    }

    isGameFinished = () => {
        if( this.isAnyRowCompletedByTheActivePlayer()) {
            this.setState(() => ({
                isGameOver: true
            }));
            this.props.setTheWinner();
        }
    }

    isAnyRowCompletedByTheActivePlayer = () => {
        let rowsList = AppConst.ROW_START_INDEXES;
        let numOfRows = AppConst.TOTAL_ROWS;
        let isPlayerWin = false;
        for(var row = 0; row < numOfRows; row++) {
            let rowStartIndex = rowsList[row];
            if(this.isRowCompletedByTheActivePlayer(rowStartIndex)){
                isPlayerWin = true;
                break;
            } 
        }
        return isPlayerWin;
    }

    isRowCompletedByTheActivePlayer = (rowStartIndex) => {
        const activePlayer = this.props.activePlayer;
        const filledBoxes = this.state.filledBoxes;
        return filledBoxes[rowStartIndex] === activePlayer && filledBoxes[rowStartIndex+1] === activePlayer && filledBoxes[rowStartIndex+2] === activePlayer;
    }
    
    render = () => {
        return (<ul className="board">
            {this._getBoxes()}
        </ul>);
    }
}

Board.propTypes = {
    activePlayer: PropTypes.string.isRequired,
    changeActivePlayer: PropTypes.func.isRequired,
    setTheWinner: PropTypes.func.isRequired
};

export default Board;
