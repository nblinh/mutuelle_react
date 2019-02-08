import get from 'lodash.get';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import getArrayEvolution from '../services/getArrayEvolution';
import getQuestionData from '../services/getQuestionData';
import { TEMPLATE_GLASSES } from './questions/gabarits';
import { labelizeGlassesAnswer } from './questions/GlassesAnswers';

export const questionsSelector = s => s.questions;
export const loadedQuestionsSelector = s => s.questions.questions;

const matchingAnswerChoice = answer => choice => {
    return answer.toString() === choice.value.toString();
};

export const labelizeAnswer = (questionTemplate, answer) => {
    if (questionTemplate === TEMPLATE_GLASSES) {
        return labelizeGlassesAnswer(answer);
    }

    return answer;
};

export const answeredQuestionsSelector = (state, props) => {
    const rawAnswers = get(props, 'match.params.answers');
    const answers = rawAnswers ? rawAnswers.split('/') : [];

    const questionsTree = state.questions.questions;
    if (!questionsTree) {
        return {};
    }

    const questions = getArrayEvolution(answers).map(path => {
        const prevPath = path.slice(0, -1);
        return getQuestionData(questionsTree, prevPath);
    });

    const matchingAnswers = answers.map((answer, index) => {
        const questionAnswers = questions[index].answers;
        if (!questionAnswers) {
            return {
                label: labelizeAnswer(questions[index].gabarit, answer),
                value: answer,
            };
        }

        return questionAnswers.find(matchingAnswerChoice(answer));
    });

    return matchingAnswers.reduce(
        (withTypes, answer, index) => ({
            ...withTypes,
            [questions[index].name]: {
                ...pick(questions[index], ['question', 'gabarit']),
                answer,
            },
        }),
        {},
    );
};

export const getHistoryAnswers = (state, props) => {
    const answers = answeredQuestionsSelector(state, props);

    return Object.values(omit(answers, 'care_type'));
};

export const getAnswerData = (state, props) => {
    const answeredQuestions = answeredQuestionsSelector(state, props);
    return Object.keys(answeredQuestions).reduce(
        (acc, key) => ({
            ...acc,
            [key]: answeredQuestions[key].answer.value,
        }),
        {},
    );
};

export const isFirstQuestionSelector = (state, props) =>
    Object.keys(answeredQuestionsSelector(state, props)).length === 0;

export const currentQuestionSelector = (state, props) => {
    const questionsTree = loadedQuestionsSelector(state);
    const answeredQuestions = answeredQuestionsSelector(state, props);

    const answers = Object.values(answeredQuestions).map(
        q => q.answer && q.answer.value,
    );

    return getQuestionData(questionsTree, answers);
};
