import React from 'react';
import { shallow } from 'enzyme';

import { ButtonAnswers } from './ButtonAnswers';
import { Button } from '../../form';

describe('<ButtonAnswers />', () => {
    const defaultProps = {
        classes: {},
        question: 'Why?',
        name: 'why',
        answers: [
            { value: 'oui', label: 'Oui' },
            { value: 'non', label: 'Non' },
        ],
    };

    it('should call render one button per choice', () => {
        const onValidate = jest.fn();
        const props = { ...defaultProps, onValidate };

        const wrapper = shallow(<ButtonAnswers {...props} />);
        const buttons = wrapper.find(Button);

        expect(buttons).toHaveLength(2);

        expect(buttons.at(0).prop('children')).toBe('Oui');
        expect(buttons.at(1).prop('children')).toBe('Non');
    });
});
