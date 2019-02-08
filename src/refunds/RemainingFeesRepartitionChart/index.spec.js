import React, { Fragment } from 'react';
import { mount } from 'enzyme';

import {
    RemainingFeesRepartitionChart,
    getMatchingExpenseQuartileIndex,
} from './index';

describe('<RemainingFeesRepartitionChart />', () => {
    const defaultProps = {
        classes: {},
        domain: [],
        quartiles: [],
        selectedRemainingFees: 0,
        legend: null,
    };

    it('should display all reimbursement data as a stacked bar', () => {
        const tooltipLabel = d => (
            <Fragment>
                <span>{d.value} %</span> des adhérents ont un reste à charge
            </Fragment>
        );

        const props = {
            ...defaultProps,
            data: [
                { name: 'small', tooltipLabel, value: 44 },
                { name: 'big', tooltipLabel, value: 4 },
                { name: 'zero', tooltipLabel, value: 52 },
            ],
        };

        const wrapper = mount(<RemainingFeesRepartitionChart {...props} />);
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('getMatchingExpenseQuartileIndex', () => {
        it('should return correct matching quartile index depending of passed remaining fees value', () => {
            const quartiles = [
                { min: null, max: 0 },
                { min: 0, max: 25 },
                { min: 25, max: null },
            ];

            expect(getMatchingExpenseQuartileIndex(0, quartiles)).toBe(0);
            expect(getMatchingExpenseQuartileIndex(12, quartiles)).toBe(1);
            expect(getMatchingExpenseQuartileIndex(25, quartiles)).toBe(1);
            expect(getMatchingExpenseQuartileIndex(40, quartiles)).toBe(2);
        });
    });
});
