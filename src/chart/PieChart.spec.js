import React from 'react';
import { mount } from 'enzyme';

import { PieChart } from './PieChart';

describe('<PieChart />', () => {
    const defaultProps = {
        classes: {},
        data: [1, 6],
        radius: 200,
    };

    it('should display all reimbursement data as a pie chart', () => {
        const props = {
            ...defaultProps,
            data: [1, 6],
        };

        const wrapper = mount(<PieChart {...props} />);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
