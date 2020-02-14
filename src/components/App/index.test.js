import React from 'react';
import { shallow } from 'enzyme';
import App from './';
import Game from '../Game/';
import { AppConst } from '../../constants/';


describe("<App/> component", () => {
	let wrapper = shallow(<App />);

	it("Should have the application title", () => {
		expect(wrapper.find("header h2").text()).toEqual(AppConst.TITLE);
	});

	it("Should render the <Game /> component", () => {
		expect(wrapper.find(Game).length).toEqual(1);
	});

});