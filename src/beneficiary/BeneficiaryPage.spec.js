import React from 'react';
import { shallow } from 'enzyme';

import BeneficiaryForm from './BeneficiaryForm';
import { BeneficiaryPage } from './BeneficiaryPage';

describe('<BeneficiaryPage />', () => {
    const defaultProps = {
        classes: {},
        setBeneficiary: () => {},
        location: { pathname: '/', search: '' },
        tracker: { track: () => {} },
        history: { push: () => {} },
    };

    it('should fill beneficiary data and redirect to question page if beneficiary data are given through URL', () => {
        const push = jest.fn();
        const setBeneficiary = jest.fn();

        const props = {
            ...defaultProps,
            setBeneficiary,
            history: {
                ...defaultProps.history,
                push,
            },
            location: {
                pathname: '/',
                search: '?produit=TPSAHPA200&age=24&departement=88',
            },
        };

        shallow(<BeneficiaryPage {...props} />);

        expect(setBeneficiary).toHaveBeenCalledWith({
            product: 'TPSAHPA200',
            age: '24',
            department: '88',
        });

        expect(push).toHaveBeenCalledWith('/questions');
    });

    it('should save beneficiary data when submitting form', () => {
        const setBeneficiary = jest.fn();

        const props = { ...defaultProps, setBeneficiary };
        const wrapper = shallow(<BeneficiaryPage {...props} />);

        const onSubmit = wrapper.find(BeneficiaryForm).prop('onSubmit');
        onSubmit({ age: 12 });

        expect(setBeneficiary).toHaveBeenCalledWith({ age: 12 });
    });

    it('should redirect to questions page once submitted', () => {
        const push = jest.fn();

        const props = {
            ...defaultProps,
            location: {
                ...defaultProps.location,
                pathname: '/',
            },
            history: {
                ...defaultProps.history,
                push,
            },
        };

        const wrapper = shallow(<BeneficiaryPage {...props} />);
        const onSubmit = wrapper.find(BeneficiaryForm).prop('onSubmit');
        onSubmit();

        expect(push).toHaveBeenCalledWith('/questions');
    });

    it('should send a `beneficiary` tracking event when submitting form', () => {
        const tracker = {
            track: jest.fn(),
        };

        const props = {
            ...defaultProps,
            tracker,
        };

        const wrapper = shallow(<BeneficiaryPage {...props} />);
        const onSubmit = wrapper.find(BeneficiaryForm).prop('onSubmit');
        onSubmit({
            age: 19,
            department: '54',
            product: 'TPSA100',
        });

        expect(tracker.track).toHaveBeenCalledWith('beneficiary', {
            age: 19,
            department: '54',
            product: 'TPSA100',
        });
    });
});
