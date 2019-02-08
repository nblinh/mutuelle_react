import React from 'react';
import { shallow } from 'enzyme';

import { BeneficiarySummary } from './BeneficiarySummary';

describe('<BeneficiarySummary />', () => {
    const defaultProps = {
        classes: {},
        product: 'TESAHTN302',
        age: 31,
        department: '54',
    };

    it('should display product name', () => {
        const props = { ...defaultProps, product: 'TESAHTN302' };
        const wrapper = shallow(<BeneficiarySummary {...props} />);

        expect(wrapper.text()).toContain('TESAHTN302');
    });

    it('should display age with "ans" correctly pluralized', () => {
        const test = (age, expectedDisplayedAge) => {
            const props = { ...defaultProps, age };
            const wrapper = shallow(<BeneficiarySummary {...props} />);

            expect(wrapper.text()).toContain(expectedDisplayedAge);
        };

        test(0, '0 an');
        test(1, '1 an');
        test(2, '2 ans');
        test(32, '32 ans');
    });

    it('should display department name and code', () => {
        const test = (department, expectedDisplayedDepartment) => {
            const props = { ...defaultProps, department };
            const wrapper = shallow(<BeneficiarySummary {...props} />);

            expect(wrapper.text()).toContain(expectedDisplayedDepartment);
        };

        test('54', 'Meurthe-et-Moselle (54)');
        test('972', 'Martinique (972)');
        test('2A', 'Corse-du-Sud (2A)');
    });
});
