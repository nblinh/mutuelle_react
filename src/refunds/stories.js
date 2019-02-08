import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';

import themeDecorator from '../../.storybook/themeDecorator';
import ReimbursementColumn from './ReimbursementColumn';
import RemainingFeeChart from './ReimbursementColumn/RemainingFeeChart';
import RemainingFeesRepartitionChart from './RemainingFeesRepartitionChart';
import ReimbursementDistributionChart from './ReimbursementDistributionChart';
import { white, blue } from '../theme';

storiesOf('Remboursement', module)
    .addDecorator(themeDecorator)
    .add('Colonne de probabilités', () => (
        <div style={{ maxWidth: 172, margin: '2rem' }}>
            <ReimbursementColumn />
        </div>
    ))
    .add('Graph de probabilités', () => (
        <div style={{ maxWidth: 172, margin: '2rem' }}>
            <RemainingFeeChart
                colors={[blue, white]}
                data={[43, 57]}
                strokeColor={blue}
                legend={
                    <Fragment>
                        <strong>{43} %</strong> des adhérents dans votre
                        situation ont un reste à charge inférieur à{' '}
                        <strong>{17} €</strong>
                    </Fragment>
                }
            />
            <RemainingFeeChart
                colors={[blue, white]}
                data={[97, 3]}
                strokeColor={blue}
                legend={
                    <span>
                        Une autre légende avec{' '}
                        <strong>des mises en avant</strong> du texte.
                    </span>
                }
            />
        </div>
    ))
    .add('Graphique de répartition', () => (
        <div style={{ margin: '2rem' }}>
            <h4>Standard</h4>
            <ReimbursementDistributionChart
                height={200}
                socialSecurity={16.5}
                mutual={15}
                remainingFees={10}
            />

            <h4>Sans reste à charge</h4>
            <ReimbursementDistributionChart
                height={200}
                socialSecurity={16.5}
                mutual={15}
                remainingFees={0}
            />
        </div>
    ))
    .add('Répartition restes à charge', () => {
        const data = [
            {
                name: 'zero',
                label: '0 €',
                tooltipLabel: d => (
                    <Fragment>
                        <strong>{Math.round(d.value, 2)} %</strong> des
                        adhérents<br />
                        ont un reste à charge de <strong>0 €</strong>
                    </Fragment>
                ),
                value: 52,
            },
            {
                name: 'petit',
                label: '1 à 25 €',
                tooltipLabel: d => (
                    <Fragment>
                        <strong>{Math.round(d.value, 2)} %</strong> des
                        adhérents<br />
                        ont un reste à charge de <strong>1 à 25 €</strong>
                    </Fragment>
                ),
                value: 47,
            },
            {
                name: 'grand',
                label: 'Plus de 25 €',
                tooltipLabel: d => (
                    <Fragment>
                        <strong>{Math.round(d.value, 2)} %</strong> des
                        adhérents<br />
                        ont un reste à charge de <strong>plus de 25 €</strong>
                    </Fragment>
                ),
                value: 1,
            },
        ];

        const defaultProps = {
            data,
            title: 'Reste à payer',
            domain: ['zero', 'petit', 'grand'],
            selectedRemainingFees: 18,
            quartiles: [
                { min: null, max: 0 },
                { min: 1, max: 25 },
                { min: 25, max: null },
            ],
        };

        return (
            <div style={{ display: 'flex', margin: '2rem' }}>
                <div style={{ flex: '1 0 0' }}>
                    <h4>Avec légende en-dessous :</h4>
                    <div style={{ height: 500, width: 820 }}>
                        <RemainingFeesRepartitionChart
                            {...defaultProps}
                            legend="bottom"
                        />
                    </div>
                </div>
                <div style={{ flex: '1 0 0' }}>
                    <h4>Avec légende à côté :</h4>
                    <div style={{ height: 500, width: 820 }}>
                        <RemainingFeesRepartitionChart
                            {...defaultProps}
                            legend="aside"
                        />
                    </div>
                </div>
            </div>
        );
    });
