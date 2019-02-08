import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = {
    group: {
        flexDirection: 'row',
        fontFamily: 'bree',
        fontSize: '1.125rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05rem',
    },
    choice: {
        '&:not(:first-child)': {
            paddingLeft: '1rem',
        },
    },
};

export class RadioList extends Component {
    handleChange = (e, value) => {
        this.props.onChange(value);
    };

    render() {
        const { choices, classes, name, value } = this.props;

        return (
            <FormControl
                component="fieldset"
                required
                className={classes.formControl}
            >
                <RadioGroup
                    aria-label={name}
                    name={name}
                    className={classes.group}
                    value={value}
                    onChange={this.handleChange}
                    style={{ display: 'flex' }}
                >
                    {choices.map(choice => (
                        <FormControlLabel
                            className={classes.choice}
                            key={choice.value}
                            value={choice.value}
                            control={<Radio />}
                            label={choice.label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    }
}

RadioList.propTypes = {
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    classes: PropTypes.object,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};

export default injectSheet(styles)(RadioList);
