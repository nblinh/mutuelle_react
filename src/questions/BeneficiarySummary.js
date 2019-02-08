import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { departments } from '../form/DepartmentList';

const styles = {
    root: {
        fontSize: 18,
        fontFamily: 'bree',
        fontWeight: 300,
        letterSpacing: '0.05rem',
    },
};

export const BeneficiarySummary = ({ classes, age, product, department }) => (
    <span className={classes.root}>
        {product} - {age} an{age > 1 ? 's' : ''} -{' '}
        {departments.find(d => d.value === department).label}
    </span>
);

BeneficiarySummary.propTypes = {
    classes: PropTypes.object,
    age: PropTypes.number.isRequired,
    product: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
};

export default injectSheet(styles)(BeneficiarySummary);
