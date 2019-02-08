import some from 'lodash.some';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button } from '../../../form';

import GlassFieldset from './GlassFieldset';
import Toggle from '../../../form/Toggle';

const styles = {
    root: {
        textAlign: 'left',
    },
    fieldset: {
        marginBottom: 30,
    },
    submit: {
        textAlign: 'center',
    },
    toggleContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: -10,
        marginBottom: 40,
    },
};

const fieldsetLabelForGlasses = (glasses, index) => {
    if (glasses.length === 1) {
        return 'Verre n°1 et 2';
    }

    return `Verre n°${index + 1}`;
};

export const labelizeGlassesAnswer = answer =>
    answer
        .split('_')
        .map(glass => {
            const [, type, correction] = glass.match(/(progressif|simple)(.*)/);

            return `verre ${type} ${correction}`;
        })
        .join(' et ');

export class GlassesAnswers extends Component {
    state = {
        differentGlasses: false,
        glasses: [{ type: null, correction: 0 }],
    };

    onChange = (glassIndex, property) => value => {
        const glasses = [...this.state.glasses];
        glasses[glassIndex][property] = value;

        this.setState({ glasses });
    };

    handleValidate = () => {
        const glasses =
            this.state.glasses.length === 1
                ? [{ ...this.state.glasses[0] }, { ...this.state.glasses[0] }]
                : this.state.glasses;

        const value = glasses
            .map(
                glass =>
                    `${glass.type}${glass.correction > 0 ? '+' : ''}${
                        glass.correction
                    }`,
            )
            .join('_');

        this.props.onValidate(value);
    };

    isFormValid = () => {};

    toggleGlassesDifference = value => {
        const updatedGlasses = value
            ? [{ ...this.state.glasses[0] }, { type: null, correction: 0 }]
            : this.state.glasses.slice(0, 1);

        this.setState({
            differentGlasses: value,
            glasses: updatedGlasses,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.toggleContainer}>
                    <Toggle
                        name="glassDifference"
                        leftLabel="2 verres similaires"
                        rightLabel="2 verres différents"
                        value={this.state.differentGlasses}
                        onChange={this.toggleGlassesDifference}
                    />
                </div>
                {this.state.glasses.map((glass, index) => (
                    <GlassFieldset
                        key={index}
                        className={classes.fieldset}
                        label={fieldsetLabelForGlasses(
                            this.state.glasses,
                            index,
                        )}
                        glass={glass}
                        onTypeChange={this.onChange(index, 'type')}
                        onCorrectionChange={this.onChange(index, 'correction')}
                    />
                ))}

                <div className={classes.submit}>
                    <Button
                        type="submit"
                        color="primary"
                        onClick={this.handleValidate}
                        disabled={some(
                            this.state.glasses,
                            glass => glass.type === null,
                        )}
                    >
                        Simuler
                    </Button>
                </div>
            </div>
        );
    }
}

GlassesAnswers.propTypes = {
    classes: PropTypes.object,
    onValidate: PropTypes.func.isRequired,
};

export default injectSheet(styles)(GlassesAnswers);
