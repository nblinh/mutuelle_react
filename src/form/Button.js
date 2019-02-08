import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '@material-ui/core/Button';

export const Button = ({ classes, variant = 'contained', ...props }) => (
    <BaseButton classes={classes} variant={variant} {...props} />
);

Button.propTypes = {
    classes: PropTypes.object,
    variant: PropTypes.oneOf(['contained', 'outlined']),
};

export default Button;
