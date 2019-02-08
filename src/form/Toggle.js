import omit from 'lodash.omit';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        cursor: 'pointer',
        fontFamily: 'bree',
        letterSpacing: '0.05rem',
        fontSize: 18,
    },
};

export class Toggle extends Component {
    toggleOff = () => {
        this.props.onChange(false);
    };

    toggleOn = () => {
        this.props.onChange(true);
    };

    handleChange = (e, value) => {
        this.props.onChange(value);
    };

    render() {
        const {
            classes,
            name,
            leftLabel,
            rightLabel,
            value,
            ...otherProps
        } = this.props;

        return (
            <div className={classes.root}>
                <span className={classes.label} onClick={this.toggleOff}>
                    {leftLabel}
                </span>
                <Switch
                    {...omit(otherProps, ['nextQuestion', 'onValidate'])}
                    checked={!!value}
                    onChange={this.handleChange}
                    value={name}
                />
                <span className={classes.label} onClick={this.toggleOn}>
                    {rightLabel}
                </span>
            </div>
        );
    }
}

Toggle.propTypes = {
    classes: PropTypes.object,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.bool,
};

Toggle.defaultProps = {
    leftLabel: 'Non',
    rightLabel: 'Oui',
};

export default withStyles(styles)(Toggle);
