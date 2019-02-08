import React from 'react';
import { storiesOf } from '@storybook/react';

import BeneficiarySummary from '../questions/BeneficiarySummary';
import themeDecorator from '../../.storybook/themeDecorator';

storiesOf('Bénéficiaire', module)
    .addDecorator(themeDecorator)
    .add('Résumé', () => (
        <BeneficiarySummary age={32} product="TESAHTN302" department="54" />
    ));
