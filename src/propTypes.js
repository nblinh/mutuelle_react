import PropTypes from 'prop-types';

export const answerPropType = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
});

export const questionPropType = PropTypes.shape({
    gabarit: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(answerPropType),
});

export const trackerPropType = PropTypes.shape({
    track: PropTypes.func.isRequired,
});
