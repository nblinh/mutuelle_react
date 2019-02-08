import pick from 'lodash.pick';
import React from 'react';
import { shallow } from 'enzyme';
import {
    ReimbursementDetailsPage,
    RemainingFeesRepartitionTooltip,
} from './ReimbursementDetailsPage';
import RemainingFeesRepartitionChart from './RemainingFeesRepartitionChart';
import Slider from '../form/Slider';
import ReimbursementDistributionChart from './ReimbursementDistributionChart';
import Legend from './RemainingFeesRepartitionChart/Legend';

describe('<RemainingFeesRepartitionTooltip />', () => {
    const defaultProps = {
        value: 25,
        label: '0 €',
    };

    it('should display percentage of remaining fees range', () => {
        const wrapper = shallow(
            <RemainingFeesRepartitionTooltip {...defaultProps} />,
        );

        expect(wrapper.text()).toContain('25 %');
    });

    it('should display remaining fees range', () => {
        const wrapper = shallow(
            <RemainingFeesRepartitionTooltip
                {...defaultProps}
                label="plus de 25 €"
            />,
        );

        expect(wrapper.text()).toContain('plus de 25 €');
    });

    it('should prefix tooltip content with given prefix', () => {
        const wrapper = shallow(
            <RemainingFeesRepartitionTooltip
                {...defaultProps}
                prefix="Hors réseau Kalivia"
            />,
        );

        expect(wrapper.text()).toContain('Hors réseau Kalivia');
    });
});

