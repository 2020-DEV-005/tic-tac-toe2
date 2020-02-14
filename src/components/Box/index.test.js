import React from 'react';
import { shallow } from 'enzyme';
import Box from '../Box/';

describe("<Box /> component", () => {
    let wrapper = shallow(<Box />);

    it("Should have button element", () => {
        expect(wrapper.find("button").length).toEqual(1);
    });

});
