import React from 'react';
import { storiesOf } from '@storybook/react';

import themeDecorator from '../../.storybook/themeDecorator';
import {
    AnalysisIcon,
    DentistIcon,
    HospitalIcon,
    OpticIcon,
    OtherIcon,
    PharmacyIcon,
    HexagonalIcon,
} from '.';

const styles = {
    root: {
        fontSize: 96,
        display: 'flex',
        margin: '2rem',
    },
    icon: {
        flex: '1 0 0',
        maxWidth: 96,
        marginRight: '3rem',
    },
};

storiesOf('Icônes', module)
    .addDecorator(themeDecorator)
    .add('Normales', () => (
        <div style={styles.root}>
            <div style={styles.icon}>
                <AnalysisIcon />
            </div>
            <div style={styles.icon}>
                <DentistIcon />
            </div>
            <div style={styles.icon}>
                <HospitalIcon />
            </div>
            <div style={styles.icon}>
                <OpticIcon />
            </div>
            <div style={styles.icon}>
                <OtherIcon />
            </div>
            <div style={styles.icon}>
                <PharmacyIcon />
            </div>
        </div>
    ))
    .add('Hexagones', () => (
        <div style={styles.root}>
            <div style={styles.icon}>
                <HexagonalIcon size={96}><AnalysisIcon /></HexagonalIcon>
            </div>
            <div style={styles.icon}>
                <HexagonalIcon size={96}><DentistIcon /></HexagonalIcon>
            </div>
            <div style={styles.icon}>
                <HexagonalIcon size={96}><HospitalIcon /></HexagonalIcon>
            </div>
            <div style={styles.icon}>
                <HexagonalIcon size={96}><OpticIcon /></HexagonalIcon>
            </div>
            <div style={styles.icon}>
                <HexagonalIcon size={96}><OtherIcon /></HexagonalIcon>
            </div>
            <div style={styles.icon}>
                <HexagonalIcon size={96}><PharmacyIcon /></HexagonalIcon>
            </div>
        </div>
    ));
