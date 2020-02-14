import React from 'react';
import { shallow } from 'enzyme';
import Board from '../Board/';
import { AppConst } from '../../constants/';


describe("<Board /> component", () => {
    let wrapper = shallow(<Board />);

    it("Should have 9 boxes in the board", () => {
        expect(wrapper.find("ul li").length).toEqual(AppConst.TOTAL_BOXES);
    });

});