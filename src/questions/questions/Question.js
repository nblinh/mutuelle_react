import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
    TEMPLATES,
    TEMPLATE_GLASSES,
    TEMPLATE_HEXAGON,
    TEMPLATE_BUTTON,
    TEMPLATE_ICON,
} from './gabarits';

import SingleChoiceAnswers from './SingleChoiceAnswers';
import ButtonAnswers from './ButtonAnswers';
import IconAnswers from './IconAnswers';
import GlassesAnswers from './GlassesAnswers/index';

const styles = {
    root: {
        margin: 'auto',
        textAlign: 'center',
    },
    question: {
        fontFamily: 'Myriad Pro',
        fontSize: 48,
        lineHeight: '64px',
        marginTop: 0,
        marginBottom: 53,
    },
};

const renderAnswers = props => {
    switch (props.gabarit) {
        case TEMPLATE_GLASSES:
            return <GlassesAnswers {...props} />;

        case TEMPLATE_HEXAGON:
            return <SingleChoiceAnswers {...props} />;

        case TEMPLATE_BUTTON:
            return <ButtonAnswers {...props} />;

        case TEMPLATE_ICON:
            return <IconAnswers {...props} />;

        default:
            return null;
    }
};

export const Question = ({ classes, question, ...otherProps }) => (
    <div className={classes.root}>
        <p className={classes.question}>{question}</p>
        {renderAnswers({ question, ...otherProps })}
    </div>
);

Question.propTypes = {
    classes: PropTypes.object,
    question: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object),
    gabarit: PropTypes.oneOf(TEMPLATES),
};

export default withStyles(styles)(Question);
