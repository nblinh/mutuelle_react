import React from 'react';
import { mount } from 'enzyme';

import { ReimbursementDistributionChart } from './ReimbursementDistributionChart';

describe('<ReimbursementDistributionChart />', () => {
    const defaultProps = {
        classes: {
            label: 'label',
        },
        socialSecurity: 40,
        mutual: 20,
        remainingFees: 10,
        width: 200,
        height: 500,
        domain: [],
    };

    it('should display all reimbursement data as a stacked bar', () => {
        const props = {
            ...defaultProps,
            socialSecurity: 40,
            mutual: 20,
            remainingFees: 10,
        };

        const wrapper = mount(<ReimbursementDistributionChart {...props} />);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
