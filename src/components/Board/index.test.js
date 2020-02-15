import React from 'react';
import { mount } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Board from '../Board/';
import Box from '../Box/';
import { AppConst } from '../../constants/';

describe("<Board /> component", () => {
    let wrapper, instance;
    
    const changeActivePlayerMock = () => {
        const activePlayer = (wrapper.props().activePlayer === AppConst.PLAYER_X_NAME) ? AppConst.PLAYER_O_NAME : AppConst.PLAYER_X_NAME;
        wrapper.setProps({
            activePlayer: activePlayer
        });
    };

    const completeRowByThePlayer = () => {
        const btnList = wrapper.find("ul li button");
        const box1 = btnList.at(1);
        const box2 = btnList.at(2);
        const box3 = btnList.at(3);
        const box4 = btnList.at(4);
        const box5 = btnList.at(5);
    
        box3.simulate("click");
        expect(wrapper.state().filledBoxes[3]).toEqual(AppConst.PLAYER_X_NAME);
    
        box1.simulate("click");    
        expect(wrapper.state().filledBoxes[1]).toEqual(AppConst.PLAYER_O_NAME);
    
        box4.simulate("click");
        expect(wrapper.state().filledBoxes[4]).toEqual(AppConst.PLAYER_X_NAME);
    
        box2.simulate("click");
        expect(wrapper.state().filledBoxes[2]).toEqual(AppConst.PLAYER_O_NAME);
    
        box5.simulate("click");
        expect(wrapper.state().filledBoxes[5]).toEqual(AppConst.PLAYER_X_NAME);
        
    }

    beforeEach(() => {
        const props = {
            activePlayer: AppConst.PLAYER_X_NAME,
            changeActivePlayer: jest.fn(changeActivePlayerMock),
            setTheWinner: jest.fn()
        };

        wrapper = mount(<Board {...props}/>);
        instance = wrapper.instance();
    });

    it("Should have 9 boxes in the board", () => {
        expect(wrapper.find("ul li").length).toEqual(AppConst.TOTAL_BOXES);
    });

    it("Should render 9 buttons in the board", () => {
        expect(wrapper.find("ul li button").length).toEqual(AppConst.TOTAL_BOXES);
    });

    it("Should call the fill the box method when a button clicked", () => {
        const spy = jest.spyOn(instance, "fillTheBox");
        instance.forceUpdate();

        wrapper.find("ul li button").at(0).simulate("click");

        expect(spy).toHaveBeenCalled();
    });

    it("Should update the filledBoxes list with player 'X' for the first time", () => {
        wrapper.find("ul li button").at(0).simulate("click");

        expect(wrapper.state().filledBoxes[0]).toEqual(AppConst.PLAYER_X_NAME);
    });

    it("Should display the box text as X on first click of the button", () => {
        const btn = wrapper.find("ul li button").at(5);

        btn.simulate("click");

        expect(btn.text()).toEqual(AppConst.PLAYER_X_NAME);
    });

    it("Should update the filled box with active player", () => {
        const btn = wrapper.find("ul li button").at(4);
        const activePlayer = wrapper.props().activePlayer;
        btn.simulate("click");

        expect(wrapper.state().filledBoxes[4]).toEqual(activePlayer);
    });

    it("Should throw error message if there is no activePlayer prop ", () => {
        const errorMsg = "Failed prop type: The prop `activePlayer` is marked as required in `<<anonymous>>`, but its value is `undefined`."

        const result = checkPropTypes(Board.propTypes, { activePlayer: undefined }, "prop", Board.activePlayer);

        expect(result).toEqual(errorMsg);
    });

    it("Should throw error message if activePlayer prop type is not string ", () => {
        const errorMsg = "Failed prop type: Invalid prop `activePlayer` of type `number` supplied to `<<anonymous>>`, expected `string`."

        const result = checkPropTypes(Board.propTypes, { activePlayer: 12 }, "prop", Board.activePlayer);

        expect(result).toEqual(errorMsg);
    });

    it("Should throw error message if there is no changeActivePlayer prop ", () => {
        const errorMsg = "Failed prop type: The prop `changeActivePlayer` is marked as required in `<<anonymous>>`, but its value is `undefined`."

        const result = checkPropTypes(Board.propTypes, { activePlayer: "X", changeActivePlayer: undefined }, "prop", Board.activePlayer);

        expect(result).toEqual(errorMsg);
    });

    it("Should throw error message if changeActivePlayer prop type is not function", () => {
        const errorMsg = "Failed prop type: Invalid prop `changeActivePlayer` of type `string` supplied to `<<anonymous>>`, expected `function`."

        const result = checkPropTypes(Board.propTypes, { activePlayer: "X", changeActivePlayer: "O" }, "prop", Board.activePlayer);

        expect(result).toEqual(errorMsg);
    });

    it("changeActivePlayer to be called when the box filled", () => {
        const btn = wrapper.find("ul li button").at(3);
        instance.forceUpdate();
    
        btn.simulate("click");
    
        expect(instance.props.changeActivePlayer).toHaveBeenCalled();
    });
      
    it("Should fill the box with alternate player name for each click", () => {
        const btnAtIndex3 = wrapper.find("ul li button").at(3);
    
        btnAtIndex3.simulate("click");
        
        expect(wrapper.state().filledBoxes[3]).toEqual(AppConst.PLAYER_X_NAME);
    
        const btnAtIndex2 = wrapper.find("ul li button").at(2);
    
        btnAtIndex2.simulate("click");
        
        expect(wrapper.state().filledBoxes[2]).toEqual(AppConst.PLAYER_O_NAME);
    });

    it("Box can be filled only once", () => {
        const btn = wrapper.find("ul li button").at(0);
    
        btn.simulate("click");
    
        expect(btn.is('[disabled]')).toBe(true);
    });

    it("Should call isAnyRowCompletedByTheActivePlayer", () => {
        const spy = jest.spyOn(instance, "isAnyRowCompletedByTheActivePlayer");
        instance.forceUpdate();

        const btn = wrapper.find("ul li button").at(0);

        btn.simulate("click");

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should call isRowCompletedByTheActivePlayer 3 times", () => {
        const spy = jest.spyOn(instance, "isRowCompletedByTheActivePlayer");
        instance.forceUpdate();

        const btn = wrapper.find("ul li button").at(0);

        btn.simulate("click");

        expect(spy).toHaveBeenCalledTimes(AppConst.TOTAL_ROWS);
    });

    it("Should call the setTheWinner method when a row completed by the player", () => {
        completeRowByThePlayer();
    
        expect(wrapper.props().setTheWinner).toHaveBeenCalled();
    });

    it("Should disable all the boxes if game is over", () => {
        completeRowByThePlayer();
        
        const boxList = wrapper.find(Box);

        boxList.forEach(box => {
            expect(box.props().disabled).toBeTruthy();
        });
    });

    it("Should not call the changeActivePlayer is game is over", () => {
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

        const numberOfClicks = 5;

        expect(wrapper.props().changeActivePlayer).toHaveBeenCalledTimes(numberOfClicks-1);
    });

    it("Should call isAnyColumnCompletedByTheActivePlayer", () => {
        const spy = jest.spyOn(instance, "isAnyColumnCompletedByTheActivePlayer");
        instance.forceUpdate();

        const btn = wrapper.find("ul li button").at(0);

        btn.simulate("click");

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should call isColumnCompletedByTheActivePlayer 3 times", () => {
        const spy = jest.spyOn(instance, "isColumnCompletedByTheActivePlayer");
        instance.forceUpdate();

        const btn = wrapper.find("ul li button").at(0);

        btn.simulate("click");

        expect(spy).toHaveBeenCalledTimes(AppConst.TOTAL_COLUMNS);
    });

    it("Player wins when a column completed by the player", () => {
        const btnList = wrapper.find("ul li button");
        const box0 = btnList.at(0);
        const box1 = btnList.at(1);
        const box3 = btnList.at(3);
        const box4 = btnList.at(4);
        const box6 = btnList.at(6);
    
        box0.simulate("click");
        box1.simulate("click");
        box3.simulate("click");
        box4.simulate("click");
        box6.simulate("click");
    
        expect(wrapper.state().isGameOver).toBeTruthy();
        expect(wrapper.props().setTheWinner).toHaveBeenCalled();
    });

    it("Should call isAnyDiagonalCompletedByTheActivePlayer", () => {
        const spy = jest.spyOn(instance, "isAnyDiagonalCompletedByTheActivePlayer");
        instance.forceUpdate();

        const btn = wrapper.find("ul li button").at(0);

        btn.simulate("click");

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should call isDiagonalCompletedByTheActivePlayer 2 times", () => {
        const spy = jest.spyOn(instance, "isDiagonalCompletedByTheActivePlayer");
        instance.forceUpdate();

        const btn = wrapper.find("ul li button").at(0);

        btn.simulate("click");

        expect(spy).toHaveBeenCalledTimes(AppConst.TOTAL_DIAGONALS);
    });

    it("Player wins if fills all the boxes diagonally", () => {
        const btnList = wrapper.find("ul li button");
        const box0 = btnList.at(0);
        const box1 = btnList.at(1);
        const box4 = btnList.at(4);
        const box5 = btnList.at(5);
        const box8 = btnList.at(8);
    
        box0.simulate("click");
        box1.simulate("click");
        box4.simulate("click");
        box5.simulate("click");
        box8.simulate("click");
    
        expect(wrapper.state().isGameOver).toBeTruthy();
        expect(wrapper.props().setTheWinner).toHaveBeenCalled();
    });

});
