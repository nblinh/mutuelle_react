import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import UISlider from '@material-ui/lab/Slider';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { darkGreen } from '../theme';

// Ugly. Override theme to use wanted color
const theme = createMuiTheme({
    palette: {
        primary: {
            main: darkGreen,
        },
        grey: {
            400: '#c9c67a',
            500: '#c9c67a',
        },
    },
});

const styles = {
    rootSlider: {
        // do not name it root because of conflicts with MaterialUI slider
        display: 'flex',
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        flex: '1 0 0',
    },
    inputWrapper: {
        flex: '0 0 55px',
        marginLeft: '1rem',
        height: 40,
        '& input': {
            textAlign: 'center',
            width: '100%',
            fontFamily: 'bree',
            fontSize: 24,
        },
        '& input::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '& input::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },

    /** for material UI overrides */
    track: {
        height: '4px',
        '&$focused, &$activated': {
            height: '6px',
        },
    },
};

export class Slider extends Component {
    onInputChange = event =>
        this.props.onChange(parseInt(event.target.value, 10));
    onSliderChange = (_, value) => this.props.onChange(value);

    handleBlur = event => {
        const value = event.target.value * 1;
        if (value < this.props.min * 1) {
            this.props.onChange(this.props.min * 1);
            return;
        }

        if (value > this.props.max * 1) {
            this.props.onChange(this.props.max * 1);
            return;
        }
    };

    render() {
        const {
            classes,
            withInput,
            value,
            min,
            max,
            ...otherProps
        } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.rootSlider}>
                    <div className={classes.slider}>
                        <UISlider
                            {...otherProps}
                            classes={{
                                track: classes.track,
                            }}
                            min={min}
                            max={max}
                            value={value}
                            onChange={this.onSliderChange}
                        />
                    </div>
                    {withInput && (
                        <div className={classes.inputWrapper}>
                            <TextField
                                type="number"
                                fullWidth
                                value={value}
                                inputProps={{
                                    min,
                                    max,
                                }}
                                onChange={this.onInputChange}
                                onBlur={this.handleBlur}
                            />
                        </div>
                    )}
                </div>
            </MuiThemeProvider>
        );
    }
}

Slider.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    withInput: PropTypes.bool,
};

Slider.defaultProps = {
    step: 1,
    withInput: false,
    min: 0,
    max: 100,
};

export default withStyles(styles)(Slider);
