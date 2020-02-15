import React, { Component } from 'react';
import Board from '../Board/';
import { AppConst } from '../../constants/';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePlayer: AppConst.PLAYER_X_NAME
        }
    }

    render = () => {
        return (<div className="game">
            <h4>{AppConst.PLAYER} {this.state.activePlayer}</h4>
            <Board activePlayer={this.state.activePlayer}/>
        </div>);
    }
}

export default Game;
