import React, { Component } from 'react';
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
            boxList.push(<li key={i}><Box onClick={this.fillTheBox.bind(this, i)} value={this.getFilledValue(i)} /></li>);
        }
        return boxList;
    }

    getFilledValue = (boxIndex) => {
        return this.state.filledBoxes[boxIndex] || "";
    }

    fillTheBox = (boxIndex) => {
        let filledBoxes = this.state.filledBoxes;
        filledBoxes[boxIndex] = AppConst.PLAYER_X_NAME;
        this.setState(() => ({
            filledBoxes: filledBoxes
        }));
    }
    
    render = () => {
        return (<ul className="board">
            {this._getBoxes()}
        </ul>);
    }
}

export default Board;
