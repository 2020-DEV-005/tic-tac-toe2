import React from 'react';
import { mount } from 'enzyme';
import Game from './';
import Board from '../Board/';
import { AppConst } from '../../constants/';


describe("<Game/> component", () => {
    let wrapper, board;

    beforeEach(() => {
        wrapper = mount(<Game />);
        board = wrapper.find(Board);
    })

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

    it("Should send the prop 'setTheWinner' of type function", () => {
        expect(board.props().setTheWinner).toBeInstanceOf(Function);
    });

    it("Should display the winner message", () => {
        const btnList = wrapper.find("ul li button");
        const box1 = btnList.at(1);
        const box2 = btnList.at(2);
        const box3 = btnList.at(3);
        const box4 = btnList.at(4);
        const box5 = btnList.at(5);
    
        box3.simulate("click");
        box1.simulate("click");    
        box4.simulate("click");
        box2.simulate("click");
        box5.simulate("click");
        
        expect(wrapper.find(".win-msg").text()).toEqual(AppConst.PLAYER + " " + AppConst.PLAYER_X_NAME + " " +AppConst.WIN_THE_GAME);
    });

    it("Should send the prop 'gameDrawn' of type function", () => {
        expect(board.props().gameDrawn).toBeInstanceOf(Function);
    });

    it("Should display the game drwan message", () => {
        const btnList = wrapper.find("ul li button");
        const box0 = btnList.at(0);
        const box1 = btnList.at(1);
        const box2 = btnList.at(2);
        const box3 = btnList.at(3);
        const box4 = btnList.at(4);
        const box5 = btnList.at(5);
        const box6 = btnList.at(6);
        const box7 = btnList.at(7);
        const box8 = btnList.at(8);
    
        box0.simulate("click");
        box1.simulate("click");
        box2.simulate("click");
        box6.simulate("click");
        box7.simulate("click");
        box8.simulate("click");
        box3.simulate("click");
        box4.simulate("click");
        box5.simulate("click");
        
        expect(wrapper.find("p.game-drawn-msg").text()).toEqual(AppConst.GAME_DRAWN);
    });
});