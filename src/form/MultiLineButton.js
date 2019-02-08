import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    label: {
        lineHeight: '22px',
    },
};

export const Button = ({ classes, variant = 'contained', ...props }) => (
    <BaseButton classes={classes} variant={variant} {...props} />
);

Button.propTypes = {
    classes: PropTypes.object,
    variant: PropTypes.oneOf(['contained', 'outlined']),
};

export default withStyles(styles)(Button);
