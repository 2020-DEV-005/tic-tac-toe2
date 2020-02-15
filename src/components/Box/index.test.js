import React from 'react';
import { shallow } from 'enzyme';
import Box from '../Box/';
import checkPropTypes from 'check-prop-types';

describe("<Box /> component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Box onClick={jest.fn()} disabled={false}/>);
    });

    it("Should have button element", () => {
        expect(wrapper.find("button").length).toEqual(1);
    });

    it("Should throw error message if there is no onClick prop ", () => {
        const errorMsg = "Failed prop type: The prop `onClick` is marked as required in `<<anonymous>>`, but its value is `undefined`."

        const result = checkPropTypes(Box.propTypes, { onClick: undefined }, "prop", Box.onClick);

        expect(result).toEqual(errorMsg);
    });

    it("Should have the onClick prop of type function", () => {
        const errorMsg = "Failed prop type: Invalid prop `onClick` of type `string` supplied to `<<anonymous>>`, expected `function`."

        const result = checkPropTypes(Box.propTypes, { onClick: "abc" }, "prop", Box.onClick);

        expect(result).toEqual(errorMsg);
    });

    it("Should have the value prop of type string", () => {
        const errorMsg = "Failed prop type: Invalid prop `value` of type `number` supplied to `<<anonymous>>`, expected `string`."

        const result = checkPropTypes(Box.propTypes, { onClick: jest.fn(), value: 1 }, "prop", Box.value);

        expect(result).toEqual(errorMsg);
    });

    
    it("Should have the disabled prop", () => {
        const errorMsg = "Failed prop type: The prop `disabled` is marked as required in `<<anonymous>>`, but its value is `undefined`."

        const result = checkPropTypes(Box.propTypes, { onClick: jest.fn(), disabled: undefined }, "prop", Box.disabled);

        expect(result).toEqual(errorMsg);
    });
    
    it("Should have the disabled prop of type boolean", () => {
        const errorMsg = "Failed prop type: Invalid prop `disabled` of type `string` supplied to `<<anonymous>>`, expected `boolean`."

        const result = checkPropTypes(Box.propTypes, { onClick: jest.fn(), disabled: "false" }, "prop", Box.disabled);

        expect(result).toEqual(errorMsg);
    });

});
