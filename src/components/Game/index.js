import React, { Component } from 'react';
import Board from '../Board/';
import { AppConst } from '../../constants/';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePlayer: AppConst.PLAYER_X_NAME,
            winner: null
        }
    }

    changeActivePlayer = () => {
        const activePlayer = (this.state.activePlayer === AppConst.PLAYER_X_NAME) ? AppConst.PLAYER_O_NAME : AppConst.PLAYER_X_NAME;
        this.setState({
            activePlayer: activePlayer
        });
    }

    setTheWinner = () => {
        const activePlayer = this.state.activePlayer;
        this.setState({
            winner: activePlayer
        });
    }

    render = () => {
        return (<div className="game">
            <h4>{AppConst.PLAYER} {this.state.activePlayer}</h4>
            
            <Board activePlayer={this.state.activePlayer} 
                changeActivePlayer={this.changeActivePlayer} 
                setTheWinner={this.setTheWinner}/>
            
            {this.state.winner && <p className="win-msg">{AppConst.PLAYER} {this.state.winner} {AppConst.WIN_THE_GAME}</p>}
        </div>);
    }
}

export default Game;
