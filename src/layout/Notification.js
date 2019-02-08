import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    error: {
        fontFamily: 'Myriad Pro',
        fontSize: '1rem',
        backgroundColor: theme.palette.error.light,
    },
});

export class Notification extends React.Component {
    state = {
        open: false,
    };

    componentWillMount = () => {
        this.setState({ open: true });
    };

    componentWillReceiveProps = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
        this.props.onClose();
    };

    render() {
        const { classes, type, message, ...rest } = this.props;

        return (
            <Snackbar
                open={this.state.open}
                autoHideDuration={5000}
                message={message}
                ContentProps={{
                    className: classes[type],
                }}
                action={
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                }
                {...rest}
                onClose={this.handleClose}
            />
        );
    }
}

Notification.propTypes = {
    classes: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
};

Notification.defaultProps = {
    type: 'info',
};

export default withStyles(styles)(Notification);
