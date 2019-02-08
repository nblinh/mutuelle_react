import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import themeDecorator from '../../../.storybook/themeDecorator';
import reduxDecorator from '../../../.storybook/reduxDecorator';
import StorybookForm from '../../../.storybook/StorybookForm';

import Question from './Question';
import { TEMPLATE_BUTTON, TEMPLATE_ICON, TEMPLATE_HEXAGON } from './gabarits';

storiesOf('Questions', module)
    .addDecorator(reduxDecorator)
    .addDecorator(themeDecorator)
    .add('Question icônes', () => (
        <div style={{ maxWidth: 1440, margin: '2rem auto' }}>
            <StorybookForm>
                <Question
                    gabarit={TEMPLATE_ICON}
                    name="care-type"
                    question="De quel type de soin s'agit-il ?"
                    answers={[
                        {
                            value: 'consultation',
                            label: 'Honoraires médicaux',
                            icon: 'Analysis',
                            disabled: false,
                        },
                        {
                            value: 'optique',
                            label: 'Optique',
                            icon: 'Optic',
                            disabled: false,
                        },
                        {
                            value: 'dentaire',
                            label: 'Dentaire',
                            icon: 'Dentist',
                            disabled: true,
                        },
                        {
                            value: 'medicaments',
                            label: 'Médicaments',
                            icon: 'Pharmacy',
                            disabled: true,
                        },
                        {
                            value: 'hospitalisation',
                            label: 'Hospitalisation',
                            icon: 'Hospital',
                            disabled: true,
                        },
                        {
                            value: 'autre',
                            label: 'Autre',
                            icon: 'Other',
                            disabled: true,
                        },
                    ]}
                    onValidate={action('validate')}
                />
            </StorybookForm>
        </div>
    ))
    .add('Question simple', () => (
        <div style={{ maxWidth: 1440, margin: 'auto' }}>
            <StorybookForm>
                <Question
                    gabarit={TEMPLATE_HEXAGON}
                    name="consultation-type"
                    question="De quel type de consultation s'agit il ?"
                    answers={[
                        { value: 'generaliste', label: 'Généraliste' },
                        { value: 'gynecologue', label: 'Gynécologue' },
                        { value: 'ophtalmologue', label: 'Ophtalmologue' },
                        {
                            value: 'chirurgien',
                            label: 'Chirurgien Anesthésiste',
                        },
                    ]}
                    onValidate={action('validate')}
                />
            </StorybookForm>
        </div>
    ))
    .add('Simple, plein de choix', () => (
        <StorybookForm>
            <div style={{ maxWidth: 1440, margin: 'auto' }}>
                <Question
                    gabarit={TEMPLATE_HEXAGON}
                    name="consultation-type"
                    question="De quel type de consultation s'agit il ?"
                    answers={[
                        { value: 'generaliste', label: 'Généraliste' },
                        { value: 'gynecologue', label: 'Gynécologue' },
                        { value: 'ophtalmologue', label: 'Ophtalmologue' },
                        {
                            value: 'chirurgien',
                            label: 'Chirurgien Anesthésiste',
                        },
                        { value: 'cardiologue', label: 'Cardiologue' },
                        { value: 'dermatologue', label: 'Dermatologue' },
                        { value: 'pediatre', label: 'Pédiatre' },
                        { value: 'neuropsychiatre', label: 'Neuropsychiatre' },
                    ]}
                    onValidate={action('validate')}
                />
            </div>
        </StorybookForm>
    ))
    .add('Question bouton', () => (
        <StorybookForm>
            <div style={{ maxWidth: 1440, margin: 'auto' }}>
                <Question
                    gabarit={TEMPLATE_BUTTON}
                    name="referring_doctor"
                    question="S'agit-il de votre médecin traitant ?"
                    onValidate={action('validate')}
                    choices={[
                        { value: 'oui', label: 'Oui' },
                        { value: 'non', label: 'Non' },
                        { value: 'je-ne-sais-pas', label: 'Je ne sais pas' },
                    ]}
                />
            </div>
        </StorybookForm>
    ));
