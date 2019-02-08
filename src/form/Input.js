import { compose } from 'recompose';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import withField from './withField';

const styles = {
    wrapper: {
        margin: '2rem',
    },
};

export const Input = ({
    classes,
    input,
    meta: { error, touched },
    ...props
}) => (
    <div className={classes.wrapper}>
        <TextField fullWidth error={touched && error} {...input} {...props} />
    </div>
);

Input.propTypes = {
    classes: PropTypes.object,
    error: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    input: PropTypes.object,
    meta: PropTypes.shape({
        error: PropTypes.string,
        touched: PropTypes.bool,
    }),
    value: PropTypes.any,
};

export default compose(
    withStyles(styles),
    withField,
)(Input);
