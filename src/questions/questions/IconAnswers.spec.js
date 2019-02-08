import React from 'react';
import { shallow } from 'enzyme';

import { IconAnswers } from './IconAnswers';
import Icon from '../../icons/Icon';

describe('<IconAnswers />', () => {
    const defaultProps = {
        classes: {
            icon: 'icon',
            label: 'label',
            disabled: 'disabled',
            item: 'item',
        },
    };

    it('should display answer icon and label for all answers', () => {
        const props = {
            ...defaultProps,
            answers: [
                { icon: 'Dentist', value: 'dentiste', label: 'Dentiste' },
                {
                    icon: 'Pharmacy',
                    value: 'medicaments',
                    label: 'Médicaments',
                },
            ],
        };

        const wrapper = shallow(<IconAnswers {...props} />);
        expect(wrapper.find(Icon).map(i => i.prop('name'))).toEqual([
            'Dentist',
            'Pharmacy',
        ]);

        expect(wrapper.find('.label').map(l => l.text())).toEqual([
            'Dentiste',
            'Médicaments',
        ]);
    });

    it('should call `onValidate` prop with current value when clicking on an answer', () => {
        const onValidateSpy = jest.fn();
        const props = {
            ...defaultProps,
            onValidate: onValidateSpy,
            answers: [
                {
                    icon: 'Dentist',
                    value: 'dentiste',
                    label: 'Dentiste',
                    disabled: false,
                },
            ],
        };

        const wrapper = shallow(<IconAnswers {...props} />);
        wrapper.find('li').prop('onClick')();

        expect(onValidateSpy).toHaveBeenLastCalledWith('dentiste');
    });

    it('should highlight disabled answers', () => {
        const props = {
            ...defaultProps,
            answers: [
                {
                    icon: 'Dentist',
                    value: 'dentiste',
                    label: 'Dentiste',
                    disabled: true,
                },
            ],
        };

        const wrapper = shallow(<IconAnswers {...props} />);
        const answer = wrapper.find('li');

        expect(answer.prop('className')).toContain('disabled');
    });

    it('should do nothing when clicking on a disabled answer', () => {
        const onValidateSpy = jest.fn();
        const props = {
            ...defaultProps,
            onValidate: onValidateSpy,
            answers: [
                {
                    icon: 'Dentist',
                    value: 'dentiste',
                    label: 'Dentiste',
                    disabled: true,
                },
            ],
        };

        const wrapper = shallow(<IconAnswers {...props} />);
        wrapper.find('li').prop('onClick')();

        expect(onValidateSpy).not.toHaveBeenCalled();
    });
});
