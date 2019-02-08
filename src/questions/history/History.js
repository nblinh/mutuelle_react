import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import HistoryStep, { historyStepPropTypes } from './HistoryStep';
import { Link } from 'react-router-dom';
import MultiLineButton from '../../form/MultiLineButton';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontFamily: 'Myriad Pro',
        fontWeight: 600,
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: '0.05rem',
    },
    newSearch: {
        alignSelf: 'center',
    },
    link: {
        textDecoration: 'none',
    },
};

export const History = ({ classes, steps }) => (
    <aside className={classes.root}>
        <h2 className={classes.title}>Ma recherche</h2>
        <div className={classes.newSearch}>
            <Link className={classes.link} to="/questions">
                <MultiLineButton color="primary" variant="outlined">
                    Nouvelle<br />Recherche
                </MultiLineButton>
            </Link>
        </div>
        {steps.map(step => <HistoryStep key={step.question} {...step} />)}
    </aside>
);

History.propTypes = {
    classes: PropTypes.object,
    steps: PropTypes.arrayOf(PropTypes.shape(historyStepPropTypes)),
};

export default injectSheet(styles)(History);
