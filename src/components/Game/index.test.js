import React from 'react';
import { mount } from 'enzyme';
import Game from './';
import Board from '../Board/';
import { AppConst } from '../../constants/';


describe("<Game/> component", () => {
    let wrapper = mount(<Game />);
    const board = wrapper.find(Board);

    it("should have the player X as active player by default", () => {
        expect(wrapper.find("h4").text()).toEqual(AppConst.PLAYER + " " + AppConst.PLAYER_X_NAME);
    });

    it("Should render the <Board /> component", () => {
        expect(wrapper.find(Board).length).toEqual(1);
    });

    it("Should send the prop 'activePlayer' to the board component", () => {      
        expect(board.props().activePlayer).not.toBeNull();
    });

    it("Should send the prop 'changeActivePlayer' to the board component", () => { 
        expect(board.props().changeActivePlayer).not.toBeNull();
    });
    
    it("Should send the prop 'changeActivePlayer' of type function", () => {
        expect(board.props().changeActivePlayer).toBeInstanceOf(Function);
    });

});