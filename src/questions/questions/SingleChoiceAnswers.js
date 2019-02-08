import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '../../form';
import { HexagonIcon } from '../../icons';
import { blueLight, orange, gray } from '../../theme';
import { SimpleSelectList } from '../../form/SelectList';

const HEXAGON_WIDTH = 160;

const styles = {
    choices: {
        listStyle: 'none',
    },
    choicesList: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'center',
        paddingLeft: 0,
    },
    answer: {
        flex: `0 0 ${HEXAGON_WIDTH}`,
        position: 'relative',
        '&:not(:last-child)': {
            marginRight: 104,
        },
        '&:hover path': {
            stroke: orange,
        },
    },
    hexagon: {
        fontSize: HEXAGON_WIDTH,
        '& path': {
            stroke: blueLight,
            strokeWidth: 4,
        },
        '&.active path': {
            stroke: orange,
            fill: orange,
        },
    },
    label: {
        userSelect: 'none',
        fontFamily: 'bree',
        position: 'absolute',
        top: 0,
        left: 0,
        height: HEXAGON_WIDTH,
        width: HEXAGON_WIDTH - 20,
        paddingLeft: 10,
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: gray,
        '&:hover': {
            color: orange,
        },
        '&.active': {
            color: 'white',
            fontWeight: 'bold',
        },
    },
    radioButton: {
        display: 'none',
    },
    buttonWrapper: {
        marginTop: 107,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 103,
        flex: '0 0 322px',
    },
    other: {
        width: 300,
    },
    root: {
        margin: 'auto',
        textAlign: 'center',
    },
};

export class SingleChoiceAnswers extends Component {
    state = {
        value: null,
    };

    handleSelectChange = value => this.setState({ value });

    handleValidate = value => () => this.props.onValidate(value);

    render() {
        const { classes, answers, maximumDisplayedChoices, name } = this.props;

        const { value } = this.state;

        const hexagonChoices = answers.slice(0, maximumDisplayedChoices);
        const selectListChoices = answers.slice(maximumDisplayedChoices);

        return (
            <Fragment>
                <ul className={classes.choicesList}>
                    {hexagonChoices.map(choice => (
                        <li
                            key={choice.value}
                            className={classes.answer}
                            onClick={this.handleValidate(choice.value)}
                        >
                            <HexagonIcon className={classes.hexagon} />
                            <label className={classes.label}>
                                {choice.label}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className={classes.buttonWrapper}>
                    {selectListChoices.length > 0 && (
                        <div className={classes.otherWrapper}>
                            <SimpleSelectList
                                onChange={this.handleSelectChange}
                                value={value}
                                label="Autre"
                                name={name}
                                className={classes.other}
                                options={selectListChoices}
                            />
                            <Button
                                color="primary"
                                onClick={() => this.props.onValidate(value)}
                                disabled={!value}
                            >
                                OK
                            </Button>
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

SingleChoiceAnswers.propTypes = {
    classes: PropTypes.object,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
        }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onValidate: PropTypes.func.isRequired,
    maximumDisplayedChoices: PropTypes.number,
    value: PropTypes.any,
};

SingleChoiceAnswers.defaultProps = {
    onChange: () => {},
    maximumDisplayedChoices: 4,
};

export default withStyles(styles)(SingleChoiceAnswers);
