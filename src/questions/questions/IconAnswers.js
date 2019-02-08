import classname from 'classname';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { HexagonalIcon } from '../../icons';
import { orange, white, lightGray } from '../../theme';
import Icon from '../../icons/Icon';

const styles = {
    root: {
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
    },
    item: {
        display: 'inline-block',
        width: 'calc(100% * 1 / 3.01)', // Help IE11 rounding numbers by dividing by 3.01
        marginBottom: 34,
    },
    disabled: {
        pointerEvents: 'none',
        color: lightGray,
        '& path, & text': {
            fill: lightGray,
            stroke: lightGray,
        },
        '& .hexagon path': {
            fill: white,
            stroke: lightGray,
        },
    },
    icon: {
        margin: 'auto',
        '&:hover': {
            cursor: 'pointer',
        },
        '&:hover path, &:hover text': {
            stroke: white,
            fill: white,
        },
        '&:hover .hexagon path': {
            fill: orange,
            stroke: orange,
        },
    },
    label: {
        fontFamily: 'bree',
        fontSize: 24,
        textTransform: 'uppercase',
        letterSpacing: '0.05rem',
        '.disabled &': {
            color: 'red',
        },
    },
};

export class IconAnswers extends PureComponent {
    handleValidate = answer => () =>
        !answer.disabled && this.props.onValidate(answer.value);

    render() {
        const { answers, classes } = this.props;

        return (
            <ul className={classes.root}>
                {answers.map(answer => (
                    <li
                        key={answer.value}
                        className={classname({
                            [classes.item]: true,
                            [classes.disabled]: answer.disabled,
                        })}
                        onClick={this.handleValidate(answer)}
                    >
                        <HexagonalIcon className={classes.icon} size={125}>
                            <Icon name={answer.icon} />
                        </HexagonalIcon>
                        <span className={classes.label}>{answer.label}</span>
                    </li>
                ))}
            </ul>
        );
    }
}

IconAnswers.propTypes = {
    classes: PropTypes.object,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
            disabled: PropTypes.bool,
        }),
    ),
    onValidate: PropTypes.func,
};

export default withStyles(styles)(IconAnswers);
