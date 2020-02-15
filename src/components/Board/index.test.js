import React from 'react';
import { mount } from 'enzyme';
import Board from '../Board/';
import { AppConst } from '../../constants/';


describe("<Board /> component", () => {
    let wrapper, instance;
    beforeEach(() => {
        wrapper = mount(<Board />);
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

});
