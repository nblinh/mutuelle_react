import pick from 'lodash.pick';
import React from 'react';
import { mount, shallow } from 'enzyme';

import IntermediaryResult, {
    IntermediaryResultTooltip,
} from './IntermediaryResult';
import RemainingFeesRepartitionChart from '../refunds/RemainingFeesRepartitionChart';

describe('<IntermediaryResultTooltip />', () => {
    it('should display amount of remaining fees only if null', () => {
        const nonRemainingFeesTooltip = shallow(
            <IntermediaryResultTooltip name="zero" value="32" />,
        );
        expect(nonRemainingFeesTooltip.text()).toBe(
            '32 % des adhérents ont un reste à charge de 0 €',
        );

        const remainingFeesTooltip = shallow(
            <IntermediaryResultTooltip name="petit" value="32" />,
        );
        expect(remainingFeesTooltip.text()).toBe(
            '32 % des adhérents ont un reste à charge ',
        );
    });
});

describe('IntermediaryResult', () => {
    it('should extract remains data from reimbursement and pass them to RemainingFeesRepartitionChart', () => {
        const wrapper = mount(
            <IntermediaryResult
                reimbursements={{
                    quartiles: [{ min: null, max: null }],
                    pourcentage_reste_a_charge_par_quartile: [75],
                    reste_a_charge_maximum: 42,
                }}
            />,
        );

        const chart = wrapper.find(RemainingFeesRepartitionChart);

        const data = chart
            .prop('data')
            .map(d => pick(d, ['name', 'label', 'value']));

        expect(data).toEqual([
            { name: 'zero', label: '0 €', value: 75 },
            { name: 'grand', label: '42 €', value: 25 },
        ]);

        expect(chart.prop('selectedRemainingFees')).toBe(0);
        expect(chart.prop('legend')).toBe(null);
    });
});
