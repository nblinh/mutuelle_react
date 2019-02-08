import React from 'react';
import { storiesOf } from '@storybook/react';

import themeDecorator from '../../.storybook/themeDecorator';
import Logo from './Logo';
import Header from './Header';
import Notification from './Notification';
import { action } from '@storybook/addon-actions';

storiesOf('Général', module)
    .addDecorator(themeDecorator)
    .add('Logo', () => <Logo />);

const styles = {
    title: {
        fontFamily: 'Myriad Pro',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: 24,
        lineHeight: '29px',
        letterSpacing: '0.05rem',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontFamily: 'Myriad Pro',
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: '0.05rem',
        marginTop: 0,
    },
};

storiesOf('En-tête', module)
    .add('Vide', () => (
        <div style={{ maxWidth: 1440, margin: 'auto' }}>
            <Header />
        </div>
    ))
    .add('Avec titre', () => (
        <div style={{ maxWidth: 1440, margin: 'auto' }}>
            <Header>
                <h1 style={styles.title}>Simulation de remboursement</h1>
            </Header>
        </div>
    ))
    .add('Avec titre et sous-titre', () => (
        <div style={{ maxWidth: 1440, margin: 'auto' }}>
            <Header>
                <h1 style={styles.title}>Simulation de remboursement</h1>
                <h2 style={styles.subtitle}>
                    TESAHTN302 - 31 ans - Meurthe et Moselle (54)
                </h2>
            </Header>
        </div>
    ));

storiesOf('Notifications', module)
    .addDecorator(themeDecorator)
    .add('Erreur', () => (
        <Notification
            message="Une erreur est survenue lors du calcul des probabilités de remboursement."
            type="error"
            onClose={action('close')}
        />
    ));
