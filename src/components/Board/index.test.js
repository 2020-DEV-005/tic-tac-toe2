import React from 'react';
import { mount } from 'enzyme';
import Board from '../Board/';
import { AppConst } from '../../constants/';


describe("<Board /> component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Board />);
    });

    it("Should have 9 boxes in the board", () => {
        expect(wrapper.find("ul li").length).toEqual(AppConst.TOTAL_BOXES);
    });

    it("Should render 9 buttons in the board", () => {
        expect(wrapper.find("ul li button").length).toEqual(AppConst.TOTAL_BOXES);
    });

});
