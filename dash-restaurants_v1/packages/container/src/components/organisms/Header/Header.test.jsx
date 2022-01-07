import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Header from './Header.jsx';

configure({ adapter: new Adapter() });

describe('Header Component', () => {
	it('should have nav items', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find('NavLink').length).toEqual(1);
	});
});
