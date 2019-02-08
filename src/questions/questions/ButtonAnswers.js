import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { Button } from '../../form';

const styles = {
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: '0 12.5px',
    },
};

export class ButtonAnswers extends Component {
    handleValidate = value => () => this.props.onValidate(value);

    render() {
        const { classes, answers } = this.props;

        return (
            <div className={classes.buttonWrapper}>
                {answers.map(({ value, label }) => (
                    <Button
                        key={value}
                        className={classes.button}
                        color="primary"
                        variant="outlined"
                        onClick={this.handleValidate(value)}
                    >
                        {label}
                    </Button>
                ))}
            </div>
        );
    }
}

ButtonAnswers.propTypes = {
    classes: PropTypes.object,
    onValidate: PropTypes.func.isRequired,
    answers: PropTypes.array.isRequired,
};

ButtonAnswers.defaultProps = {
    value: 'non',
};

export default injectSheet(styles)(ButtonAnswers);
