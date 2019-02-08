import React from 'react';
import { storiesOf } from '@storybook/react';

import themeDecorator from '../../../.storybook/themeDecorator';
import History from './History';
import HistoryStep from './HistoryStep';
import { TEMPLATE_HEXAGON, TEMPLATE_BUTTON } from '../../questions/gabarits';

storiesOf('Historique conseiller', module)
    .addDecorator(themeDecorator)
    .add('Étape "hexagone"', () => (
        <div style={{ margin: '2rem', width: 168 }}>
            <HistoryStep
                question={{
                    question: 'Quel praticien souhaitez-vous consulter ?',
                    gabarit: TEMPLATE_HEXAGON,
                }}
                answer="Généraliste"
                to="#"
            />
        </div>
    ))
    .add('Étape "bouton"', () => (
        <div style={{ margin: '2rem', width: 168 }}>
            <HistoryStep
                question={{
                    question: 'Votre médecin est-il conventionné ?',
                    gabarit: TEMPLATE_BUTTON,
                }}
                answer="Secteur 1"
                to="#"
            />
        </div>
    ))
    .add('Historique des questions', () => (
        <div style={{ margin: '2rem', width: 200 }}>
            <History
                questions={[
                    {
                        question: 'Quel praticien souhaitez-vous consulter ?',
                        gabarit: TEMPLATE_HEXAGON,
                    },
                    {
                        question: "S'agit-il de votre médecin traitant ?",
                        gabarit: TEMPLATE_BUTTON,
                    },
                ]}
                answers={['Généraliste', 'Oui']}
            />
        </div>
    ));
