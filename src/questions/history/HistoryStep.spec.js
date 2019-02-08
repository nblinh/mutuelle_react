import React from 'react';
import { shallow } from 'enzyme';

import { HistoryStep } from './HistoryStep';
import {
    TEMPLATE_HEXAGON,
    TEMPLATE_BUTTON,
    TEMPLATE_ICON,
} from '../../questions/questions/gabarits';
import { HexagonIcon, Icon } from '../../icons';

describe('<HistoryStep />', () => {
    const defaultProps = {
        classes: {
            question: 'question',
            answer: 'answer',
        },
        question: 'How are you?',
        gabarit: TEMPLATE_BUTTON,
        answer: {
            value: 'fine',
            label: 'Fine!',
        },
    };

    it('should display question and answer', () => {
        const props = {
            ...defaultProps,
            question: 'Quel praticien souhaitez-vous consulter ?',
            answer: { label: 'Généraliste' },
        };

        const wrapper = shallow(<HistoryStep {...props} />);
        expect(wrapper.find('.question').text()).toBe(
            'Quel praticien souhaitez-vous consulter ?',
        );
        expect(wrapper.find('.answer').text()).toBe('Généraliste');
    });

    it('should display differently according to question template', () => {
        const test = (gabarit, expectedTemplateClass) => {
            const props = {
                ...defaultProps,
                gabarit,
            };

            const wrapper = shallow(<HistoryStep {...props} />);
            expect(wrapper.find(`.${expectedTemplateClass}`)).toHaveLength(1);
        };

        test(TEMPLATE_HEXAGON, 'template_hexagone');
        test(TEMPLATE_BUTTON, 'template_bouton');
    });

    it('should display an hexagon element if template is "hexagone"', () => {
        const props = {
            ...defaultProps,
            gabarit: TEMPLATE_HEXAGON,
        };

        const wrapper = shallow(<HistoryStep {...props} />);
        expect(wrapper.find(HexagonIcon)).toHaveLength(1);
    });

    it('should display answer icon if template is `icone`', () => {
        const props = {
            ...defaultProps,
            gabarit: TEMPLATE_ICON,
            answer: {
                icon: 'Optic',
                label: 'Optique',
            },
        };

        const wrapper = shallow(<HistoryStep {...props} />);
        expect(wrapper.find(Icon).prop('name')).toBe('Optic');
    });
});