describe('Reimbursement Details Page', () => {
    const defaultProps = {
        classes: {},
        reimbursements: [
            {
                id: 'foo',
                pourcentage_reste_a_charge_par_quartile: [],
                depense_plus_frequente: [],
                quartiles: [
                    { min: null, max: 0 },
                    { min: 0, max: 25 },
                    { min: 25, max: null },
                ],
            },
        ],
        reimbursementDistributions: [
            {
                maximumMutual: 30,
            },
        ],
        tracker: { track: () => {} },
        expense: 15,
        selectRemainingFeesRange: () => {},
        setExpense: () => {},
    };

    it('should display remaining fees repartition chart with correct data', () => {
        const props = {
            ...defaultProps,
            reimbursements: [
                {
                    ...defaultProps.reimbursements[0],
                    pourcentage_reste_a_charge_par_quartile: [24, 56, 20],
                },
            ],
        };

        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);

        const chart = wrapper.find(RemainingFeesRepartitionChart);
        const data = chart
            .prop('data')
            .map(d => pick(d, ['label', 'name', 'value']));

        expect(data).toEqual([
            { label: '0 €', name: 'null-0', value: 24 },
            { label: '1 à 25 €', name: '0-25', value: 56 },
            { label: 'plus de 25 €', name: '25-null', value: 20 },
        ]);
    });

    it('should display a remaining fees repartition chart per given reimbursement set', () => {
        const props = {
            ...defaultProps,
            reimbursements: [
                {
                    ...defaultProps.reimbursements[0],
                    nom: 'Hors Kalivia',
                },
                {
                    ...defaultProps.reimbursements[0],
                    nom: 'Kalivia',
                },
            ],
            reimbursementDistributions: [
                {
                    maximumMutual: 30,
                },
                {
                    maximumMutual: 32,
                },
            ],
        };

        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);

        const titles = wrapper
            .find(RemainingFeesRepartitionChart)
            .map(c => c.prop('title'));

        expect(titles).toEqual(['Hors Kalivia', 'Kalivia']);
    });

    it('should display Kalivia logo if Kalivia reimbursement', () => {
        const props = {
            ...defaultProps,
            reimbursements: [
                {
                    ...defaultProps.reimbursements[0],
                    id: 'kalivia',
                },
            ],
        };

        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
        expect(wrapper.find('img[alt="Kalivia"]')).toHaveLength(1);
    });

    it('should display remaining fees repartition legend', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);

        expect(wrapper.find(Legend)).toHaveLength(1);
    });

    describe('Expense Slider', () => {
        it('should not be displayed if most frequent expense is also the maximum one', () => {
            const props = {
                ...defaultProps,
                reimbursements: [
                    {
                        ...defaultProps.reimbursements[0],
                        depense_plus_frequente: [10],
                        depense_maximale: 10,
                    },
                ],
            };

            const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
            expect(wrapper.find(Slider)).toHaveLength(0);
            expect(wrapper.text()).toContain('Pour une dépense prévue de 10 €');
        });

        it('should have currently selected expense as value', () => {
            const props = {
                ...defaultProps,
                reimbursements: [
                    {
                        ...defaultProps.reimbursements[0],
                        depense_plus_frequente: [10],
                        depense_maximale: 100,
                    },
                ],
                expense: 54,
            };

            const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
            const slider = wrapper.find(Slider);
            expect(slider.prop('value')).toBe(54);
        });

        it('should update state reimbursement expense value when changed', () => {
            const setExpenseSpy = jest.fn();

            const props = {
                ...defaultProps,
                reimbursements: [
                    {
                        ...defaultProps.reimbursements[0],
                        depense_plus_frequente: [10],
                        depense_maximale: 100,
                    },
                ],
                setExpense: setExpenseSpy,
            };

            const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
            const slider = wrapper.find(Slider);
            slider.prop('onChange')(42);

            expect(setExpenseSpy).toHaveBeenCalledWith(42);
        });

        it('should be capped between null remaining fees most frequent expense and maximum expense', () => {
            const props = {
                ...defaultProps,
                reimbursements: [
                    {
                        ...defaultProps.reimbursements[0],
                        depense_plus_frequente: [45],
                        depense_maximale: 2300,
                    },
                ],
            };

            const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
            const slider = wrapper.find(Slider);
            expect(slider.prop('min')).toBe(45);
            expect(slider.prop('max')).toBe(2300);
        });

        it('should send an `expense_slider_moved` tracking event once when moving slider event', () => {
            const tracker = {
                track: jest.fn(),
            };

            const props = {
                ...defaultProps,
                reimbursements: [
                    {
                        ...defaultProps.reimbursements[0],
                        depense_plus_frequente: [45],
                        depense_maximale: 2300,
                    },
                ],
                tracker,
            };

            const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
            const slider = wrapper.find(Slider);
            slider.prop('onChange')(25);
            slider.prop('onChange')(42);

            const expenseSliderMovedTrackingCalls = tracker.track.mock.calls.filter(
                call => call.includes('expense_slider_moved'),
            );

            expect(expenseSliderMovedTrackingCalls).toHaveLength(1);
        });
    });

    it('should display reimbursement distribution chart with correct data', () => {
        const props = {
            ...defaultProps,
            reimbursementDistributions: [
                {
                    socialSecurity: 17.5,
                    maximumMutual: 8.88,
                    mutual: 8.88,
                    remainingFees: 41,
                },
            ],
        };

        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
        const chart = wrapper.find(ReimbursementDistributionChart);

        expect(chart.prop('socialSecurity')).toBe(17.5);
        expect(chart.prop('mutual')).toBe(8.88);
        expect(chart.prop('remainingFees')).toBe(41);
    });

    it('should display a reimbursement distribution chart for each reimbursement set', () => {
        const props = {
            ...defaultProps,
            reimbursementDistributions: [
                { maximumMutual: 16 },
                { maximumMutual: 19 },
            ],
        };

        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
        expect(wrapper.find(ReimbursementDistributionChart)).toHaveLength(2);
    });

    it('should not duplicate reimbursement distribution charts if they got same mutual reimbursement', () => {
        const props = {
            ...defaultProps,
            reimbursementDistributions: [
                { maximumMutual: 16 },
                { maximumMutual: 16 },
            ],
        };

        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);
        expect(wrapper.find(ReimbursementDistributionChart)).toHaveLength(1);
    });

    it('should emit a `reimbursements_details` tracking event once loaded', () => {
        const tracker = { track: jest.fn() };
        const props = { ...defaultProps, tracker };
        const wrapper = shallow(<ReimbursementDetailsPage {...props} />);

        wrapper.instance().componentDidMount();

        expect(tracker.track).toHaveBeenCalledWith('reimbursements_details');
    });
});
