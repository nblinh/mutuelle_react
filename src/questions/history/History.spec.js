import React from 'react';
import { shallow } from 'enzyme';

import { History } from './History';
import HistoryStep from './HistoryStep';
import { TEMPLATE_HEXAGON } from '../../questions/questions/gabarits';

describe('<History />', () => {
    const defaultProps = {
        classes: {},
    };

    it('should display every given steps as <QuestionStep />', () => {
        const props = {
            ...defaultProps,
            steps: [
                {
                    question: 'Quel praticien souhaitez-vous consulter ?',
                    gabarit: TEMPLATE_HEXAGON,
                    answer: { label: 'Généraliste' },
                },
                {
                    question: "S'agit-il de votre médecin traitant ?",
                    gabarit: TEMPLATE_HEXAGON,
                    answer: { label: 'Oui' },
                },
            ],
        };

        const wrapper = shallow(<History {...props} />);

        const steps = wrapper.find(HistoryStep);
        expect(steps.map(s => s.prop('question'))).toEqual([
            'Quel praticien souhaitez-vous consulter ?',
            "S'agit-il de votre médecin traitant ?",
        ]);

        expect(steps.map(s => s.prop('answer'))).toEqual([
            { label: 'Généraliste' },
            { label: 'Oui' },
        ]);
    });
});
