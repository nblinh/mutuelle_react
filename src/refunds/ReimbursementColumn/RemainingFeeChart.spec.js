import React from 'react';
import { shallow } from 'enzyme';

import { RemainingFeeChart } from './RemainingFeeChart';
import { white, blue } from '../../theme';
import PieChart from '../../chart/PieChart';

describe('<RemainingFeeChart />', () => {
    const defaultProps = {
        classes: {
            legend: 'legend',
        },
        colors: [],
        data: [],
    };

    it('should display given legend', () => {
        const props = { ...defaultProps, legend: <strong>Hello!</strong> };
        const wrapper = shallow(<RemainingFeeChart {...props} />);

        expect(wrapper.find('.legend').html()).toContain(
            '<strong>Hello!</strong>',
        );
    });

    it('should display chart with given data and their related colors', () => {
        const props = {
            ...defaultProps,
            data: [10, 90],
            colors: [white, blue],
        };
        const wrapper = shallow(<RemainingFeeChart {...props} />);

        const pieChart = wrapper.find(PieChart);
        expect(pieChart.prop('data')).toEqual([10, 90]);
        expect(pieChart.prop('colors')).toEqual([white, blue]);
    });
});
