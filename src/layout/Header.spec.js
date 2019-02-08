import React from 'react';
import { shallow } from 'enzyme';

import Logo from './Logo';
import { Header } from './Header';

describe('<Header />', () => {
    const defaultProps = {
        classes: {},
    };

    it('should display Harmonie logo', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Header {...props} />);
        expect(wrapper.find(Logo)).toHaveLength(1);
    });

    it('should display children', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(
            <Header {...props}>
                <h1>Hello!</h1>
            </Header>,
        );

        expect(wrapper.find('h1').text()).toBe('Hello!');
    });
});
