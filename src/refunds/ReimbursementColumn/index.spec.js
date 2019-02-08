import React from 'react';
import { shallow } from 'enzyme';

import { ReimbursementColumn } from '.';
import RemainingFeeChart from './RemainingFeeChart';
import { blue, white } from '../../theme';

describe('<ReimbursementColumn />', () => {
    const defaultProps = {
        classes: {},
        percentageWithNoRemainingFees: 72,
        maximumRemainingFees: 48,
    };

    describe('Remaining Fees Probability Chart', () => {
        it('should display no remaining fees probability in blue', () => {
            const props = {
                ...defaultProps,
                percentageWithNoRemainingFees: 85,
            };
            const wrapper = shallow(<ReimbursementColumn {...props} />);

            const noRemainingFeesChart = wrapper.find(RemainingFeeChart).at(0);
            expect(noRemainingFeesChart.prop('data')).toEqual([85, 15]);
            expect(noRemainingFeesChart.prop('colors')).toEqual([blue, white]);
        });

        it('should mention percentage of no remaining fees probability in label', () => {
            const props = {
                ...defaultProps,
                percentageWithNoRemainingFees: 85,
            };

            const wrapper = shallow(<ReimbursementColumn {...props} />);

            const noRemainingFeesChart = wrapper.find(RemainingFeeChart).at(0);
            const legendSymbol = noRemainingFeesChart.prop('legend');
            const Legend = shallow(<legendSymbol {...legendSymbol.props} />);
            expect(Legend.text()).toContain('85 %');
        });
    });

    describe('Complementary Remaining Fees Probability Chart', () => {
        it('should display with remaining fees probability in blue', () => {
            const props = {
                ...defaultProps,
                percentageWithNoRemainingFees: 85,
            };
            const wrapper = shallow(<ReimbursementColumn {...props} />);

            const noRemainingFeesChart = wrapper.find(RemainingFeeChart).at(1);
            expect(noRemainingFeesChart.prop('data')).toEqual([15, 85]);
            expect(noRemainingFeesChart.prop('colors')).toEqual([blue, white]);
        });

        it('should mention percentage of remaining fees probability in label', () => {
            const props = {
                ...defaultProps,
                percentageWithNoRemainingFees: 85,
            };

            const wrapper = shallow(<ReimbursementColumn {...props} />);

            const withRemainingFeesChart = wrapper
                .find(RemainingFeeChart)
                .at(1);
            const legendSymbol = withRemainingFeesChart.prop('legend');
            const Legend = shallow(<legendSymbol {...legendSymbol.props} />);
            expect(Legend.text()).toContain('15 %');
        });

        it('should mention maximum remaining fees in legend', () => {
            const props = {
                ...defaultProps,
                maximumRemainingFees: 37,
            };

            const wrapper = shallow(<ReimbursementColumn {...props} />);

            const withRemainingFeesChart = wrapper
                .find(RemainingFeeChart)
                .at(1);
            const legendSymbol = withRemainingFeesChart.prop('legend');
            const Legend = shallow(<legendSymbol {...legendSymbol.props} />);
            expect(Legend.text()).toContain('37 €');
        });
    });
});
