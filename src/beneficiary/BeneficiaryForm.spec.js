import React from 'react';
import { shallow } from 'enzyme';

import { BeneficiaryForm, validate } from './BeneficiaryForm';
import { Button } from '../form';

describe('<BeneficiaryForm />', () => {
    const defaultProps = {
        classes: {},
        handleSubmit: jest.fn(),
    };

    it('should disable submit button if form is invalid', () => {
        const test = (invalid, shouldSubmitBeDisabled) => {
            const props = { ...defaultProps, invalid };

            const wrapper = shallow(<BeneficiaryForm {...props} />);
            expect(wrapper.find(Button).prop('disabled')).toBe(
                shouldSubmitBeDisabled,
            );
        };

        test(true, true);
        test(false, false);
    });

    describe('Form Validation', () => {
        it('should ensure all fields are mandatory', () => {
            ['product', 'age', 'department'].forEach(field => {
                const errors = validate({ [field]: null });
                expect(errors[field]).toBe('Champ obligatoire');
            });
        });

        it('should ensure age is not negative', () => {
            const { age } = validate({ age: -1 });
            expect(age).toBe("L'âge doit être positif.");
        });
    });
});
