import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import RoundKeyboardBackspace from './RoundKeyboardBackspace';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    button: {
        width: 44,
        height: 44,
    },
    icon: {
        fontSize: 44,
        fill: '#BBBBBC',
    },
};

const BackButton = ({ classes, ...props }) => (
    <IconButton
        title="question précédente"
        className={classes.button}
        {...props}
    >
        <RoundKeyboardBackspace className={classes.icon} />
    </IconButton>
);

BackButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackButton);
