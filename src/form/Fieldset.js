import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { blueLightest, blueLight, white } from '../theme';

const styles = {
    root: {
        background: blueLightest,
        border: '1px solid rgba(126,170,191,0.2)',
    },
    label: {
        display: 'inline-block',
        color: white,
        background: blueLight,
        fontFamily: 'bree',
        fontSize: 18,
        textAlign: 'center',
        padding: '7px 24px',
    },
    content: {
        padding: '1rem',
    },
};

export const Fieldset = ({ className, classes, children, label }) => (
    <div className={`${className} ${classes.root}`}>
        {label && <div className={classes.label}>{label}</div>}
        <div className={classes.content}>{children}</div>
    </div>
);

Fieldset.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    children: PropTypes.node,
    label: PropTypes.string,
};

export default injectSheet(styles)(Fieldset);
