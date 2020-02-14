import React, { Component } from 'react';
import Box from '../Box/';
import { AppConst } from '../../constants/';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _getBoxes = () => {
        const totalBoxes = AppConst.TOTAL_BOXES;
        let boxList = []
        for (let i = 0; i < totalBoxes; i++) {
            boxList.push(<li key={i}><Box /></li>);
        }
        return boxList;
    }

    render = () => {
        return (<ul className="board">
            {this._getBoxes()}
        </ul>);
    }
}

export default Board;
