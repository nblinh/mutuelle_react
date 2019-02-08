import React from 'react';
import { shallow } from 'enzyme';

import { SingleChoiceAnswers } from './SingleChoiceAnswers';
import { Button } from '../../form';
import { SimpleSelectList } from '../../form/SelectList';

describe('<SingleChoiceAnswers />', () => {
    const defaultProps = {
        classes: {
            answer: 'answer',
            label: 'label',
            question: 'question',
        },
        name: 'question',
        question: 'Which is your favorite number?',
        answers: [{ value: 3, label: 'Three' }],
        onValidate: () => {},
        value: 'value',
    };

    it('should display all available responses', () => {
        const props = {
            ...defaultProps,
            answers: [
                { value: 3, label: 'Three' },
                {
                    value: 918912,
                    label:
                        'Nine hundred eighteen thousands nine hundred and twelve',
                },
            ],
        };

        const wrapper = shallow(<SingleChoiceAnswers {...props} />);
        const answers = wrapper.find('.answer');

        expect(answers.map(a => a.find('label').text())).toEqual([
            'Three',
            'Nine hundred eighteen thousands nine hundred and twelve',
        ]);
    });

    it('should call `onValidate` prop when clicking on hexagon', () => {
        const onValidateSpy = jest.fn();
        const props = {
            ...defaultProps,
            maximumDisplayedChoices: 1,
            answers: [{ value: 3, label: 'Three' }],
            onValidate: onValidateSpy,
        };

        const wrapper = shallow(<SingleChoiceAnswers {...props} />);
        wrapper.find('li').prop('onClick')();

        expect(onValidateSpy).toHaveBeenCalledWith(3);
    });

    it('should call `onValidate` with state.value prop when validating value in select', () => {
        const onValidateSpy = jest.fn();
        const props = {
            ...defaultProps,
            maximumDisplayedChoices: 1,
            answers: [
                { value: 1, label: 'One' },
                { value: 2, label: 'Two' },
                { value: 3, label: 'Three' },
            ],
            onValidate: onValidateSpy,
        };

        const wrapper = shallow(<SingleChoiceAnswers {...props} />);
        wrapper.setState({ value: 3 });
        wrapper.find(Button).prop('onClick')();

        expect(onValidateSpy).toHaveBeenCalledWith(3);
    });

    it('should limit number of displayed responses as hexagons according to `maximumDisplayedChoices` prop', () => {
        const test = (maximumDisplayedChoices, expectedHexagonAnswers) => {
            const props = {
                ...defaultProps,
                answers: [
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                ],
                maximumDisplayedChoices,
            };

            const wrapper = shallow(<SingleChoiceAnswers {...props} />);
            const answerLabels = wrapper.find('.answer label');
            expect(answerLabels.map(l => l.text())).toEqual(
                expectedHexagonAnswers,
            );
        };

        test(0, []);
        test(1, ['One']);
        test(2, ['One', 'Two']);
        test(3, ['One', 'Two', 'Three']);
        test(18, ['One', 'Two', 'Three']);
    });

    it('should give all choices exceeding `maximumDisplayedChoices` prop as a `<SelectList />`', () => {
        const test = (maximumDisplayedChoices, expectedOtherChoices) => {
            const props = {
                ...defaultProps,
                answers: [
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                ],
                maximumDisplayedChoices,
            };

            const wrapper = shallow(<SingleChoiceAnswers {...props} />);
            const otherAnswersSelectList = wrapper.find(SimpleSelectList);
            if (!expectedOtherChoices) {
                expect(otherAnswersSelectList).toHaveLength(0);
                expect(wrapper.find(Button)).toHaveLength(0);
                return;
            }

            const otherAnswers = otherAnswersSelectList.prop('options');
            expect(otherAnswers.map(a => a.value)).toEqual(
                expectedOtherChoices,
            );
        };

        test(0, [1, 2, 3]);
        test(1, [2, 3]);
        test(2, [3]);
        test(3, false);
        test(18, false);
    });

    it('should disabled validation button if no value has been set', () => {
        const test = (value, shouldBeDisabled) => {
            const props = {
                ...defaultProps,
                maximumDisplayedChoices: 1,
                answers: [
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                ],
            };

            const wrapper = shallow(<SingleChoiceAnswers {...props} />);
            wrapper.setState({ value });
            expect(wrapper.find(Button).prop('disabled')).toBe(
                shouldBeDisabled,
            );
        };

        test(null, true);
        test(3, false);
    });
});
