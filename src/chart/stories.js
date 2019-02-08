import React from 'react';
import { storiesOf } from '@storybook/react';

import PieChart from './PieChart';
import { blue } from '../theme';

storiesOf('Chart', module).add('PieChart', () => (
    <PieChart data={[1, 6]} radius={200} colors={['#fff', blue]} style={{ margin: '2rem' }} />
));
