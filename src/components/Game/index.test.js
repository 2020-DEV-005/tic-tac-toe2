import React from 'react';
import { shallow } from 'enzyme';
import Game from './';
import Board from '../Board/';
import { AppConst } from '../../constants/';


describe("<Game/> component", () => {
    let wrapper = shallow(<Game />);

    it("should have the player X as active player by default", () => {
        expect(wrapper.find("h4").text()).toEqual(AppConst.PLAYER + " " + AppConst.PLAYER_X_NAME);
    });

    it("Should render the <Board /> component", () => {
        expect(wrapper.find(Board).length).toEqual(1);
    });

});