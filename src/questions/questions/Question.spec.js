import React from 'react';
import { shallow } from 'enzyme';

import { Question } from './Question';
import {
    TEMPLATE_HEXAGON,
    TEMPLATE_BUTTON,
    TEMPLATE_ICON,
    TEMPLATE_GLASSES,
} from './gabarits';
import SingleChoiceAnswers from './SingleChoiceAnswers';
import ButtonAnswers from './ButtonAnswers';
import IconAnswers from './IconAnswers';
import GlassesAnswers from './GlassesAnswers';

describe('<Question />', () => {
    const defaultProps = {
        classes: {
            question: 'question',
        },
        question: 'Is it working?',
    };

    it('should display question', () => {
        const props = { ...defaultProps, question: 'How is this app?' };
        const wrapper = shallow(<Question {...props} />);

        expect(wrapper.find('.question').text()).toBe('How is this app?');
    });

    it('should render correct answers component depending of given template', () => {
        const test = (template, expectedElementName) => {
            const props = { ...defaultProps, gabarit: template };
            const wrapper = shallow(<Question {...props} />);

            expect(wrapper.find(expectedElementName)).toHaveLength(1);
        };

        test(TEMPLATE_HEXAGON, SingleChoiceAnswers);
        test(TEMPLATE_BUTTON, ButtonAnswers);
        test(TEMPLATE_ICON, IconAnswers);
        test(TEMPLATE_GLASSES, GlassesAnswers);
    });
});
