import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { HexagonIcon, HexagonalIcon, Icon } from '../../icons';
import { gray, blueLight, white } from '../../theme';
import {
    TEMPLATE_HEXAGON,
    TEMPLATES,
    TEMPLATE_ICON,
} from '../../questions/questions/gabarits';

const HEXAGON_WIDTH = 107;

const styles = {
    root: {
        marginTop: 10,
        fontFamily: 'bree',
        letterSpacing: '0.025rem',
        textAlign: 'center',
    },
    question: {
        fontSize: 13,
        lineHeight: '18px',
        color: gray,
        marginBottom: 0,
    },
    icon: {
        margin: 'auto',
        '& path': {
            fill: white,
            stroke: white,
        },
        '& .hexagon path': {
            fill: blueLight,
        },
    },
    answerWrapper: {
        position: 'relative',
        textAlign: 'center',
        fontSize: 18,
        '&:not(.template_hexagone) p': {
            lineHeight: '32px',
        },
        '&.template_hexagone': {
            width: HEXAGON_WIDTH,
            margin: 'auto',
        },
        '&.template_hexagone p': {
            color: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            height: HEXAGON_WIDTH,
            width: HEXAGON_WIDTH,
        },
    },
    hexagon: {
        fontSize: HEXAGON_WIDTH,
        '& path': {
            fill: blueLight,
            stroke: blueLight,
        },
    },
    answer: {
        zIndex: 2,
        fontSize: 18,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export const HistoryStep = ({
    classes,
    question,
    gabarit,
    answer: { label: answerLabel, icon: answerIcon },
}) => (
    <div className={classes.root}>
        <p className={classes.question}>{question}</p>
        <div className={`${classes.answerWrapper} template_${gabarit}`}>
            {gabarit === TEMPLATE_HEXAGON && (
                <HexagonIcon className={classes.hexagon} />
            )}
            {gabarit === TEMPLATE_ICON && (
                <HexagonalIcon className={classes.icon} size={128}>
                    <Icon name={answerIcon} />
                </HexagonalIcon>
            )}
            <p className={classes.answer}>{answerLabel}</p>
        </div>
    </div>
);

export const historyStepPropTypes = {
    classes: PropTypes.object,
    question: PropTypes.string,
    gabarit: PropTypes.oneOf(TEMPLATES),
    answer: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }),
};

HistoryStep.propTypes = historyStepPropTypes;

export default injectSheet(styles)(HistoryStep);
